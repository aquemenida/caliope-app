"use client";
import { useState, useCallback } from 'react';
import { functions } from '../../firebase/firebase';
import { httpsCallable } from 'firebase/functions';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecommendations = useCallback(async () => {
        setLoading(true);
        setError(null);
        setRecommendations('');
        try {
          console.log("Sending prompt:", userInput); // Added for debugging
          const generateCaliopeRecommendationsCallable = httpsCallable(functions, 'generateCaliopeRecommendations');
      const result = await generateCaliopeRecommendationsCallable({ prompt: userInput });
      setRecommendations((result.data as any).recommendations);
    } catch (err) {
      console.error("Error calling Cloud Function:", err);
      setError("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userInput]);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#f8fcfa] @[480px]:rounded-xl min-h-80"
              style={{ backgroundImage: `url(${getProxiedImageUrl(user.photoURL)})` }}
            ></div>
          </div>
        </div>
        <h2 className="text-[#0e1b17] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Bienvenido a la aplicación Caliope</h2>
        <p className="text-[#0e1b17] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">Enter your preferences to get personalized beauty and wellness recommendations.</p>
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b781]"
              rows={5}
              placeholder="e.g., 'I want recommendations for glowing skin and healthy hair.'"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#14b781] text-[#0e1b17] text-base font-bold leading-normal tracking-[0.015em] w-full"
              onClick={generateRecommendations}
              disabled={loading || !userInput}
            >
              <span className="truncate">{loading ? 'Generating...' : 'Get Recommendations'}</span>
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {recommendations && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-[#0e1b17] text-lg font-bold mb-2">Your Recommendations:</h3>
                <p className="text-[#0e1b17] text-base whitespace-pre-wrap">{recommendations}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div><div className="h-5 bg-[#f8fcfa]"></div></div>
    </div>
  );
}
