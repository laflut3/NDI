export default function Overlay({ poiData, onClose, onContinue }) {
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

      <style jsx>{`
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
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {poiData.content.description}
        </p>
        <div className="flex items-center gap-3 text-blue-600 bg-blue-50 p-4 rounded-lg">
          <span className="text-2xl">ℹ️</span>
          <p className="text-sm">{poiData.content.message}</p>
        </div>
      </div>

      {/* Placeholder for quiz UI */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-400 border-2 border-dashed border-gray-300">
          <span className="text-xl">📚</span>
          <p className="text-xs mt-2">Quiz Question</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-400 border-2 border-dashed border-gray-300">
          <span className="text-xl">✅</span>
          <p className="text-xs mt-2">Answer Options</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-400 border-2 border-dashed border-gray-300">
          <span className="text-xl">🏆</span>
          <p className="text-xs mt-2">Score Tracking</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-400 border-2 border-dashed border-gray-300">
          <span className="text-xl">⏱️</span>
          <p className="text-xs mt-2">Timer</p>
        </div>
      </div>
    </div>
  )
}

// Chatbot POI Content
function ChatbotContent({ poiData }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200">
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {poiData.content.description}
        </p>
        <div className="flex items-center gap-3 text-orange-600 bg-orange-50 p-4 rounded-lg">
          <span className="text-2xl">🤖</span>
          <p className="text-sm">{poiData.content.message}</p>
        </div>
      </div>

      {/* Placeholder for chatbot UI */}
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <p className="text-sm font-semibold text-gray-600">Chat Interface Preview</p>
        </div>
        <div className="p-4 space-y-3 h-48 overflow-y-auto bg-gray-50">
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs border border-gray-200">
              <p className="text-sm text-gray-700">Hello! Ask me anything about digital independence!</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-yellow-100 p-3 rounded-lg shadow-sm max-w-xs border border-yellow-200">
              <p className="text-sm text-gray-700">Coming soon...</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your question here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled
            />
            <button className="px-6 py-2 bg-yellow-400 text-gray-800 rounded-lg font-semibold text-sm hover:bg-yellow-500 transition-colors" disabled>
              Send
            </button>
          </div>
        </div>
      </div>
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
