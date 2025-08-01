"use client"; // This is a client component

import { useState } from 'react';
// No se importará Firebase functions aquí, ya que el curador podría usar una API diferente o un proceso de subida directa.

export default function CuratorPage() {
  const [contentTitle, setContentTitle] = useState('');
  const [contentDescription, setContentDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitContent = async () => {
    setLoading(true);
    setStatusMessage('');

    // Aquí iría la lógica para subir el contenido.
    // Por ejemplo, una llamada a una API de backend o a Firebase Firestore/Storage.
    // Por ahora, solo simularemos una subida.
    try {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatusMessage('Contenido enviado exitosamente. ¡Gracias por tu contribución!');
      // Limpiar los campos después de la subida exitosa
      setContentTitle('');
      setContentDescription('');
      setImageUrl('');
      setCategory('');
    } catch (error) {
      console.error("Error al enviar contenido:", error);
      setStatusMessage('Error al enviar el contenido. Por favor, inténtalo de nuevo.');
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
          <h2 className="text-[#0e1b17] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Curator</h2>
        </div>
        <h1 className="text-[#0e1b17] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Manage Content</h1>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              placeholder="Content Title"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b17] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ef] focus:border-none h-14 placeholder:text-[#4e977f] p-4 text-base font-normal leading-normal"
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <textarea
              placeholder="Content Description"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b17] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ef] focus:border-none min-h-36 placeholder:text-[#4e977f] p-4 text-base font-normal leading-normal"
              value={contentDescription}
              onChange={(e) => setContentDescription(e.target.value)}
            ></textarea>
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              placeholder="Image URL"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b17] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ef] focus:border-none h-14 placeholder:text-[#4e977f] p-4 text-base font-normal leading-normal"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              placeholder="Category (e.g., Wellness, Fitness)"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b17] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ef] focus:border-none h-14 placeholder:text-[#4e977f] p-4 text-base font-normal leading-normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
        </div>
        <div className="flex px-4 py-3">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#14b781] text-[#0e1b17] text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={handleSubmitContent}
            disabled={loading}
          >
            <span className="truncate">{loading ? 'Submitting Content...' : 'Submit Content'}</span>
          </button>
        </div>

        {statusMessage && <p className={`px-4 py-3 text-center ${statusMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{statusMessage}</p>}

        <h2 className="text-[#0e1b17] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Recently Added Content</h2>
        <div className="p-4">
          <p className="text-[#4e977f] text-sm font-normal leading-normal">
            This section will display a list of content added by the curator.
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-2 border-t border-[#e7f3ef] bg-[#f8fcfa] px-4 pb-3 pt-2">
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#0e1b17]" href="/dashboard"> {/* Changed to Dashboard */}
            <div className="text-[#0e1b17] flex h-8 items-center justify-center" data-icon="House" data-size="24px" data-weight="fill"> {/* Changed icon to fill for active */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#0e1b17] text-xs font-medium leading-normal tracking-[0.015em]">Dashboard</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#0e1b17]" href="/curator"> {/* Changed to Curator and active */}
            <div className="text-[#0e1b17] flex h-8 items-center justify-center" data-icon="ListBullets" data-size="24px" data-weight="fill"> {/* Changed icon to fill for active */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M56,128a16,16,0,1,1-16-16A16,16,0,0,1,56,128ZM40,48A16,16,0,1,0,56,64,16,16,0,0,0,40,48Zm0,128a16,16,0,1,0,16,16A16,16,0,0,0,40,176Zm176-64H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A8,8,0,0,0,216,112Zm0-64H88a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48Zm0,128H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#0e1b17] text-xs font-medium leading-normal tracking-[0.015em]">Curator</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e977f]" href="/catalog"> {/* Changed to Catalog */}
            <div className="text-[#4e977f] flex h-8 items-center justify-center" data-icon="ListBullets" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M56,128a16,16,0,1,1-16-16A16,16,0,0,1,56,128ZM40,48A16,16,0,1,0,56,64,16,16,0,0,0,40,48Zm0,128a16,16,0,1,0,16,16A16,16,0,0,0,40,176Zm176-64H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A8,8,0,0,0,216,112Zm0-64H88a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48Zm0,128H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#4e977f] text-xs font-medium leading-normal tracking-[0.015em]">Catalog</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e977f]" href="/notifications"> {/* Changed to Notifications */}
            <div className="text-[#4e977f] flex h-8 items-center justify-center" data-icon="Bell" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M221.8,170.92c-20.17-20.16-32.19-48.24-32.19-78.92a88,88,0,0,0-176,0c0,30.68-12,58.76-32.19,78.92A16,16,0,0,0,16,184H240a16,16,0,0,0,5.8-13.08ZM128,232a24,24,0,0,1-24-24h48A24,24,0,0,1,128,232ZM48,92a80,80,0,0,1,160,0c0,28.31-11.39,54.4-30.19,73.12H78.19C59.39,146.4,48,120.31,48,92Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#4e977f] text-xs font-medium leading-normal tracking-[0.015em]">Notifications</p>
          </a>
        </div>
        <div className="h-5 bg-[#f8fcfa]"></div>
      </div>
    </div>
  );
}