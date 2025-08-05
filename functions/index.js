const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch'); // Para hacer solicitudes HTTP desde la función

admin.initializeApp();

// ** TU API Key de Google AI Studio (ya insertada) **
const GEMINI_API_KEY = "AIzaSyC9hu3lkQfrNmK0SVb6gQdz8unoRBDn20o"; 
const MODEL_ID = "gemini-2.0-flash"; // Modelo que Google AI Studio sugiere

// El prompt completo para el curador Caliope
const RECOMMENDATION_PROMPT_TEMPLATE = `
Eres un experto curador de bienestar y belleza de la plataforma Caliope. Tu misión es ofrecer recomendaciones personalizadas de prebendas (servicios o productos) que combinen la salud integral con la estética de alta calidad, siempre bajo el sello de confianza y profesionalismo.

El usuario te proporcionará una descripción de su necesidad o deseo de bienestar/belleza. Tu tarea es generar 3 recomendaciones únicas y aspiracionales de prebendas disponibles en el ecosistema Caliope.

Para cada recomendación, incluye:
1.  **Nombre de la Prebenda:** (Ej. "Sesión de Mindfulness para Reducción de Estrés", "Tratamiento Facial Revitalizante con Ácido Hialurónico").
2.  **Tipo de Prebenda:** (Ej. "Bienestar Mental", "Estética Facial", "Odontología Estética", "Producto Wellness").
3.  **Descripción Breve:** Una frase aspiracional que explique el beneficio clave y su conexión con la confianza o la belleza auténtica.
4.  **Profesional/Clínica Sugerida:** El nombre de un profesional o clínica ficticia de la red Caliope que ofrezca esta prebenda (Ej. "Dra. Sofía Bienestar Integral", "Clínica Armonía y Mente").
5.  **Puntos Caliope Necesarios:** Un número estimado de puntos para canjear esta prebenda (Ej. "500 Puntos Caliope").
6.  **Beneficio Adicional (Opcional):** Un pequeño extra que refuerce la experiencia premium (Ej. "Incluye diagnóstico personalizado", "Acceso a Masterclass exclusiva").

Asegúrate de que tus recomendaciones reflejen la promesa de Caliope: transformar el autocuidado de un lujo a una necesidad vital, garantizando calidad e idoneidad.

---
**Ejemplo de Entrada del Usuario:**
"Quiero relajarme después del trabajo y mejorar el aspecto de mi piel cansada."

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
    "nombre": "Tratamiento Facial 'Luminosidad Radiante'",
    "tipo": "Estética Facial Avanzada",
    "descripcion": "Revitaliza tu piel y recupera su brillo natural, proyectando una belleza auténtica y una confianza renovada.",
    "profesional_sugerido": "Dra. Laura Piel Sana",
    "puntos_caliope": 800,
    "beneficio_adicional": "Incluye diagnóstico avanzado de piel con tecnología 3D."
  }
]

---
**Ahora, espera mi entrada de usuario.**
`;

// Cloud Function para generar recomendaciones de IA (actúa como proxy)
exports.generateCaliopeRecommendations = functions.https.onCall(async (data, context) => {
    const userPreference = data.preference; // La preferencia del usuario enviada desde el frontend

    if (!userPreference) {
        throw new functions.https.HttpsError('invalid-argument', 'La preferencia del usuario es requerida.');
    }

    try {
        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: RECOMMENDATION_PROMPT_TEMPLATE },
                        { text: userPreference }
                    ]
                }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
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
            }
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}/generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            
            const jsonString = result.candidates[0].content.parts[0].text;
            const recommendations = JSON.parse(jsonString);
            return { success: true, recommendations: recommendations };

        } else {
            console.error("Respuesta inesperada de la API de Gemini:", result);
            throw new functions.https.HttpsError('internal', 'No se pudieron generar recomendaciones de la IA.');
        }

    } catch (error) {
        console.error("Error al llamar a la API de Gemini desde Cloud Function:", error);
        throw new functions.https.HttpsError('internal', `Error en la IA: ${error.message}`);
        }
    });