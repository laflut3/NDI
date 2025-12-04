import { useState, useEffect } from 'react'

export default function Quiz({ quizData, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  // Auto-trigger onComplete when results are shown
  useEffect(() => {
    if (showResult && onComplete) {
      const percentage = Math.round((score / quizData.questions.length) * 100)
      const xpEarned = score * 25
      onComplete(score, percentage, xpEarned)
    }
  }, [showResult, score, quizData.questions.length, onComplete])

  const question = quizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return // Already answered

    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === question.correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    }

    setAnsweredQuestions([...answeredQuestions, {
      question: question.question,
      selected: answerIndex,
      correct: question.correctAnswer,
      isCorrect
    }])

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  if (showResult) {
    const percentage = Math.round((score / quizData.questions.length) * 100)
    const xpEarned = score * 25 // 25 XP per correct answer

    return (
      <div className="space-y-6">
        {/* Results Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 p-8 rounded-2xl text-white">
          <div className="absolute top-0 right-0 text-9xl opacity-10">🎉</div>
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '💪'}
            </div>
            <h2 className="text-3xl font-bold mb-2">Quiz Terminé!</h2>
            <p className="text-white/90">
              {percentage >= 80 ? 'Excellent travail!' : percentage >= 60 ? 'Bon travail!' : 'Continue à apprendre!'}
            </p>
          </div>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 text-center">
            <div className="text-4xl font-bold text-blue-600">{score}/{quizData.questions.length}</div>
            <div className="text-sm text-gray-600 mt-2">Questions Correctes</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 text-center">
            <div className="text-4xl font-bold text-purple-600">{percentage}%</div>
            <div className="text-sm text-gray-600 mt-2">Score</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 text-center">
            <div className="text-4xl font-bold text-green-600">+{xpEarned}</div>
            <div className="text-sm text-gray-600 mt-2">XP Gagnés</div>
          </div>
        </div>

        {/* Review Answers */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-800">Révision des Réponses</h3>
          {answeredQuestions.map((ans, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border-2 ${
                ans.isCorrect
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{ans.isCorrect ? '✅' : '❌'}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm mb-1">
                    Question {idx + 1}: {ans.question}
                  </p>
                  {!ans.isCorrect && (
                    <p className="text-xs text-gray-600">
                      Réponse correcte: {quizData.questions[idx].answers[ans.correct]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold">{quizData.title}</h3>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
            {currentQuestion + 1}/{quizData.questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border-2 border-gray-200 shadow-lg">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
            {currentQuestion + 1}
          </div>
          <p className="text-xl font-semibold text-gray-800 leading-relaxed pt-2">
            {question.question}
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.answers.map((answer, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === question.correctAnswer
            const showFeedback = selectedAnswer !== null

            let bgClass = 'bg-white hover:bg-gray-50 border-gray-300'
            let textClass = 'text-gray-800'

            if (showFeedback) {
              if (isSelected && isCorrect) {
                bgClass = 'bg-green-100 border-green-500'
                textClass = 'text-green-800'
              } else if (isSelected && !isCorrect) {
                bgClass = 'bg-red-100 border-red-500'
                textClass = 'text-red-800'
              } else if (isCorrect) {
                bgClass = 'bg-green-50 border-green-400'
                textClass = 'text-green-700'
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgClass} ${
                  selectedAnswer === null ? 'hover:scale-[1.02] hover:shadow-md cursor-pointer' : 'cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                    showFeedback && isCorrect ? 'bg-green-500 border-green-500 text-white' :
                    showFeedback && isSelected && !isCorrect ? 'bg-red-500 border-red-500 text-white' :
                    'border-gray-400 text-gray-600'
                  }`}>
                    {showFeedback && isCorrect ? '✓' :
                     showFeedback && isSelected && !isCorrect ? '✗' :
                     String.fromCharCode(65 + index)}
                  </div>
                  <span className={`flex-1 ${textClass} font-medium`}>{answer}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation (shown after answer) */}
        {selectedAnswer !== null && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-semibold text-blue-900 mb-1">Explication</p>
                <p className="text-blue-800 text-sm">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Score Display */}
      <div className="flex justify-between items-center px-4">
        <div className="text-sm text-gray-600">
          Score actuel: <span className="font-bold text-purple-600">{score}</span>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-bold text-green-600">+25 XP</span> par bonne réponse
        </div>
      </div>
    </div>
  )
}
