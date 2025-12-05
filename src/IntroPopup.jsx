export default function IntroPopup({ onClose }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" style={{animation: 'fadeIn 0.3s ease-out'}}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden" style={{animation: 'slideUp 0.4s ease-out'}}>
        {/* Header */}
        <div className="p-6 text-white relative overflow-hidden flex-shrink-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-2">La Confrérie du Manchot</h2>
            <p className="text-white/90 text-sm">Une mission pour l'indépendance numérique</p>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-8 space-y-6">
            {/* Scenario */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Scénario Global</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Le monde numérique a été envahi par le <span className="text-red-600 font-semibold">Système d'Exploitation Unique : Windows</span>.
                  Fin de support, licences hors de prix, data centers gloutons et ordinateurs jetés alors qu'ils fonctionnent encore…
                  <span className="text-orange-600 font-semibold"> La planète croule sous les déchets électroniques</span>.
                </p>
                <p>
                  Dans l'ombre, une résistance s'organise : <span className="text-blue-600 font-bold">la Confrérie du Manchot</span>.
                  Avec l'aide de <span className="text-green-600 font-semibold">NIRD</span> et du <span className="text-purple-600 font-semibold">Village Numérique Résistant</span>,
                  les joueurs doivent libérer les machines, reprendre le contrôle de leurs données et restaurer l'équilibre du numérique
                  grâce à <span className="text-cyan-600 font-semibold">Linux</span>, aux <span className="text-pink-600 font-semibold">logiciels libres</span>,
                  à la <span className="text-yellow-600 font-semibold">sobriété</span> et aux <span className="text-emerald-600 font-semibold">communs</span>.
                </p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Mission */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Votre Mission</h3>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  Bienvenue dans un monde où <span className="text-red-600 font-semibold">Windows a tout raflé</span>.
                  Les écoles jettent des ordinateurs encore en état de marche, les licences coûtent un rein,
                  les données voyagent aux quatre coins du monde sans qu'on sache vraiment pourquoi…
                  et la planète étouffe sous les déchets électroniques.
                </p>
                <p>
                  Mais dans les tréfonds des salles info, <span className="text-blue-600 font-bold">une révolte s'organise</span>.
                  Un symbole de résistance émerge : <span className="text-cyan-600 font-bold">Linux</span>.
                </p>
                <p>
                  Avec la <span className="text-green-600 font-semibold">démarche NIRD</span> et le <span className="text-purple-600 font-semibold">Village Numérique Résistant</span>,
                  vous allez mener la contre-attaque : ressusciter les vieux PC, pratiquer la sobriété numérique,
                  partager des outils libres et redonner le pouvoir aux utilisateurs.
                </p>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200 mt-4">
                  <p className="text-yellow-900 font-semibold text-base">
                    Votre arme principale
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    Vos connaissances… et quelques bons réflexes de hacker responsable.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Challenge */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Défis Nuit de l'Info 2025</h3>
              <p className="text-gray-700 leading-relaxed">
                Chaque quiz représente une <span className="text-purple-600 font-bold">mission</span> dans cette reconquête.
                Réussissez les quiz, débloquez les niveaux, et prouvez au monde qu'un autre numérique est possible :
                <span className="text-green-600 font-semibold"> plus libre</span>,
                <span className="text-blue-600 font-semibold"> plus sobre</span>,
                <span className="text-purple-600 font-semibold"> plus juste</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200">
          <div className="p-6">
            <p className="text-center text-gray-600 text-lg mb-4">
              Prêt à libérer les machines et à faire tomber l'empire des monopoles ?
            </p>
            <button
              onClick={onClose}
              className="w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
            >
              Commencer la Mission →
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
