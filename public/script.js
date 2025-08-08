// script.js

// ** CONFIGURACIÓN DE FIREBASE PARA TU PROYECTO CALIOPE **
// Copia y pega este objeto 'firebaseConfig' directamente desde la Consola de Firebase:
// Consola Firebase -> Tu Proyecto Caliope -> Configuración del proyecto (engranaje) -> "Tus apps" -> Web (</>) -> Configuración
const firebaseConfig = {
    apiKey: "AIzaSyAplYSnqpNilAVVGsnJcliLcXrDvcQQPrU", // Esta es la API Key de tu proyecto Firebase
    authDomain: "caliope-app-3.firebaseapp.com",
    projectId: "caliope-app-3",
    storageBucket: "caliope-app-3.appspot.com",
    messagingSenderId: "832855515589",
    appId: "1:832855515589:web:d59aa0aace2bafa081ebac",
    measurementId: "G-4YCJZXK5YE"
};

// Importa los módulos necesarios de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js'; 
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'; 
import { getFunctions, httpsCallable } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-functions.js'; 

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app); 
const functions = getFunctions(app); 

// Referencias a elementos del DOM
const generateBtn = document.getElementById('generate-recommendation-btn');
const userInput = document.getElementById('user-preference-input');
const outputDiv = document.getElementById('recommendations-output');

// Listener para el botón de generar recomendación
generateBtn.addEventListener('click', async () => {
    const userPreference = userInput.value;
    
    // --- LÍNEAS DE DEPURACIÓN AÑADIDAS ---
    console.log("Elemento userInput:", userInput);
    console.log("Valor capturado de userPreference:", userPreference);
    // --- FIN LÍNEAS DE DEPURACIÓN ---

    if (!userPreference) {
        outputDiv.innerHTML = '<p style="color: red;">Por favor, describe tu necesidad.</p>';
        return;
    }

    outputDiv.innerHTML = '<p class="loading-indicator">Generando recomendaciones... Esto puede tardar unos segundos.</p>';

    try {
        // Llama a tu Cloud Function desplegada 'generateCaliopeRecommendations'
        const generateRecommendationsCallable = httpsCallable(functions, 'generateCaliopeRecommendations');
        
        // Envía la preferencia del usuario a la Cloud Function
        const result = await generateRecommendationsCallable({ preference: userPreference });

        // Verifica la respuesta de la Cloud Function
        if (result.data && result.data.success) {
            if (result.data.message) {
                outputDiv.innerHTML = `<p>${result.data.message}</p>`;
            } else if (result.data.recommendations) {
                displayRecommendations(result.data.recommendations);
            } else {
                outputDiv.innerHTML = '<p style="color: red;">Error: Respuesta inesperada de la Cloud Function.</p>';
                console.error("Respuesta inesperada de la Cloud Function:", result);
            }
        } else {
            outputDiv.innerHTML = '<p style="color: red;">Error: No se pudieron generar recomendaciones. Intenta de nuevo.</p>';
            console.error("Respuesta inesperada de la Cloud Function:", result);
        }

    } catch (error) {
        outputDiv.innerHTML = `<p style="color: red;">Ocurrió un error: ${error.message}. Asegúrate de que la Cloud Function esté desplegada y configurada correctamente.</p>`;
        console.error("Error al llamar a la Cloud Function:", error);
    }
});

// Función para mostrar las recomendaciones en la interfaz
function displayRecommendations(recommendations) {
    console.log("Recomendaciones recibidas:", recommendations);
    outputDiv.innerHTML = '<h2>Tus Recomendaciones Personalizadas:</h2>'; // Limpia el contenido anterior
    if (!recommendations || recommendations.length === 0) {
        outputDiv.innerHTML += '<p>No se encontraron recomendaciones para tu preferencia.</p>';
        return;
    }

    recommendations.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'recommendation-card'; // Clase para estilos
        card.innerHTML = `
            <h3>${rec.nombre}</h3>
            <p><strong>Tipo:</strong> ${rec.tipo}</p>
            <p>${rec.descripcion}</p>
            <p><strong>Profesional/Clínica:</strong> ${rec.profesional_sugerido}</p>
            <p class="points"><strong>Puntos Caliope:</strong> ${rec.puntos_caliope}</p>
            ${rec.beneficio_adicional ? `<p><strong>Beneficio Adicional:</strong> ${rec.beneficio_adicional}</p>` : ''}
        `;
        outputDiv.appendChild(card);
    });
}
