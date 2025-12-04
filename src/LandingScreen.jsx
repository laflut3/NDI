export default function LandingScreen({ onStart }) {
  return (
    <div className="absolute inset-0 z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-72 h-72 bg-pink-500/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-white mb-4 animate-fadeInUp">
            Digital Independence
          </h1>
          <div className="flex items-center justify-center gap-3 text-2xl text-blue-300 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <span>🚚</span>
            <p className="font-light">Repair Truck Mission</p>
            <span>🔧</span>
          </div>
        </div>

        {/* Mission Brief */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            <h2 className="text-3xl font-bold text-white">Your Mission</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          </div>

          <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
            Drive your repair truck across the campus and discover the power of digital freedom.
            Complete quizzes, chat with our digital assistant, and learn fascinating tech facts
            about <span className="text-yellow-300 font-semibold">open source</span>,
            <span className="text-green-300 font-semibold"> sustainability</span>, and
            <span className="text-pink-300 font-semibold"> privacy</span>.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-white mb-2">Quiz Stations</h3>
              <p className="text-white/70 text-sm">Test your tech knowledge at 4 interactive quiz points</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI Assistant</h3>
              <p className="text-white/70 text-sm">Chat with our guide about digital independence</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-white mb-2">Fun Facts</h3>
              <p className="text-white/70 text-sm">Discover amazing tech trivia and statistics</p>
            </div>
          </div>

          {/* Controls Preview */}
          <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Controls</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg">
                <kbd className="bg-white/20 px-3 py-1 rounded font-mono">WASD</kbd>
                <span className="text-white/80">or</span>
                <kbd className="bg-white/20 px-3 py-1 rounded font-mono">↑←↓→</kbd>
                <span className="text-white">Drive</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg">
                <kbd className="bg-yellow-500/40 px-3 py-1 rounded font-mono font-bold">SHIFT</kbd>
                <span className="text-yellow-300 font-semibold">⚡ Turbo Boost</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg">
                <kbd className="bg-white/20 px-3 py-1 rounded font-mono">ESC</kbd>
                <span className="text-white">Close Modals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="group relative px-12 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 animate-fadeInUp overflow-hidden"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10 flex items-center gap-3">
            Start Your Journey
            <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        {/* Footer tagline */}
        <p className="mt-8 text-white/60 text-sm animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          A journey towards technology freedom and sustainability
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
