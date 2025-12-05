import { useState } from 'react'

export default function LoadingScreen({ isFadingOut, onLogoLoaded }) {
  const [logoLoaded, setLogoLoaded] = useState(false)

  const handleLogoLoad = () => {
    setLogoLoaded(true)
    if (onLogoLoaded) {
      onLogoLoaded()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${
        isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'
      }`}
      style={{
        backgroundColor: '#ffffff',
        animation: isFadingOut ? 'fadeOut 0.6s ease-out forwards' : 'fadeIn 0.5s ease-in'
      }}
    >
      {/* Animated Logo */}
      <div className="mb-8">
        <img
          src="/logo-anime.gif"
          alt="Logo Confrérie du Manchot"
          className="w-80 h-80 object-contain drop-shadow-2xl"
          onLoad={handleLogoLoad}
        />
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-6 tracking-wide">
          Chargement
        </h2>

        {/* Loading Dots Animation */}
        <div className="flex justify-center gap-3 mb-4">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce shadow-lg shadow-blue-600/50" style={{ animationDelay: '0ms' }}></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce shadow-lg shadow-blue-600/50" style={{ animationDelay: '150ms' }}></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce shadow-lg shadow-blue-600/50" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      {/* Additional Loading Message */}
      <p className="mt-8 text-gray-600 text-lg font-medium">
        Préparation de la mission...
      </p>

      {/* Penguin Icon */}
      <div className="mt-6 text-6xl animate-pulse">
        🐧
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
