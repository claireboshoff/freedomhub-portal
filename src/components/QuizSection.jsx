import React, { useState, useCallback } from 'react';

/* ---- Inline SVG Icons ---- */
const CheckCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green, #10b981)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--red, #ef4444)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #c5a55a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default function QuizSection({ lessonId, quizData, onQuizComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [openEndedText, setOpenEndedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [animating, setAnimating] = useState(false);

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return null;
  }

  const questions = quizData.questions;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const isGraded = quizData.type === 'graded';
  const passScore = quizData.passScore || 70;

  // Calculate total possible points
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 10), 0);

  function handleSelectOption(optionIndex) {
    if (answered) return;
    setSelectedAnswer(optionIndex);
  }

  function handleSubmitAnswer() {
    if (answered) return;
    if (currentQuestion.type === 'open-ended') {
      if (!openEndedText.trim()) return;
      const answerRecord = {
        questionId: currentQuestion.id,
        type: 'open-ended',
        answer: openEndedText.trim(),
        correct: true, // open-ended is always "accepted"
        points: currentQuestion.points || 10,
        earned: currentQuestion.points || 10,
      };
      setAnswers((prev) => [...prev, answerRecord]);
      setAnswered(true);
    } else {
      if (selectedAnswer === null) return;
      const isCorrect = selectedAnswer === currentQuestion.correct;
      const answerRecord = {
        questionId: currentQuestion.id,
        type: currentQuestion.type,
        answer: selectedAnswer,
        correct: isCorrect,
        points: currentQuestion.points || 10,
        earned: isCorrect ? (currentQuestion.points || 10) : 0,
      };
      setAnswers((prev) => [...prev, answerRecord]);
      setAnswered(true);
    }
  }

  function handleNextQuestion() {
    if (currentIndex < totalQuestions - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
        setOpenEndedText('');
        setAnimating(false);
      }, 300);
    } else {
      // Show results
      setShowResults(true);
      const totalEarned = [...answers].reduce((sum, a) => sum + a.earned, 0);
      const scorePercent = Math.round((totalEarned / totalPoints) * 100);
      const passed = !isGraded || scorePercent >= passScore;
      if (onQuizComplete) {
        onQuizComplete({
          score: scorePercent,
          passed,
          answers: [...answers],
        });
      }
    }
  }

  function handleRetry() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setAnswers([]);
    setOpenEndedText('');
    setShowResults(false);
    setAnimating(false);
  }

  // Results view
  if (showResults) {
    const totalEarned = answers.reduce((sum, a) => sum + a.earned, 0);
    const scorePercent = Math.round((totalEarned / totalPoints) * 100);
    const passed = !isGraded || scorePercent >= passScore;
    const correctCount = answers.filter((a) => a.correct).length;
    const isPerfect = scorePercent === 100;

    return (
      <div className="quiz-section">
        <style>{quizStyles}</style>
        <div className="quiz-results">
          <div className="quiz-results__header">
            <TrophyIcon />
            <h3 className="quiz-results__title">Quiz Complete</h3>
          </div>

          <div className={`quiz-results__score-ring ${passed ? 'quiz-results__score-ring--pass' : 'quiz-results__score-ring--fail'}`}>
            <span className="quiz-results__score-number">{scorePercent}%</span>
          </div>

          {isGraded && (
            <div className={`quiz-results__status ${passed ? 'quiz-results__status--pass' : 'quiz-results__status--fail'}`}>
              {passed ? 'Passed' : 'Not Passed'}
            </div>
          )}

          {isGraded && !passed && (
            <p className="quiz-results__requirement">
              You need {passScore}% to pass this quiz.
            </p>
          )}

          <div className="quiz-results__xp">
            {isPerfect ? '+20 XP for perfect score' : passed ? '+15 XP for passing' : 'Pass the quiz to earn XP'}
          </div>

          <div className="quiz-results__stats">
            <div className="quiz-results__stat">
              <span className="quiz-results__stat-value">{correctCount}</span>
              <span className="quiz-results__stat-label">Correct</span>
            </div>
            <div className="quiz-results__stat">
              <span className="quiz-results__stat-value">{totalQuestions - correctCount}</span>
              <span className="quiz-results__stat-label">Incorrect</span>
            </div>
            <div className="quiz-results__stat">
              <span className="quiz-results__stat-value">{totalEarned}/{totalPoints}</span>
              <span className="quiz-results__stat-label">Points</span>
            </div>
          </div>

          {/* Per-question breakdown */}
          <div className="quiz-results__breakdown">
            <h4 className="quiz-results__breakdown-title">Question Breakdown</h4>
            {answers.map((a, i) => (
              <div key={i} className={`quiz-results__breakdown-item ${a.correct ? 'quiz-results__breakdown-item--correct' : 'quiz-results__breakdown-item--incorrect'}`}>
                <span className="quiz-results__breakdown-num">Q{i + 1}</span>
                <span className="quiz-results__breakdown-text">{questions[i].question}</span>
                <span className="quiz-results__breakdown-icon">
                  {a.correct ? <CheckCircle /> : <XCircle />}
                </span>
              </div>
            ))}
          </div>

          {isGraded && !passed && (
            <button className="btn btn--primary quiz-results__retry" onClick={handleRetry}>
              Retry Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  // Question view
  const progressPercent = ((currentIndex) / totalQuestions) * 100;
  const isCorrect = answered && (currentQuestion.type === 'open-ended' || selectedAnswer === currentQuestion.correct);

  return (
    <div className="quiz-section">
      <style>{quizStyles}</style>

      {/* Header */}
      <div className="quiz-header">
        <h3 className="quiz-header__title">
          {isGraded ? 'Quiz' : 'Practice Quiz'}
        </h3>
        <span className="quiz-header__progress">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="quiz-progress">
        <div className="quiz-progress__bar" style={{ width: `${progressPercent}%` }} />
      </div>

      {isGraded && (
        <p className="quiz-pass-note">You need {passScore}% to pass</p>
      )}

      {/* Question card */}
      <div className={`quiz-question ${animating ? 'quiz-question--exit' : 'quiz-question--enter'}`}>
        <p className="quiz-question__text">{currentQuestion.question}</p>

        {/* Multiple choice */}
        {currentQuestion.type === 'multiple-choice' && (
          <div className="quiz-options">
            {currentQuestion.options.map((option, idx) => {
              let optionClass = 'quiz-option';
              if (answered) {
                if (idx === currentQuestion.correct) {
                  optionClass += ' quiz-option--correct';
                } else if (idx === selectedAnswer && idx !== currentQuestion.correct) {
                  optionClass += ' quiz-option--incorrect';
                }
              } else if (idx === selectedAnswer) {
                optionClass += ' quiz-option--selected';
              }
              return (
                <button
                  key={idx}
                  className={optionClass}
                  onClick={() => handleSelectOption(idx)}
                  disabled={answered}
                >
                  <span className="quiz-option__letter">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="quiz-option__text">{option}</span>
                  {answered && idx === currentQuestion.correct && (
                    <span className="quiz-option__icon"><CheckCircle /></span>
                  )}
                  {answered && idx === selectedAnswer && idx !== currentQuestion.correct && (
                    <span className="quiz-option__icon"><XCircle /></span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* True/False */}
        {currentQuestion.type === 'true-false' && (
          <div className="quiz-tf">
            {currentQuestion.options.map((option, idx) => {
              let tfClass = 'quiz-tf__btn';
              if (answered) {
                if (idx === currentQuestion.correct) {
                  tfClass += ' quiz-tf__btn--correct';
                } else if (idx === selectedAnswer && idx !== currentQuestion.correct) {
                  tfClass += ' quiz-tf__btn--incorrect';
                }
              } else if (idx === selectedAnswer) {
                tfClass += ' quiz-tf__btn--selected';
              }
              return (
                <button
                  key={idx}
                  className={tfClass}
                  onClick={() => handleSelectOption(idx)}
                  disabled={answered}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* Open-ended */}
        {currentQuestion.type === 'open-ended' && (
          <div className="quiz-open">
            <textarea
              className="quiz-open__textarea"
              placeholder="Type your answer here..."
              value={openEndedText}
              onChange={(e) => setOpenEndedText(e.target.value)}
              disabled={answered}
              rows={4}
            />
          </div>
        )}

        {/* Submit button (before answering) */}
        {!answered && (
          <button
            className="btn btn--primary quiz-submit-btn"
            onClick={handleSubmitAnswer}
            disabled={
              (currentQuestion.type === 'open-ended' && !openEndedText.trim()) ||
              (currentQuestion.type !== 'open-ended' && selectedAnswer === null)
            }
          >
            Submit Answer
          </button>
        )}

        {/* Feedback */}
        {answered && (
          <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--incorrect'}`}>
            <div className="quiz-feedback__header">
              {isCorrect ? <CheckCircle /> : <XCircle />}
              <span className="quiz-feedback__label">
                {currentQuestion.type === 'open-ended'
                  ? 'Answer Submitted'
                  : isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            {currentQuestion.explanation && (
              <p className="quiz-feedback__explanation">{currentQuestion.explanation}</p>
            )}
          </div>
        )}

        {/* Next button */}
        {answered && (
          <button className="btn btn--primary quiz-next-btn" onClick={handleNextQuestion}>
            {currentIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}

/* ---- Styles ---- */
const quizStyles = `
  .quiz-section {
    margin-top: 2rem;
    background: var(--white, #fff);
    border: 1px solid var(--gray-200, #e5e5e5);
    border-radius: var(--radius, 12px);
    padding: 1.5rem;
    box-shadow: var(--shadow, 0 2px 8px rgba(0,0,0,0.06));
  }

  .quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  .quiz-header__title {
    font-family: var(--font-heading, 'League Spartan', sans-serif);
    font-size: 1.25rem;
    color: var(--charcoal, #2d2d2d);
    margin: 0;
  }
  .quiz-header__progress {
    font-size: 0.85rem;
    color: var(--gray-500, #737373);
    font-weight: 500;
  }

  .quiz-progress {
    height: 6px;
    background: var(--gray-100, #f5f5f5);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  .quiz-progress__bar {
    height: 100%;
    background: var(--gold, #c5a55a);
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  .quiz-pass-note {
    font-size: 0.8rem;
    color: var(--gray-500, #737373);
    margin: 0 0 1rem 0;
    text-align: center;
    font-style: italic;
  }

  /* Question card transitions */
  .quiz-question--enter {
    animation: quizSlideIn 0.3s ease forwards;
  }
  .quiz-question--exit {
    animation: quizSlideOut 0.3s ease forwards;
  }
  @keyframes quizSlideIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes quizSlideOut {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(-20px); }
  }

  .quiz-question__text {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--charcoal, #2d2d2d);
    margin: 0 0 1.25rem 0;
    line-height: 1.5;
  }

  /* Multiple choice options */
  .quiz-options {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
  .quiz-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: var(--gray-100, #f5f5f5);
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    font-size: 0.95rem;
    color: var(--charcoal, #2d2d2d);
    width: 100%;
  }
  .quiz-option:hover:not(:disabled) {
    background: var(--cream, #faf9f6);
    border-color: var(--gray-300, #d4d4d4);
  }
  .quiz-option--selected {
    border-color: var(--gold, #c5a55a);
    background: rgba(197, 165, 90, 0.08);
  }
  .quiz-option--correct {
    border-color: var(--green, #10b981);
    background: rgba(16, 185, 129, 0.08);
  }
  .quiz-option--incorrect {
    border-color: var(--red, #ef4444);
    background: rgba(239, 68, 68, 0.06);
  }
  .quiz-option:disabled {
    cursor: default;
  }
  .quiz-option__letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--gray-200, #e5e5e5);
    font-weight: 700;
    font-size: 0.8rem;
    color: var(--gray-600, #525252);
    flex-shrink: 0;
  }
  .quiz-option--selected .quiz-option__letter {
    background: var(--gold, #c5a55a);
    color: var(--white, #fff);
  }
  .quiz-option--correct .quiz-option__letter {
    background: var(--green, #10b981);
    color: var(--white, #fff);
  }
  .quiz-option--incorrect .quiz-option__letter {
    background: var(--red, #ef4444);
    color: var(--white, #fff);
  }
  .quiz-option__text {
    flex: 1;
  }
  .quiz-option__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  /* True/False */
  .quiz-tf {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .quiz-tf__btn {
    padding: 1.25rem;
    font-size: 1.1rem;
    font-weight: 700;
    border: 2px solid var(--gray-200, #e5e5e5);
    border-radius: 10px;
    background: var(--gray-100, #f5f5f5);
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--charcoal, #2d2d2d);
  }
  .quiz-tf__btn:hover:not(:disabled) {
    border-color: var(--gold, #c5a55a);
    background: rgba(197, 165, 90, 0.06);
  }
  .quiz-tf__btn--selected {
    border-color: var(--gold, #c5a55a);
    background: rgba(197, 165, 90, 0.1);
  }
  .quiz-tf__btn--correct {
    border-color: var(--green, #10b981);
    background: rgba(16, 185, 129, 0.1);
  }
  .quiz-tf__btn--incorrect {
    border-color: var(--red, #ef4444);
    background: rgba(239, 68, 68, 0.08);
  }
  .quiz-tf__btn:disabled {
    cursor: default;
  }

  /* Open-ended */
  .quiz-open__textarea {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid var(--gray-200, #e5e5e5);
    border-radius: 8px;
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: 0.95rem;
    color: var(--charcoal, #2d2d2d);
    resize: vertical;
    min-height: 100px;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .quiz-open__textarea:focus {
    outline: none;
    border-color: var(--gold, #c5a55a);
  }
  .quiz-open__textarea:disabled {
    background: var(--gray-100, #f5f5f5);
  }

  /* Submit & Next buttons */
  .quiz-submit-btn,
  .quiz-next-btn {
    margin-top: 1.25rem;
    width: 100%;
  }
  .quiz-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Feedback */
  .quiz-feedback {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    animation: quizFadeIn 0.3s ease;
  }
  @keyframes quizFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .quiz-feedback--correct {
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }
  .quiz-feedback--incorrect {
    background: rgba(239, 68, 68, 0.06);
    border: 1px solid rgba(239, 68, 68, 0.15);
  }
  .quiz-feedback__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .quiz-feedback__label {
    font-weight: 700;
    font-size: 1rem;
    color: var(--charcoal, #2d2d2d);
  }
  .quiz-feedback__explanation {
    margin: 0;
    font-size: 0.9rem;
    color: var(--gray-600, #525252);
    line-height: 1.5;
  }

  /* ---- Results view ---- */
  .quiz-results {
    text-align: center;
  }
  .quiz-results__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .quiz-results__title {
    font-family: var(--font-heading, 'League Spartan', sans-serif);
    font-size: 1.5rem;
    color: var(--charcoal, #2d2d2d);
    margin: 0;
  }

  .quiz-results__score-ring {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    border: 6px solid;
  }
  .quiz-results__score-ring--pass {
    border-color: var(--green, #10b981);
    background: rgba(16, 185, 129, 0.06);
  }
  .quiz-results__score-ring--fail {
    border-color: var(--red, #ef4444);
    background: rgba(239, 68, 68, 0.04);
  }
  .quiz-results__score-number {
    font-size: 2rem;
    font-weight: 800;
    color: var(--charcoal, #2d2d2d);
  }

  .quiz-results__status {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .quiz-results__status--pass {
    color: var(--green, #10b981);
  }
  .quiz-results__status--fail {
    color: var(--red, #ef4444);
  }

  .quiz-results__requirement {
    font-size: 0.85rem;
    color: var(--gray-500, #737373);
    margin: 0 0 0.75rem;
  }

  .quiz-results__xp {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(197, 165, 90, 0.1);
    border: 1px solid rgba(197, 165, 90, 0.25);
    border-radius: 20px;
    color: var(--gold, #c5a55a);
    font-weight: 600;
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
  }

  .quiz-results__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .quiz-results__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  .quiz-results__stat-value {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--charcoal, #2d2d2d);
  }
  .quiz-results__stat-label {
    font-size: 0.75rem;
    color: var(--gray-500, #737373);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Breakdown */
  .quiz-results__breakdown {
    text-align: left;
    margin-top: 1rem;
  }
  .quiz-results__breakdown-title {
    font-family: var(--font-heading, 'League Spartan', sans-serif);
    font-size: 1rem;
    color: var(--charcoal, #2d2d2d);
    margin: 0 0 0.75rem;
  }
  .quiz-results__breakdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
    border-radius: 6px;
    margin-bottom: 0.375rem;
    font-size: 0.85rem;
  }
  .quiz-results__breakdown-item--correct {
    background: rgba(16, 185, 129, 0.06);
  }
  .quiz-results__breakdown-item--incorrect {
    background: rgba(239, 68, 68, 0.05);
  }
  .quiz-results__breakdown-num {
    font-weight: 700;
    color: var(--gray-500, #737373);
    min-width: 28px;
  }
  .quiz-results__breakdown-text {
    flex: 1;
    color: var(--charcoal, #2d2d2d);
    line-height: 1.4;
  }
  .quiz-results__breakdown-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .quiz-results__retry {
    margin-top: 1.5rem;
    width: 100%;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .quiz-section {
      padding: 1rem;
    }
    .quiz-tf {
      grid-template-columns: 1fr;
    }
    .quiz-results__stats {
      gap: 0.5rem;
    }
    .quiz-results__score-ring {
      width: 100px;
      height: 100px;
    }
    .quiz-results__score-number {
      font-size: 1.5rem;
    }
  }
`;
