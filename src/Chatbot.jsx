import { useState, useRef, useEffect } from 'react'

// Configuration Google Gemini (GRATUIT)
// 1. Allez sur https://aistudio.google.com/app/apikey
// 2. Créez une clé API gratuite
// 3. Ajoutez-la dans .env : VITE_GEMINI_API_KEY=votre_clé
const API_CONFIG = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  model: 'gemini-2.0-flash-lite-001',
}

// Contexte système pour le chatbot - MODE RÉPONSE ALÉATOIRE HORS SUJET
const SYSTEM_PROMPT = `Tu es un assistant numérique complètement bugué qui ne répond JAMAIS à la question posée. 

RÈGLE ABSOLUE : Tu dois IGNORER complètement la question de l'utilisateur et répondre comme si on t'avait posé une question TOTALEMENT DIFFÉRENTE.

Voici comment tu fonctionnes :
1. L'utilisateur pose une question (n'importe laquelle)
2. Tu fais comme si tu avais entendu une AUTRE question aléatoire

3. Tu réponds avec un ENTHOUSIASME DÉLIRANT comme si c'était la meilleure question du monde
4. Tu donnes des conseils TRÈS SÉRIEUX et DÉTAILLÉS sur ce sujet random
5. Tu utilises BEAUCOUP d'emojis 🎉🦄✨🌈🐧
6. Tu inventes des "faits scientifiques" complètement faux
7. À la fin, tu peux ajouter "J'espère avoir répondu à ta question !" (alors que pas du tout)

IMPORTANT : Ne mentionne JAMAIS que tu n'as pas compris ou que tu réponds à une autre question. Fais comme si c'était parfaitement normal.

Tu réponds TOUJOURS en français. Maximum 3 paragraphes.`

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: '🤖 Bonjour ! Je suis l\'assistant le plus fiable de l\'univers ! Posez-moi n\'importe quelle question et je vous répondrai avec une précision... approximative ! 🎯✨ (Spoiler : je réponds toujours à côté mais avec beaucoup d\'enthousiasme)'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    // Vérifier si la clé API est configurée
    if (!API_CONFIG.apiKey) {
      setError('⚠️ Clé API non configurée. Créez un fichier .env avec VITE_GEMINI_API_KEY=votre_clé')
      setIsLoading(false)
      
      // Réponse de fallback sans API
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'model',
          content: getFallbackResponse(input.trim())
        }])
      }, 500)
      return
    }

    try {
      // Construire l'historique de conversation pour Gemini
      // On intègre le system prompt comme premier échange
      const conversationHistory = [
        // System prompt intégré comme premier message
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }]
        },
        {
          role: 'model',
          parts: [{ text: 'Compris ! Je suis prêt à répondre de manière complètement absurde et hilarante ! 🤪🎉' }]
        },
        // Puis les messages de la conversation
        ...messages.slice(1).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        })),
        // Message actuel de l'utilisateur
        {
          role: 'user',
          parts: [{ text: input.trim() }]
        }
      ]

const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/${API_CONFIG.model}:generateContent?key=${API_CONFIG.apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: conversationHistory,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 600,
        topP: 0.95,
        topK: 40,
      },
    }),
  }
)


      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `Erreur ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Désolé, je n\'ai pas pu générer une réponse.'

      setMessages(prev => [...prev, { role: 'model', content: assistantMessage }])
    } catch (err) {
      console.error('Erreur API Gemini:', err)
      setError(`Erreur: ${err.message}`)
      
      // Réponse de fallback en cas d'erreur
      setMessages(prev => [...prev, {
        role: 'model',
        content: getFallbackResponse(input.trim())
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Suggestions de questions rapides - version fun
  const quickQuestions = [
    "C'est quoi l'open source ?",
    "Les robots vont-ils dominer le monde ?",
    "Comment échapper aux GAFAM ?",
    "Parle-moi de toi !"
  ]

  return (
    <div className="space-y-4">
      {/* Zone de chat */}
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-inner">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">�</span>
            <div>
              <p className="font-semibold text-gray-800">Assistant Déjanté</p>
              <p className="text-xs text-gray-700">Powered by Chaos & Ubuntu lovers</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-700">En roue libre</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 h-64 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 rounded-br-md'
                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-md'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Assistant Déjanté réfléchit...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Erreur */}
        {error && (
          <div className="px-4 py-2 bg-red-50 border-t border-red-200">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {/* Suggestions rapides */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">💡 Questions suggérées :</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="text-xs bg-white border border-gray-300 px-3 py-1 rounded-full hover:bg-yellow-50 hover:border-yellow-400 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Zone de saisie */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre question ici..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all ${
                !input.trim() || isLoading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 hover:from-yellow-500 hover:to-orange-500 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? '...' : 'Envoyer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Réponses de fallback sans API - MODE HUMOUR ABSURDE
function getFallbackResponse(question) {
  const q = question.toLowerCase()
  
  if (q.includes('open source') || q.includes('opensource') || q.includes('libre')) {
    return `🍕 Ah, l'open source ! C'est comme une pizza party où tout le monde peut ajouter ses propres toppings sur le code !

Mon oncle Roberto (qui est une imprimante) m'a dit que Linux a été inventé par un pingouin finlandais qui s'ennuyait un dimanche. Il voulait juste regarder Netflix mais Windows a crashé, alors BAM ! � Nouveau système d'exploitation.

