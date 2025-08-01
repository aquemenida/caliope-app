"use client"; // This is a client component

import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../../firebase/firebase'; // Asegúrate de que la ruta sea correcta

export default function RecommendationsPage() {
  const [wellnessGoals, setWellnessGoals] = useState('');
  const [pastActivities, setPastActivities] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    setRecommendations('');

    try {
      const functions = getFunctions(app);
      const generateCaliopeRecommendations = httpsCallable(functions, 'generateCaliopeRecommendations');

      const result = await generateCaliopeRecommendations({
        prompt: `Mis objetivos de bienestar son: ${wellnessGoals}. Mis actividades de bienestar pasadas incluyen: ${pastActivities}. Basado en esto, por favor, dame recomendaciones de bienestar detalladas y personalizadas.`
      });

      setRecommendations(result.data.recommendations as string);
    } catch (err) {
      console.error("Error calling Cloud Function:", err);
      setError('Error al obtener recomendaciones. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center bg-[#f8fcfa] p-4 pb-2 justify-between">
          <div className="text-[#0e1b17] flex size-12 shrink-0 items-center" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-[#0e1b17] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Recommendations</h2>
        </div>
        <h1 className="text-[#0e1b17] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Tell us about yourself</h1>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <textarea
              placeholder="What are your wellness goals?"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b17] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ef] focus:border-none min-h-36 placeholder:text-[#4e977f] p-4 text-base font-normal leading-normal"
              value={wellnessGoals}
              onChange={(e) => setWellnessGoals(e.target.value)}
            ></textarea>
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <textarea
              placeholder="What wellness activities have you done in the past?"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b17] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ef] focus:border-none min-h-36 placeholder:text-[#4e977f] p-4 text-base font-normal leading-normal"
              value={pastActivities}
              onChange={(e) => setPastActivities(e.target.value)}
            ></textarea>
          </label>
        </div>
        <div className="flex px-4 py-3">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#14b781] text-[#0e1b17] text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={getRecommendations}
            disabled={loading}
          >
            <span className="truncate">{loading ? 'Getting Recommendations...' : 'Get Recommendations'}</span>
          </button>
        </div>

        {error && <p className="text-red-500 px-4 py-3 text-center">{error}</p>}

        <h2 className="text-[#0e1b17] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Your Recommendations</h2>
        <div className="p-4">
          {recommendations ? (
            <div className="flex flex-col gap-3">
              {recommendations.split('\n').map((line, index) => (
                <p key={index} className="text-[#0e1b17] text-base font-normal leading-normal">{line}</p>
              ))}
            </div>
          ) : (
            <p className="text-[#4e977f] text-sm font-normal leading-normal">No recommendations yet. Fill in your goals and activities to get started!</p>
          )}
        </div>
      </div>
      <div>
        <div className="flex gap-2 border-t border-[#e7f3ef] bg-[#f8fcfa] px-4 pb-3 pt-2">
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#0e1b17]" href="/dashboard">
            <div className="text-[#0e1b17] flex h-8 items-center justify-center" data-icon="House" data-size="24px" data-weight="fill">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#0e1b17] text-xs font-medium leading-normal tracking-[0.015em]">Dashboard</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e977f]" href="/curator">
            <div className="text-[#4e977f] flex h-8 items-center justify-center" data-icon="ListBullets" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M56,128a16,16,0,1,1-16-16A16,16,0,0,1,56,128ZM40,48A16,16,0,1,0,56,64,16,16,0,0,0,40,48Zm0,128a16,16,0,1,0,16,16A16,16,0,0,0,40,176Zm176-64H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A8,8,0,0,0,216,112Zm0-64H88a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48Zm0,128H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#4e977f] text-xs font-medium leading-normal tracking-[0.015em]">Curator</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e977f]" href="/rewards">
            <div className="text-[#4e977f] flex h-8 items-center justify-center" data-icon="Gift" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#4e977f] text-xs font-medium leading-normal tracking-[0.015em]">Rewards</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e977f]" href="/profile">
            <div className="text-[#4e977f] flex h-8 items-center justify-center" data-icon="User" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#4e977f] text-xs font-medium leading-normal tracking-[0.015em]">Profile</p>
          </a>
        </div>
        <div className="h-5 bg-[#f8fcfa]"></div>
      </div>
    </div>
  );
}