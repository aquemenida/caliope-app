"use client";

import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyAplYSnqpNilAVVGsnJcliLcXrDvcQQPrU",
    authDomain: "caliope-app-3.firebaseapp.com",
    projectId: "caliope-app-3",
    storageBucket: "caliope-app-3.appspot.com",
    messagingSenderId: "832855515589",
    appId: "1:832855515589:web:d59aa0aace2bafa081ebac",
    measurementId: "G-4YCJZXK5YE"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export default function Home() {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateCaliopeRecommendations = httpsCallable(functions, 'generateCaliopeRecommendations');

  const handleGenerateRecommendation = async () => {
    const userPreferenceInput = document.getElementById("user-preference-input") as HTMLTextAreaElement;
    const userPreference = userPreferenceInput.value;

    if (!userPreference.trim()) {
      setError("Por favor, ingresa tu preferencia para generar recomendaciones.");
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await generateCaliopeRecommendations({ userPreference });
      console.log("Recomendaciones recibidas:", result.data);
      setRecommendations(JSON.stringify(result.data, null, 2)); // Display as formatted JSON
    } catch (err: any) {
      console.error("Error al llamar a la función de Firebase:", err);
      setError(`Error al obtener recomendaciones: ${err.message || "Error desconocido"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Caliope App</h1>
        <div className="flex flex-col items-center">
          <textarea
            id="user-preference-input"
            placeholder="Describe tu necesidad de bienestar o belleza (ej. quiero relajarme, mejorar mi piel, sentirme más seguro/a)"
            rows={5}
            className="w-full p-4 border border-gray-300 rounded-md mb-4 text-black"
          ></textarea>
          <button
            id="generate-recommendation-btn"
            onClick={handleGenerateRecommendation}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generando..." : "Generar Recomendación"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {recommendations && (
            <div className="mt-8 w-full p-4 bg-gray-100 rounded-md text-black">
              <h2 className="text-2xl font-semibold mb-4">Recomendaciones:</h2>
              <pre className="whitespace-pre-wrap">{recommendations}</pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
