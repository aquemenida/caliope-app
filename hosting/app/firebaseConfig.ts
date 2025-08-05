import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

interface Recommendation {
  nombre: string;
  tipo: string;
  descripcion: string;
  profesional_sugerido: string;
  puntos_caliope: number;
  beneficio_adicional?: string;
}

export interface GenerateRecommendationsResponse {
  success: boolean;
  recommendations: Recommendation[];
}

const firebaseConfig = {
  apiKey: "AIzaSyC9hu3lkQfrNmK0SVb6gQdz8unoRBDn20o",
  authDomain: "caliope-app-3.firebaseapp.com",
  projectId: "caliope-app-3",
  storageBucket: "caliope-app-3.appspot.com",
  messagingSenderId: "108956585264",
  appId: "1_108956585264_web_1234567890abcdef123456",
  measurementId: "G-1234567890"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export const generateCaliopeRecommendations = httpsCallable<{ preference: string }, GenerateRecommendationsResponse>(functions, 'generateCaliopeRecommendations');