import { useEffect } from 'react'
import Chatbot from './Chatbot'

export default function Overlay({ poiData, onClose, onContinue }) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (onContinue) onContinue(poiData)
        else onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose, onContinue, poiData])

  // Render different content based on POI type
  const renderContent = () => {
    switch (poiData.type) {
      case 'quiz':
        return <QuizContent poiData={poiData} />
      case 'chatbot':
        return <ChatbotContent poiData={poiData} />
      case 'funfact':
        return <FunFactContent poiData={poiData} />
      default:
        return <DefaultContent poiData={poiData} />
    }
  }
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden animate-slideUp">
        {/* Header with icon and color accent */}
        <div
          className="p-6 text-white relative overflow-hidden"
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
              {poiData.type === 'quiz' && 'Quiz Station'}
              {poiData.type === 'chatbot' && 'Digital Assistant'}
              {poiData.type === 'funfact' && 'Fun Fact Discovery'}
            </p>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="p-8">
          {renderContent()}

          {/* Action button */}
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
            Continue Mission →
          </button>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 text-center">
          <p className="text-gray-500 text-xs">
            Press ESC or click the button to resume your mission
          </p>
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

// Quiz POI Content
function QuizContent({ poiData }) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-2xl text-white">
        <div className="absolute top-0 right-0 text-9xl opacity-10 transform translate-x-4 -translate-y-4">
          📝
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl">
              🎯
            </div>
            <div>
              <h3 className="text-2xl font-bold">Challenge Accepted!</h3>
              <p className="text-white/90 text-sm">Test your digital independence knowledge</p>
            </div>
          </div>
          <p className="text-white/95 leading-relaxed">
            {poiData.content.description}
          </p>
        </div>
      </div>

      {/* Quiz Preview Cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Question Preview */}
        <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
              ?
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-800 mb-2">Interactive Questions</h4>
              <p className="text-gray-600 text-sm">Multiple choice questions about open source, sustainability, and digital rights</p>
              <div className="mt-3 flex items-center gap-2 text-blue-600 text-xs font-semibold">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span>Ready to start</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
              📊
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-800 mb-2">Track Your Progress</h4>
              <p className="text-gray-600 text-sm">Earn XP and unlock badges as you complete challenges</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="bg-white/80 p-2 rounded-lg text-center">
                  <div className="text-xl font-bold text-green-600">+125</div>
                  <div className="text-xs text-gray-600">XP Reward</div>
                </div>
                <div className="bg-white/80 p-2 rounded-lg text-center">
                  <div className="text-xl">🏆</div>
                  <div className="text-xs text-gray-600">Badges</div>
                </div>
                <div className="bg-white/80 p-2 rounded-lg text-center">
                  <div className="text-xl">📈</div>
                  <div className="text-xs text-gray-600">Levels</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Element */}
        <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
              ⏱️
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-800 mb-2">Beat the Clock</h4>
              <p className="text-gray-600 text-sm">Answer quickly for bonus points and climb the leaderboard</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 bg-white/80 h-2 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-sm font-bold text-orange-600">Ready!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border-2 border-purple-300">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚀</span>
          <div>
            <p className="text-purple-900 font-semibold">Quiz System Coming Soon!</p>
            <p className="text-purple-700 text-sm">{poiData.content.message}</p>
          </div>
        </div>
      </div>
    </div>
  )
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
    <div className="space-y-4">
      {poiData.content.facts.map((fact, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:shadow-md transition-shadow"
        >
          <div className="text-3xl">{fact.split(' ')[0]}</div>
          <p className="text-gray-700 leading-relaxed text-sm flex-1 pt-2">
            {fact.split(' ').slice(1).join(' ')}
          </p>
        </div>
      ))}
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
