import { useEffect, useState } from 'react'
import Quiz from './Quiz'
import Chatbot from './Chatbot'

export default function Overlay({ poiData, onClose, onContinue }) {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizResults, setQuizResults] = useState(null)

  // For quiz type, user must complete it to exit
  const canClose = poiData.type !== 'quiz' || quizCompleted

  // Handle ESC key to close modal (only if allowed)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && canClose) {
        if (onContinue) onContinue(poiData)
        else onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose, onContinue, poiData, canClose])

  // Handle quiz completion - just mark complete, don't auto-close
  const handleQuizComplete = (score, percentage, xpEarned) => {
    setQuizCompleted(true)
    setQuizResults({ score, percentage, xpEarned })
    // Don't auto-close - let the user click Continue button
  }

  // Handle continue button click after quiz completion
  const handleContinueAfterQuiz = () => {
    if (onContinue && quizResults) {
      const poiWithResults = {
        ...poiData,
        quizResults: quizResults
      }
      onContinue(poiWithResults)
    }
  }

  // Render different content based on POI type
  const renderContent = () => {
    switch (poiData.type) {
      case 'quiz':
        return <QuizContent poiData={poiData} onComplete={handleQuizComplete} />
      case 'chatbot':
        return <ChatbotContent poiData={poiData} />
      case 'funfact':
        return <FunFactContent poiData={poiData} />
      case 'video':
        return <VideoContent poiData={poiData} />
      default:
        return <DefaultContent poiData={poiData} />
    }
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" style={{animation: 'fadeIn 0.3s ease-out'}}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden" style={{animation: 'slideUp 0.4s ease-out'}}>
        {/* Header with icon and color accent - Hidden for quiz */}
        {poiData.type !== 'quiz' && (
          <div
            className="p-6 text-white relative overflow-hidden flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${poiData.color} 0%, ${poiData.color}dd 100%)`
            }}
          >
            <div className="absolute top-0 right-0 text-9xl opacity-10 transform translate-x-8 -translate-y-4">
              {poiData.icon}
            </div>
            <div className="relative z-10">
              <div className="text-5xl mb-3">{poiData.icon}</div>
              <h2 className="text-3xl font-bold mb-2">{poiData.content.heading}</h2>
              <p className="text-white/90 text-sm">
                {poiData.type === 'chatbot' && 'Assistant Numérique'}
                {poiData.type === 'funfact' && 'Découverte de Faits'}
                {poiData.type === 'video' && 'Contenu Vidéo'}
              </p>
            </div>
          </div>
        )}

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1">
          <div className="p-8">
            {renderContent()}

            {/* Action button - for non-quiz types */}
            {poiData.type !== 'quiz' && (
              <button
                onClick={() => {
                  if (onContinue) onContinue(poiData)
                  else onClose()
                }}
                className="mt-8 w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${poiData.color} 0%, ${poiData.color}cc 100%)`
                }}
              >
                Continuer la Mission →
              </button>
            )}

            {/* Action button - for quiz after completion */}
            {poiData.type === 'quiz' && quizCompleted && (
              <button
                onClick={handleContinueAfterQuiz}
                className="mt-8 w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-green-500 to-emerald-600"
              >
                Continuer la Mission →
              </button>
            )}
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 border-t border-gray-200">
          {poiData.type !== 'quiz' && (
            <div className="px-8 py-4 text-center bg-gray-50">
              <p className="text-gray-500 text-xs">
                Appuyez sur ESC ou cliquez sur le bouton pour reprendre votre mission
              </p>
            </div>
          )}
          {poiData.type === 'quiz' && !quizCompleted && (
            <div className="px-8 py-4 text-center bg-orange-50">
              <p className="text-orange-600 text-sm font-semibold">
                ⚠️ Vous devez terminer le quiz pour continuer
              </p>
            </div>
          )}
        </div>
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

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

// Quiz POI Content - Renders the actual Quiz component
function QuizContent({ poiData, onComplete }) {
  if (!poiData.quizData) {
    return (
      <div className="text-red-600 p-4">
        Error: Quiz data not found for this POI
      </div>
    )
  }

  return <Quiz quizData={poiData.quizData} onComplete={onComplete} />
}

