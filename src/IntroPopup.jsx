export default function IntroPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Popup Container */}
      <div className="relative max-w-4xl w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl shadow-2xl border-2 border-purple-500/50 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute w-64 h-64 bg-blue-500/30 rounded-full blur-3xl -top-32 -left-32 animate-pulse"></div>
          <div className="absolute w-64 h-64 bg-purple-500/30 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🐧</div>
            <h1 className="text-4xl font-bold text-white mb-2">
              La Confrérie du Manchot
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
          </div>

          {/* Scenario Global */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
              <span>⚠️</span>
              <span>Scénario Global</span>
            </h2>
            <div className="space-y-4 text-white/90 text-lg leading-relaxed">
              <p>
                Le monde numérique a été envahi par le <span className="text-red-400 font-semibold">Système d'Exploitation Unique™ : Windows</span>.
                Fin de support, licences hors de prix, data centers gloutons et ordinateurs jetés alors qu'ils fonctionnent encore…
                <span className="text-orange-400 font-semibold"> La planète croule sous les déchets électroniques</span>.
              </p>
              <p>
                Dans l'ombre, une résistance s'organise : <span className="text-blue-300 font-bold">la Confrérie du Manchot</span>.
                Avec l'aide de <span className="text-green-300 font-semibold">NIRD</span> et du <span className="text-purple-300 font-semibold">Village Numérique Résistant</span>,
                les joueurs doivent libérer les machines, reprendre le contrôle de leurs données et restaurer l'équilibre du numérique
                grâce à <span className="text-cyan-300 font-semibold">Linux</span>, aux <span className="text-pink-300 font-semibold">logiciels libres</span>,
                à la <span className="text-yellow-300 font-semibold">sobriété</span> et aux <span className="text-emerald-300 font-semibold">communs</span>.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
              <span>🎯</span>
              <span>Votre Mission</span>
            </h2>
            <div className="space-y-3 text-white/90 text-base leading-relaxed">
              <p>
                Bienvenue dans un monde où <span className="text-red-400 font-semibold">Windows a tout raflé</span>.
                Les écoles jettent des ordinateurs encore en état de marche, les licences coûtent un rein,
                les données voyagent aux quatre coins du monde sans qu'on sache vraiment pourquoi…
                et la planète étouffe sous les déchets électroniques.
              </p>
              <p>
                Mais dans les tréfonds des salles info, <span className="text-blue-300 font-bold">une révolte s'organise</span>.
                Un petit manchot t'observe, l'air déterminé : <span className="text-cyan-300 font-bold text-xl">🐧 Linux</span>.
              </p>
              <p>
                Avec la <span className="text-green-300 font-semibold">démarche NIRD</span> et le <span className="text-purple-300 font-semibold">Village Numérique Résistant</span>,
                tu vas mener la contre-attaque : ressusciter les vieux PC, pratiquer la sobriété numérique,
                partager des outils libres et redonner le pouvoir aux utilisateurs.
              </p>
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30 mt-4">
                <p className="text-yellow-200 font-semibold text-lg">
                  ⚡ Ton arme principale ?
                </p>
                <p className="text-white text-base mt-2">
                  Tes connaissances… et quelques bons réflexes de hacker responsable.
                </p>
              </div>
            </div>
          </div>

          {/* Nuit de l'Info Challenge */}
          <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md rounded-2xl p-6 mb-6 border border-purple-400/30">
            <h2 className="text-2xl font-bold text-pink-300 mb-3 flex items-center gap-2">
              <span>🌙</span>
              <span>Défis Nuit de l'Info 2025</span>
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Chaque quiz représente une <span className="text-yellow-300 font-bold">"mission"</span> dans cette reconquête.
              Réussis les quiz, débloque les niveaux, et prouve au monde qu'un autre numérique est possible :
              <span className="text-green-300 font-semibold"> plus libre</span>,
              <span className="text-blue-300 font-semibold"> plus sobre</span>,
              <span className="text-purple-300 font-semibold"> plus juste</span>.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <p className="text-white/80 text-xl mb-6">
              Prêt à libérer les machines et à faire tomber l'empire de Windows ?
            </p>
            <p className="text-cyan-300 text-2xl font-bold mb-8">
              🐧 Le Manchot compte sur toi.
            </p>

            <button
              onClick={onClose}
              className="group relative px-12 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-3">
                Commencer la Mission
                <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* Custom scrollbar for the popup */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  )
}
