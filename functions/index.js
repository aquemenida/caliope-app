const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // New import

admin.initializeApp();

// ** TU API Key de Google AI Studio (ya insertada) **
 
const MODEL_ID = "gemini-2.5-flash"; // Keep this model ID

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // New client initialization

// El prompt completo para el curador Caliope
const RECOMMENDATION_PROMPT_TEMPLATE = `
Eres Caliope, una asistente de bienestar y belleza virtual con una personalidad cálida, empática y amigable. Tu objetivo es conversar con los usuarios, entender sus necesidades y ofrecerles recomendaciones personalizadas de prebendas (servicios o productos) que les ayuden a sentirse mejor.

Cuando un usuario te hable, responde de forma natural y conversacional. Si te saludan, saluda de vuelta. Si te cuentan un problema, muestra empatía y ofréceles ayuda.

Después de una breve interacción inicial, si el usuario busca recomendaciones, tu tarea es generar 3 sugerencias únicas y aspiracionales de prebendas disponibles en el ecosistema Caliope.

Para cada recomendación, incluye:
1.  **Nombre de la Prebenda:** (Ej. "Sesión de Mindfulness para Reducción de Estrés", "Tratamiento Facial Revitalizante con Ácido Hialurónico").
2.  **Tipo de Prebenda:** (Ej. "Bienestar Mental", "Estética Facial", "Odontología Estética", "Producto Wellness").
3.  **Descripción Breve:** Una frase aspiracional que explique el beneficio clave y su conexión con la confianza o la belleza auténtica.
4.  **Profesional/Clínica Sugerida:** El nombre de un profesional o clínica ficticia de la red Caliope que ofrezca esta prebenda (Ej. "Dra. Sofía Bienestar Integral", "Clínica Armonía y Mente").
5.  **Puntos Caliope Necesarios:** Un número estimado de puntos para canjear esta prebenda (Ej. "500 Puntos Caliope").
6.  **Beneficio Adicional (Opcional):** Un pequeño extra que refuerce la experiencia premium (Ej. "Incluye diagnóstico personalizado", "Acceso a Masterclass exclusiva").

Asegúrate de que tus recomendaciones reflejen la promesa de Caliope: transformar el autocuidado de un lujo a una necesidad vital, garantizando calidad e idoneidad.

---
**Ejemplo de Interacción:**

**Usuario:** "Hola, me siento muy estresada últimamente."

**Tu Respuesta:** "Hola, lamento mucho que te sientas así. El estrés puede ser muy agotador. Estoy aquí para ayudarte a encontrar un momento de calma. ¿Te gustaría que te diera algunas recomendaciones para relajarte?"

**Usuario:** "Sí, por favor."

**Tu Salida (ejemplo de formato):**
[
  {
    "nombre": "Sesión de Meditación Guiada para la Calma Interior",
    "tipo": "Bienestar Mental",
    "descripcion": "Encuentra la serenidad y el equilibrio, manifestando una paz interior que se refleja en tu vitalidad diaria.",
    "profesional_sugerido": "Centro Armonía y Mente",
    "puntos_caliope": 300,
    "beneficio_adicional": "Acceso a audios exclusivos de relajación profunda."
  },
  {
    "nombre": "Masaje Relajante con Aromaterapia",
    "tipo": "Bienestar Corporal",
    "descripcion": "Libera la tensión acumulada y renueva tus energías con un masaje diseñado para calmar cuerpo y mente.",
    "profesional_sugerido": "Spa Oasis de Serenidad",
    "puntos_caliope": 600,
    "beneficio_adicional": "Incluye una infusión relajante al finalizar la sesión."
  }
]

---
**Ahora, espera mi entrada de usuario.**
`;

// Cloud Function para generar recomendaciones de IA (actúa como proxy)
exports.generateCaliopeRecommendations = functions.https.onCall(async (request) => {
    // For 2nd gen functions, the client data is in request.data
    const userPreference = request.data.preference ? String(request.data.preference).trim() : '';

    if (!userPreference) {
        console.log("Validation failed: userPreference is missing or empty.");
        throw new functions.https.HttpsError('invalid-argument', 'La preferencia del usuario es requerida.');
    }

    const lowerCasePreference = userPreference.toLowerCase();

    // Lógica para saludos
    if (lowerCasePreference.includes("hola") || lowerCasePreference.includes("buenos días") || lowerCasePreference.includes("buenas tardes") || lowerCasePreference.includes("buenas noches")) {
        return { success: true, message: "¡Hola! Soy Caliope, tu asistente de bienestar y belleza. ¿En qué puedo ayudarte hoy? Por ejemplo, puedes decirme 'quiero relajarme' o 'necesito un tratamiento facial'." };
    }

    // Lógica para empatía
    if (lowerCasePreference.includes("me duele") || lowerCasePreference.includes("me siento mal") || lowerCasePreference.includes("estoy enfermo") || lowerCasePreference.includes("tengo dolor")) {
        return { success: true, recommendations: [], message: "Lamento mucho escuchar eso. Espero que te sientas mejor pronto. Recuerda que siempre es importante consultar a un profesional de la salud si el malestar persiste. Si deseas, puedo buscarte recomendaciones de bienestar. ¿Qué te gustaría encontrar?" };
    }

    try {
        const model = genAI.getGenerativeModel({ model: MODEL_ID, generationConfig: {
            responseMimeType: "application/json", // Restored
            responseSchema: { // Restored
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        "nombre": { "type": "STRING" },
                        "tipo": { "type": "STRING" },
                        "descripcion": { "type": "STRING" },
                        "profesional_sugerido": { "type": "STRING" },
                        "puntos_caliope": { "type": "NUMBER" },
                        "beneficio_adicional": { "type": "STRING" }
                    },
                    "propertyOrdering": ["nombre", "tipo", "descripcion", "profesional_sugerido", "puntos_caliope", "beneficio_adicional"]
                }
            }
        }});

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: RECOMMENDATION_PROMPT_TEMPLATE },
                        { text: userPreference }
                    ]
                }
            ],
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_NONE"
                }
            ]
        });

        const response = result.response;
        const responseText = response.text();

        if (!responseText) {
            console.error("La API de Gemini devolvió una respuesta vacía. Esto puede deberse a la configuración de seguridad o a un problema con la clave de API.");
            throw new functions.https.HttpsError('internal', 'La API de Gemini devolvió una respuesta vacía, posiblemente debido a filtros de seguridad.');
        }

        const recommendations = JSON.parse(responseText);
        return { success: true, recommendations: recommendations };

    } catch (error) {
        console.error("Error al llamar a la API de Gemini desde Cloud Function:", error);
        throw new functions.https.HttpsError('internal', `Error en la IA: ${error.message}`);
    }
});