// Chatbot POI Content - Utilise le vrai composant Chatbot
function ChatbotContent({ poiData }) {
  return (
    <div className="space-y-4">
      {/* Introduction */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-200">
        <p className="text-gray-700 leading-relaxed">
          {poiData.content.description}
        </p>
      </div>

      {/* Chatbot interactif */}
      <Chatbot />
    </div>
  )
}


// Fun Fact POI Content
function FunFactContent({ poiData }) {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
        <p className="text-gray-700 leading-relaxed">
          Découvrez des informations surprenantes sur la technologie, l'écologie numérique et l'impact de nos usages quotidiens.
        </p>
      </div>

      {/* Facts Grid */}
      <div className="space-y-4">
        {poiData.content.facts.map((fact, index) => {
          const emoji = fact.split(' ')[0]
          const text = fact.split(' ').slice(1).join(' ')

          // Assign different gradient colors to each fact
          const gradients = [
            'from-blue-50 to-cyan-50 border-blue-300',
            'from-green-50 to-emerald-50 border-green-300',
            'from-purple-50 to-violet-50 border-purple-300',
            'from-orange-50 to-red-50 border-orange-300',
            'from-pink-50 to-rose-50 border-pink-300',
            'from-yellow-50 to-amber-50 border-yellow-300'
          ]

          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${gradients[index % gradients.length]} p-5 rounded-xl border-2 hover:shadow-lg transition-all hover:scale-[1.02] cursor-default`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <h5 className="font-bold text-gray-800">Fait #{index + 1}</h5>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
        <div className="flex items-start gap-4">
          <div className="text-3xl">📚</div>
          <div>
            <h5 className="font-bold text-gray-800 mb-2">Le Saviez-Vous ?</h5>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Ces faits illustrent l'importance de la sobriété numérique et du réemploi du matériel informatique. Chaque geste compte pour réduire notre empreinte écologique !
            </p>
            <div className="bg-white p-4 rounded-lg">
              <h6 className="font-semibold text-gray-800 text-sm mb-2">Actions Concrètes :</h6>
              <ul className="text-gray-700 text-xs space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Recyclez vos anciens appareils électroniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Utilisez Linux pour prolonger la vie de vos ordinateurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Réduisez votre consommation de streaming vidéo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Partagez ces connaissances avec votre entourage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl text-white text-center">
          <div className="text-3xl font-bold mb-1">50M</div>
          <div className="text-xs text-white/90">Tonnes de déchets électroniques/an</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-xl text-white text-center">
          <div className="text-3xl font-bold mb-1">96%</div>
          <div className="text-xs text-white/90">Des serveurs utilisent Linux</div>
        </div>
      </div>
    </div>
  )
}

// Video POI Content - Displays embedded YouTube video
function VideoContent({ poiData }) {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-6 rounded-xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎬</div>
          <div>
            <h3 className="text-xl font-bold mb-2">{poiData.content.heading}</h3>
            <p className="text-white/90 leading-relaxed">
              {poiData.content.description}
            </p>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
          src={poiData.content.videoUrl}
          title={poiData.content.heading}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Flyer Display - if available */}
      {poiData.content.flyerUrl && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl">📄</div>
            <div>
              <h5 className="font-bold text-gray-800 mb-2">Flyer de l'Événement</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                Découvrez plus d'informations sur cet événement
              </p>
            </div>
          </div>
          {/* Flyer Image */}
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <img
              src={poiData.content.flyerUrl}
              alt="Flyer événement"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <h5 className="font-bold text-gray-800 mb-2">Pourquoi c'est important ?</h5>
            <p className="text-gray-700 text-sm leading-relaxed">
              La diversité dans le numérique enrichit l'innovation et favorise la création de technologies plus inclusives et équitables pour tous.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Default content for backwards compatibility
function DefaultContent({ poiData }) {
  return (
    <div className="space-y-4">
      {poiData.content.points?.map((point, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: poiData.color }}
          >
            {index + 1}
          </div>
          <p className="text-gray-700 leading-relaxed text-sm flex-1 pt-1">
            {point}
          </p>
        </div>
      ))}
    </div>
  )
}
