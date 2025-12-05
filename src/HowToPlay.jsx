export default function HowToPlay({ onClose }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" style={{animation: 'fadeIn 0.3s ease-out'}}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden" style={{animation: 'slideUp 0.4s ease-out'}}>
        {/* Header */}
        <div className="p-6 text-white relative overflow-hidden flex-shrink-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Comment Jouer</h2>
            <p className="text-white/90 text-sm">Guide de démarrage rapide</p>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-8 space-y-6">
            {/* Controls */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contrôles du Camion</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded font-mono font-bold text-sm shadow-sm min-w-[60px] text-center">↑ W</kbd>
                  <span className="text-sm text-gray-700 font-medium">Avancer</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded font-mono font-bold text-sm shadow-sm min-w-[60px] text-center">↓ S</kbd>
                  <span className="text-sm text-gray-700 font-medium">Reculer</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded font-mono font-bold text-sm shadow-sm min-w-[60px] text-center">← A</kbd>
                  <span className="text-sm text-gray-700 font-medium">Tourner à gauche</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded font-mono font-bold text-sm shadow-sm min-w-[60px] text-center">→ D</kbd>
                  <span className="text-sm text-gray-700 font-medium">Tourner à droite</span>
                </div>
              </div>
              <div className="mt-3 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-2 border-orange-200">
                <div className="flex items-center gap-3">
                  <kbd className="px-4 py-2 bg-white border-2 border-gray-300 rounded font-mono font-bold shadow-sm">ESPACE</kbd>
                  <span className="text-sm font-semibold text-gray-700">Turbo Boost</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Mission */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Votre Mission</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <p className="font-semibold text-gray-800">Ouvrez le tracker de quêtes</p>
                    <p className="text-sm text-gray-600">Cliquez sur une <span className="font-semibold text-purple-600">quête principale</span> (numérotées 1-4) ou une <span className="font-semibold text-blue-600">quête secondaire</span> pour l'activer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <p className="font-semibold text-gray-800">Suivez les flèches de navigation</p>
                    <p className="text-sm text-gray-600">Une <span className="font-semibold text-yellow-600">flèche jaune 3D</span> apparaît au-dessus du POI ciblé par la quête selectionné</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <p className="font-semibold text-gray-800">Approchez les sphères lumineuses</p>
                    <p className="text-sm text-gray-600">Chaque POI propose du contenu éducatif différent (quiz, chatbot, vidéos, faits)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <p className="font-semibold text-gray-800">Complétez les quêtes</p>
                    <p className="text-sm text-gray-600">Gagnez de l'XP, montez de niveau et débloquez des badges en complétant les missions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* POI Types */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Types de Points d'Intérêt</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-400 shadow-sm"></div>
                  <span className="text-sm text-gray-700 font-medium">Quiz éducatifs</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-sm"></div>
                  <span className="text-sm text-gray-700 font-medium">Chatbot IA</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-4 h-4 rounded-full bg-purple-400 shadow-sm"></div>
                  <span className="text-sm text-gray-700 font-medium">Faits fascinants</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-4 h-4 rounded-full bg-pink-400 shadow-sm"></div>
                  <span className="text-sm text-gray-700 font-medium">Vidéo éducative</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Tips */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Conseils Utiles</h3>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-200">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                    <span>La boussole en haut indique la direction et la distance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                    <span>Votre progression est sauvegardée automatiquement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                    <span>Évitez les personnages qui se promènent sur le campus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                    <span>Consultez le tracker de quêtes sur le côté gauche</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200">
          <div className="p-6">
            <button
              onClick={onClose}
              className="w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
            >
              Commencer à Jouer →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
