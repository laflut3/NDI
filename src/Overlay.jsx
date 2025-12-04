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
            <p className="text-white/90 text-sm">Mission Point Discovered</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-4">
            {poiData.content.points.map((point, index) => (
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