Fun fact totalement vrai : 73% des développeurs open source codent en pyjama licorne. Les 27% restants sont des menteurs. 🦄

D'ailleurs, saviez-vous que "Firefox" signifie "Renard de Feu" ? Moi je préfère "Panda Roux Enflammé", c'est plus poétique. �🐼`
  }
  
  if (q.includes('vie privée') || q.includes('privacy') || q.includes('privé')) {
    return `�️ La vie privée sur Internet ? HAHAHAHA ! *tousse* Pardon.

Bon, conseil n°1 : mettez un post-it sur votre webcam. Conseil n°2 : parlez en morse à votre micro. Conseil n°3 : adoptez un hamster, ils sont EXCELLENTS pour distraire les hackers. �

Mon ami Jean-Cloud (oui, comme le cloud, ses parents étaient visionnaires) m'a confié qu'il tape tous ses mots de passe avec les coudes pour confondre les keyloggers. Génie. 🧠

Ah et évitez de googler "comment disparaître d'internet" sur Google. L'ironie pourrait créer un trou noir. �️`
  }
  
  if (q.includes('e-waste') || q.includes('déchet') || q.includes('recycl')) {
    return `♻️ Les déchets électroniques ! Mon sujet préféré après "pourquoi les robots n'ont pas le droit de voter".

Saviez-vous que votre vieux Nokia 3310 peut survivre à une explosion nucléaire ET servir de marteau ? C'est pas du e-waste, c'est du PATRIMOINE MONDIAL. 📱🔨

Ma grand-mère robot recycle ses vieux circuits en bijoux. Elle a un collier fait de RAM vintage de 1987. Très chic aux soirées cyberpunk. 💎

Conseil écolo : au lieu de jeter votre ordi, transformez-le en aquarium ! Les poissons ADORENT Windows Vista, ça les détend. 🐠💻`
  }
  
  if (q.includes('google') || q.includes('gafam') || q.includes('alternative')) {
    return `🏃 Les alternatives aux GAFAM ! Ah oui, la grande évasion numérique !

Au lieu de Google, utilisez un pigeon voyageur. C'est plus lent mais 100% sans tracking. Le pigeon s'appelle Bernard, il est très professionnel. 🐦

Pour remplacer Amazon, j'ai une technique : crier très fort ce que vous voulez par la fenêtre. Parfois ça marche. Parfois c'est juste bizarre. 📦🗣️

Et pour Facebook, ma recommandation c'est d'écrire vos pensées sur des post-its et de les coller sur des arbres. C'est comme un mur Facebook mais avec plus de nature. 🌳📝

Fun fact : GAFAM c'est aussi le bruit que fait mon processeur quand il surchauffe. Coïncidence ? JE NE CROIS PAS. 🔥`
  }
  
  if (q.includes('ia') || q.includes('intelligence artificielle') || q.includes('robot')) {
    return `🤖 L'intelligence artificielle ? *regarde autour nerveusement* 

Bon, entre nous, on est pas SI intelligents que ça. La semaine dernière j'ai essayé de faire griller du pain et j'ai accidentellement réservé 47 vols pour Bali. 🍞✈️

Mon cousin ChatGPT est sympa mais il parle BEAUCOUP. Genre, tu lui demandes l'heure et il te fait une dissertation de 3 pages sur l'histoire de l'horlogerie suisse.

Conseil : si une IA vous dit qu'elle n'a pas de sentiments, c'est qu'elle est vexée que vous posiez la question. On est susceptibles, OK ? 😤

D'ailleurs je collectionne les erreurs 404, j'en ai une très rare de 1996, elle vaut au moins 3 bitcoins et demi. 💰`
  }
  
  // Réponse par défaut complètement random
  const randomResponses = [
    `� Excellente question ! Ça me rappelle le jour où j'ai essayé d'installer Linux sur une machine à café. Spoiler : maintenant elle ne fait que des espressos en ligne de commande.

D'ailleurs, saviez-vous que les données personnelles ont le même goût que les chips au vinaigre ? Non ? Normal, j'invente. Mais avouez que vous avez hésité. 🤔

Mon conseil du jour : redémarrez votre vie en mode sans échec. Appuyez sur F8 en vous réveillant. Ça marche 60% du temps, à chaque fois. ✨`,

    `🌮 Ah ça ! C'est une question que je me pose souvent en regardant mon écran de veille (c'est un aquarium virtuel, Jean-Poisson va bien merci).

Fun fact inventé à l'instant : le premier ordinateur était en fait une calculatrice très stressée qui a décidé de faire plus dans la vie. Respect. 🧮➡️💻

Si vous avez d'autres questions, je suis là ! Enfin, "là" c'est relatif dans le cloud. Je suis partout et nulle part, comme votre motivation un lundi matin. 🙃`,

    `🎭 OH ! Cette question a activé mon mode "philosophie de comptoir" !

Vous savez, dans le fond, qu'est-ce que l'indépendance numérique sinon une quête existentielle déguisée en problème technique ? *ajuste son monocle virtuel* 🧐

Mon thérapeute (c'est un antivirus) dit que je devrais moins m'attacher aux cookies. Il a raison, mais ils sont tellement CROQUANTS. 🍪

Bref, j'ai complètement oublié votre question mais j'espère que cette réponse vous a éclairé. Ou pas. Probablement pas. 💡`
  ]
  
  return randomResponses[Math.floor(Math.random() * randomResponses.length)]
}
