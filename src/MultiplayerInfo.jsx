export default function MultiplayerInfo({ onClose, myPeerId, isConnected, remotePlayers }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 text-white relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-bold"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold mb-2">🌐 Multijoueur</h2>
          <p className="text-purple-200">Jouez avec vos amis en temps réel !</p>
        </div>

        {/* Connection Status */}
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Statut de connexion :</span>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span>{isConnected ? 'Connecté' : 'Déconnecté'}</span>
            </div>
          </div>
          {myPeerId && (
            <div className="flex items-center justify-between">
              <span className="font-semibold">Votre ID :</span>
              <code className="bg-black/30 px-3 py-1 rounded text-yellow-300 font-mono">{myPeerId}</code>
            </div>
          )}
          {remotePlayers && remotePlayers.size > 0 && (
            <div className="mt-2 flex items-center justify-between">
              <span className="font-semibold">Joueurs connectés :</span>
              <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded font-bold">{remotePlayers.size}</span>
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="space-y-4 mb-6">
          <h3 className="text-2xl font-bold text-purple-200">📖 Comment ça marche ?</h3>

          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">1️⃣ Créer une partie</h4>
              <p className="text-gray-300 text-sm">
                Cliquez sur le bouton <strong>"🌐 Multiplayer"</strong> en bas à gauche de l'écran,
                puis sélectionnez <strong>"Create Room"</strong>. Votre ID de session sera généré automatiquement.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">2️⃣ Inviter des amis</h4>
              <p className="text-gray-300 text-sm">
                Partagez votre <strong>ID de session</strong> (affiché en haut du menu multijoueur) avec vos amis.
                Ils pourront rejoindre en entrant cet ID dans le champ <strong>"Join Room"</strong>.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">3️⃣ Rejoindre une partie</h4>
              <p className="text-gray-300 text-sm">
                Pour rejoindre une partie existante, entrez l'<strong>ID de session</strong> que votre ami vous a partagé,
                puis cliquez sur <strong>"Join"</strong>. Vous apparaîtrez dans son monde !
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">4️⃣ Jouer ensemble</h4>
              <p className="text-gray-300 text-sm">
                Une fois connectés, vous verrez les <strong>camions des autres joueurs</strong> se déplacer en temps réel
                sur le campus. Explorez ensemble, montrez-vous les POIs, et partagez l'aventure de la Confrérie du Manchot ! 🐧
              </p>
            </div>
          </div>
        </div>

        {/* Technical info */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-400/30">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <span>🔧</span>
            <span>Technologie</span>
          </h4>
          <p className="text-sm text-gray-300">
            Le mode multijoueur utilise <strong>PeerJS</strong> pour établir des connexions peer-to-peer (P2P) entre les joueurs.
            Les positions sont synchronisées en temps réel via WebRTC pour une expérience fluide et sans serveur central.
          </p>
        </div>

        {/* Close button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 shadow-lg"
          >
            Compris !
          </button>
        </div>
      </div>
    </div>
  );
}
