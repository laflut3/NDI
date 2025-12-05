import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
  const [volume, setVolume] = useState(0.3) // Volume par défaut à 30%
  const [showControls, setShowControls] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const audioRef = useRef(null)

  // Démarrer la musique automatiquement après interaction utilisateur
  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current && !hasStarted) {
        audioRef.current.play().then(() => {
          setHasStarted(true)
          console.log('Music started')
        }).catch(err => {
          console.log('Autoplay prevented:', err)
          // Réessayer après un court délai
          setTimeout(() => {
            audioRef.current?.play().then(() => {
              setHasStarted(true)
            }).catch(e => console.log('Retry failed:', e))
          }, 1000)
        })
      }
    }

    // Écouter plusieurs types d'interactions
    const events = ['click', 'keydown', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, startMusic, { once: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, startMusic)
      })
    }
  }, [hasStarted])

  // Mettre à jour le volume quand il change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  return (
    <>
      {/* Musique audio en arrière-plan */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/lounge-chill-rnb-350126.mp3" type="audio/mpeg" />
      </audio>

      {/* Contrôle de volume */}
      <div className="relative w-full">
        <div
          className="relative"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Bouton volume */}
          <button
            className="w-full py-2 bg-white/10 backdrop-blur-sm rounded-md text-white font-semibold hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2"
            title="Contrôle du volume"
          >
            {/* Icône volume */}
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <span>Musique</span>
          </button>

          {/* Panneau de contrôle du volume */}
          {showControls && (
            <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-2xl p-4 w-full animate-slideUp">
              <div className="space-y-3">
                {/* Titre */}
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-800">Volume de la Musique</p>
                  <p className="text-xs text-gray-500">Lounge Chill R&B</p>
                </div>

                {/* Contrôle du volume */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Niveau</span>
                    <span className="text-xs font-bold text-purple-600">{Math.round(volume * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Icône volume bas */}
                    <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
                    </svg>
                    {/* Slider de volume */}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                    />
                    {/* Icône volume haut */}
                    <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                    </svg>
                  </div>
                </div>

                {/* Statut */}
                <div className="text-center pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${hasStarted ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className="text-xs text-gray-600">
                      {hasStarted ? 'En lecture' : 'En attente...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Style personnalisé pour le slider */
        .slider-purple::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider-purple::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider-purple::-webkit-slider-runnable-track {
          background: linear-gradient(to right, #9333ea, #ec4899);
          height: 4px;
          border-radius: 2px;
        }

        .slider-purple::-moz-range-track {
          background: linear-gradient(to right, #9333ea, #ec4899);
          height: 4px;
          border-radius: 2px;
        }
      `}</style>
    </>
  )
}
