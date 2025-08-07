'use client'; // Indica que este componente es un Client Component en Next.js App Router

import React, { useState } from 'react';

// Importa los módulos necesarios de Firebase
import { initializeApp, getApps } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

// ** CONFIGURACIÓN DE FIREBASE PARA TU PROYECTO CALIOPE **
// Este objeto 'firebaseConfig' ha sido copiado directamente desde la Consola de Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyAplYSnqpNilAVVGsnJcliLcXrDvcQQPrU",
    authDomain: "caliope-app-3.firebaseapp.com",
    projectId: "caliope-app-3",
    storageBucket: "caliope-app-3.appspot.com",
    messagingSenderId: "832855515589",
    appId: "1:832855515589:web:d59aa0aace2bafa081ebac",
    measurementId: "G-4YCJZXK5YE"
};

// Inicializa Firebase (solo si no ha sido inicializado ya)
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}
const functions = getFunctions(app); // Servicio de Cloud Functions

interface Recommendation {
    nombre: string;
    tipo: string;
    descripcion: string;
    profesional_sugerido: string;
    puntos_caliope: number;
    beneficio_adicional?: string;
}

export default function Home() {
    const [userPreference, setUserPreference] = useState<string>('');
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateRecommendation = async () => {
        if (!userPreference.trim()) {
            setError('Por favor, describe tu necesidad.');
            return;
        }

        setLoading(true);
        setError(null);
        setRecommendations([]);

        try {
            // Llama a tu Cloud Function desplegada 'generateCaliopeRecommendations'
            const generateRecommendationsCallable = httpsCallable(functions, 'generateCaliopeRecommendations');
            
            // Envía la preferencia del usuario a la Cloud Function
            const result = await generateRecommendationsCallable({ preference: userPreference });

            // Verifica la respuesta de la Cloud Function
            if (result.data && (result.data as any).success) { // Usamos 'as any' para acceder a 'success'
                setRecommendations((result.data as any).recommendations);
            } else {
                setError('Error: No se pudieron generar recomendaciones. Intenta de nuevo.');
                console.error("Respuesta inesperada de la Cloud Function:", result);
            }

        } catch (err: any) { // Captura el error para tipado
            setError(`Ocurrió un error: ${err.message}. Asegúrate de que la Cloud Function esté desplegada y configurada correctamente.`);
            console.error("Error al llamar a la Cloud Function:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f4f8] text-[#333] flex justify-center items-start p-5 box-border font-manrope">
            <div className="max-w-xl w-full p-6 bg-white rounded-xl shadow-lg box-border">
                <h1 className="text-[#1D3557] text-center mb-6 text-3xl font-bold">Recomendaciones Caliope</h1>
                <textarea
                    id="user-preference-input"
                    placeholder="Describe tu necesidad de bienestar o belleza (ej. quiero relajarme, mejorar mi piel, sentirme más seguro/a)"
                    className="w-full p-3 mb-5 border-2 border-[#A8DADC] rounded-lg text-base min-h-32 resize-y focus:border-[#008e31] focus:outline-none"
                    value={userPreference}
                    onChange={(e) => setUserPreference(e.target.value)}
                ></textarea>
                <button
                    id="generate-recommendation-btn"
                    className="bg-[#A8DADC] text-[#1D3557] py-3 px-6 border-none rounded-lg text-lg font-semibold cursor-pointer w-full transition-all duration-300 ease-in-out shadow-md hover:bg-[#008e31] hover:text-white hover:translate-y-[-2px]"
                    onClick={handleGenerateRecommendation}
                    disabled={loading}
                >
                    {loading ? 'Generando...' : 'Generar Recomendación'}
                </button>

                <div id="recommendations-output" className="mt-8 p-5 border border-[#e0e0e0] rounded-xl bg-[#f9f9f9] min-h-40 box-border">
                    <h2 className="text-[#1D3557] mt-0 mb-4 text-2xl text-center">Tus Recomendaciones Personalizadas:</h2>
                    {loading && <p className="loading-indicator">Generando recomendaciones... Esto puede tardar unos segundos.</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {!loading && !error && recommendations.length === 0 && (
                        <div className="flex flex-col items-center gap-6">
                            <div
                                className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[360px]"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnXI4evedn7umLJDnu9ZOrwK_C7mMHuwN-fbL4rnQ4UnEzVqrUd7DVrvjIzzt3z4xEcyEn3eUewGSKqXCThXjqPY0Gyjubm54J8j3w9yPbjLEj4fbCSgMy0HMMngRW9jqTnbWG7ArSleTc0E8yUsmGZu-10TOVXnSQlxf5NytgRtRPVs2GShYpqWEUGznB0dLnt2dJG9DLl3FS3qwkf1dc_qsSKQ3esEtPcXDHVkQu9ZTGXZoRF2wiiP6iFEkJH9QKKoaUyMoOxZY")' }}
                            ></div>
                            <p className="text-[#0e181b] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Aún no hay recomendaciones</p>
                            <p className="text-[#0e181b] text-sm font-normal leading-normal max-w-[480px] text-center">Describe tu necesidad para generar recomendaciones personalizadas.</p>
                        </div>
                    )}
                    {!loading && recommendations.length > 0 && recommendations.map((rec, index) => (
                        <div key={index} className="recommendation-card">
                            <h3 className="text-[#1D3557] mt-0 mb-2 text-xl font-semibold">{rec.nombre}</h3>
                            <p className="text-base text-[#555] mb-1 leading-relaxed"><strong>Tipo:</strong> {rec.tipo}</p>
                            <p className="text-base text-[#555] mb-1 leading-relaxed">{rec.descripcion}</p>
                            <p className="text-base text-[#555] mb-1 leading-relaxed"><strong>Profesional/Clínica:</strong> {rec.profesional_sugerido}</p>
                            <p className="font-bold text-[#008e31] text-base mt-2 block"><strong>Puntos Caliope:</strong> {rec.puntos_caliope}</p>
                            {rec.beneficio_adicional && <p className="text-base text-[#555] mb-1 leading-relaxed"><strong>Beneficio Adicional:</strong> {rec.beneficio_adicional}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
