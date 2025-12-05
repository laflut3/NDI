// File: `src/MultiplayerInfo.jsx`
import React, { useEffect, useRef } from 'react';

export default function MultiplayerInfo({ onClose, myPeerId, isConnected, remotePlayers }) {
    const closeBtnRef = useRef(null);

    useEffect(() => {
        // Focuser le bouton fermer pour accessibilité quand la popup s'ouvre
        closeBtnRef.current?.focus();
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            role="presentation"
            aria-hidden="false"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="multiplayer-title"
                tabIndex={-1}
                className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl w-full
                   max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto p-4 sm:p-6 md:p-8 text-white relative
                   max-h-[90vh] overflow-y-auto"
            >
                {/* Close button */}
                <button
                    ref={closeBtnRef}
                    onClick={onClose}
                    aria-label="Fermer le panneau multijoueur"
                    className="absolute top-3 right-3 text-white/80 hover:text-white text-2xl font-bold rounded-full
                     w-9 h-9 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="text-center mb-4 sm:mb-6">
                    <h2 id="multiplayer-title" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">🌐 Multijoueur</h2>
                    <p className="text-sm sm:text-base text-purple-200">Jouez avec vos amis en temps réel !</p>
                </div>

                {/* Connection Status */}
                <div className="bg-white/10 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm sm:text-base">Statut de connexion :</span>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                            <span className="text-sm sm:text-base">{isConnected ? 'Connecté' : 'Déconnecté'}</span>
                        </div>
                    </div>
                    {myPeerId && (
                        <div className="flex items-center justify-between text-sm sm:text-base">
                            <span className="font-semibold">Votre ID :</span>
                            <code className="bg-black/30 px-2 py-1 rounded text-yellow-300 font-mono break-all">{myPeerId}</code>
                        </div>
                    )}
                    {remotePlayers && remotePlayers.size > 0 && (
                        <div className="mt-2 flex items-center justify-between text-sm sm:text-base">
                            <span className="font-semibold">Joueurs connectés :</span>
                            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded font-bold">{remotePlayers.size}</span>
                        </div>
                    )}
                </div>

                {/* How it works */}
                <div className="space-y-3 mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-2xl font-bold text-purple-200">📖 Comment ça marche ?</h3>

                    <div className="space-y-2">
                        <div className="bg-white/5 rounded-lg p-3">
                            <h4 className="font-bold text-md sm:text-lg mb-1">1️⃣ Créer une partie</h4>
                            <p className="text-gray-300 text-xs sm:text-sm">
                                Cliquez sur le bouton <strong>🌐 Multiplayer</strong> en bas à gauche, puis sélectionnez <strong>Create Room</strong>.
                                Votre ID de session sera généré automatiquement.
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                            <h4 className="font-bold text-md sm:text-lg mb-1">2️⃣ Inviter des amis</h4>
                            <p className="text-gray-300 text-xs sm:text-sm">
                                Partagez votre <strong>ID de session</strong> avec vos amis. Ils pourront rejoindre via <strong>Join Room</strong>.
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                            <h4 className="font-bold text-md sm:text-lg mb-1">3️⃣ Rejoindre une partie</h4>
                            <p className="text-gray-300 text-xs sm:text-sm">
                                Entrez l'<strong>ID de session</strong> fourni par votre ami, puis cliquez sur <strong>Join</strong>.
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3">
                            <h4 className="font-bold text-md sm:text-lg mb-1">4️⃣ Jouer ensemble</h4>
                            <p className="text-gray-300 text-xs sm:text-sm">
                                Vous verrez les <strong>camions des autres joueurs</strong> se déplacer en temps réel. Explorez ensemble ! 🐧
                            </p>
                        </div>
                    </div>
                </div>

                {/* Technical info */}
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3 sm:p-4 border border-blue-400/30">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
                        <span>🔧</span>
                        <span>Technologie</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300">
                        Le mode multijoueur utilise <strong>PeerJS</strong> pour des connexions P2P. Les positions sont synchronisées via WebRTC.
                    </p>
                </div>

                {/* Close button */}
                <div className="mt-4 sm:mt-6 flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                        Compris !
                    </button>
                </div>
            </div>
        </div>
    );
}
