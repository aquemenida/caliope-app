"use client";

import { useState } from 'react';
import { generateCaliopeRecommendations, GenerateRecommendationsResponse } from './firebaseConfig';

export default function Page() {
  const [userPreference, setUserPreference] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecommendations = async () => {
    setLoading(true);
    setError(null);
    setRecommendations([]); // Clear previous recommendations

    try {
      const result = await generateCaliopeRecommendations({ preference: userPreference });
      const data = result.data as GenerateRecommendationsResponse; // Type assertion

      if (data && data.success) {
        setRecommendations(data.recommendations);
      } else {
        setError('No se pudieron obtener recomendaciones. Inténtalo de nuevo.');
      }
    } catch (err: any) {
      console.error("Error calling Cloud Function:", err);
      setError(`Error: ${err.message || 'Algo salió mal.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a Caliope</h1>
      <p style={styles.subtitle}>Tu asistente de desarrollo inteligente</p>

      <div style={styles.inputContainer}>
        <textarea
          style={styles.textarea}
          placeholder="Describe tu necesidad de bienestar o belleza (ej: 'Quiero relajarme después del trabajo y mejorar el aspecto de mi piel cansada.')"
          value={userPreference}
          onChange={(e) => setUserPreference(e.target.value)}
          rows={4}
        />
        <button
          style={styles.button}
          onClick={handleGenerateRecommendations}
          disabled={loading || !userPreference.trim()}
        >
          {loading ? 'Generando...' : 'Generar Recomendaciones'}
        </button>
      </div>

      {error && <p style={styles.errorText}>{error}</p>}

      {recommendations.length > 0 && (
        <div style={styles.recommendationsContainer}>
          <h2 style={styles.recommendationsTitle}>Nuestras Recomendaciones para Ti:</h2>
          {recommendations.map((rec, index) => (
            <div key={index} style={styles.recommendationCard}>
              <h3 style={styles.cardTitle}>{rec.nombre}</h3>
              <p><strong>Tipo:</strong> {rec.tipo}</p>
              <p><strong>Descripción:</strong> {rec.descripcion}</p>
              <p><strong>Profesional/Clínica:</strong> {rec.profesional_sugerido}</p>
              <p><strong>Puntos Caliope:</strong> {rec.puntos_caliope}</p>
              {rec.beneficio_adicional && <p><strong>Beneficio Adicional:</strong> {rec.beneficio_adicional}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Use minHeight to allow content to expand
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
    padding: '20px', // Add some padding
    boxSizing: 'border-box' as 'border-box', // Ensure padding is included in width/height
  },
  title: {
    fontSize: '48px',
    color: '#333',
    marginBottom: '16px',
    textAlign: 'center' as 'center',
  },
  subtitle: {
    fontSize: '24px',
    color: '#666',
    marginBottom: '32px',
    textAlign: 'center' as 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '80%',
    maxWidth: '600px',
    marginBottom: '32px',
    gap: '15px', // Space between textarea and button
  },
  textarea: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box' as 'border-box',
    resize: 'vertical' as 'vertical', // Allow vertical resizing
  },
  button: {
    padding: '12px 24px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  errorText: {
    color: 'red',
    marginTop: '10px',
    fontSize: '16px',
    textAlign: 'center' as 'center',
  },
  recommendationsContainer: {
    width: '80%',
    maxWidth: '800px',
    marginTop: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '25px',
  },
  recommendationsTitle: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center' as 'center',
  },
  recommendationCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  cardTitle: {
    fontSize: '22px',
    color: '#007bff',
    marginBottom: '10px',
  },
};
