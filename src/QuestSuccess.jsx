export const QUEST_SUCCESS_MESSAGES = {
  quiz1: {
    title: "Le Réveil des Machines",
    icon: "💾",
    messages: [
      "Les ventilateurs se remettent à tourner, les écrans s'allument : tu as brisé la malédiction de l'obsolescence forcée.",
      "Les anciens PC sortent du placard, fiers comme des guerriers à la retraite qu'on rappelle au combat.",
      "Grâce à toi, Linux vient de recruter sa première armée de machines ressuscitées. Windows vient de perdre son premier territoire."
    ],
    color: "from-green-500 to-emerald-600"
  },
  quiz2: {
    title: "La Détox Numérique",
    icon: "🚦",
    messages: [
      "Un vent frais souffle sur les data centers : les serveurs refroidissent, les boîtes mail respirent enfin.",
      "En appliquant les règles de la sobriété numérique, tu as prouvé qu'un autre Internet est possible : plus léger, plus propre, plus malin.",
      "La Résistance gagne en crédibilité : tu viens de prouver qu'on peut être connecté… sans cramer la planète."
    ],
    color: "from-blue-500 to-cyan-600"
  },
  quiz3: {
    title: "La Forge des Communs",
    icon: "🎁",
    messages: [
      "Des élèves, des profs, des techniciens et des bidouilleurs se réunissent autour de la même table.",
      "Ensemble, vous avez forgé des outils libres, réutilisables, accessibles à tous : les Communs numériques prennent vie.",
      "Désormais, chaque solution créée par l'un peut servir à tous. L'empire de Windows sent qu'il perd le monopole… et commence à trembler."
    ],
    color: "from-purple-500 to-pink-600"
  },
  quiz4: {
    title: "Le Grand Guide de la Résistance",
    icon: "🛡️",
    messages: [
      "Le message est passé : la résistance ne sera pas centralisée, elle sera locale, collective et déterminée.",
      "Enseignants, techniciens, élèves… tous comprennent qu'ils ont le pouvoir d'agir et de reprendre la main sur leurs outils.",
      "Le Manchot lève son drapeau : l'ère de la dépendance aveugle aux Big Tech touche à sa fin.",
      "Félicitations : tu viens d'écrire le premier chapitre de la libération numérique."
    ],
    color: "from-yellow-500 to-orange-600"
  }
}

export default function QuestSuccess({ questId, onClose }) {
  const quest = QUEST_SUCCESS_MESSAGES[questId]

  if (!quest) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative max-w-3xl w-full bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 rounded-3xl shadow-2xl border-2 border-purple-500/50 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute w-96 h-96 bg-yellow-500/40 rounded-full blur-3xl top-0 left-1/2 -translate-x-1/2 animate-pulse"></div>
          <div className="absolute w-64 h-64 bg-green-500/40 rounded-full blur-3xl bottom-0 right-0 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`inline-block p-6 rounded-full bg-gradient-to-br ${quest.color} shadow-2xl mb-4`}>
              <span className="text-6xl">{quest.icon}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🎉 Mission Accomplie ! 🎉
            </h1>
            <h2 className="text-2xl font-semibold text-yellow-300">
              {quest.title}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-4"></div>
          </div>

          {/* Success Messages */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <div className="space-y-4">
              {quest.messages.map((message, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/30 border-2 border-green-400 flex items-center justify-center mt-1">
                    <span className="text-green-300 font-bold">✓</span>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="group relative px-10 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-3">
                Continuer la Résistance
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Penguin Footer */}
          <div className="mt-6 text-center">
            <p className="text-cyan-300 text-lg font-semibold">
              🐧 Le Manchot est fier de toi !
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
