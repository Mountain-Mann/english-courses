import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Quiz({ questions }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const shuffled = shuffle(questions).map(q => ({
      ...q,
      options: shuffle([...q.options]),
    }));
    setShuffledQuestions(shuffled);
  }, [questions]);

  const playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play().catch(err => console.log('Audio error:', err));
  };

  const handleSelect = (id, option) => {
    const originalQuestion = questions.find(q => q.audio ? q.audio === id : q.prompt === id);
    const isCorrect = option === originalQuestion.correct;
    setAnswers({ ...answers, [id]: option });
    setFeedback({ ...feedback, [id]: isCorrect });
    setShowResult(false);
  };

  const checkAnswers = () => {
    const allCorrect = shuffledQuestions.every(q => answers[q.audio || q.prompt] === q.correct);
    setResult(allCorrect && Object.keys(answers).length === questions.length ? 'Good job!' : 'Try again :)');
    setShowResult(true);
  };

  return (
    <div className="quiz">
      <h3>Quiz Time!</h3>
      <div className="quiz-grid">
        {shuffledQuestions.map((q, index) => (
          <div key={index} className="quiz-question">
            <p>
              {q.prompt}
              {q.audio && (
                <button className="quiz-play" onClick={() => playAudio(q.audio)}>
                  ▶️
                </button>
              )}
            </p>
            <div className="quiz-options">
              {q.options.map(option => (
                <button
                  key={option}
                  className={`quiz-option ${answers[q.audio || q.prompt] === option ? (feedback[q.audio || q.prompt] ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleSelect(q.audio || q.prompt, option)}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* <button className="quiz-check" onClick={checkAnswers}>
        Check Answers
      </button> */}
      {showResult && <p className="quiz-feedback">{result}</p>}
    </div>
  );
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      audio: PropTypes.string,
      prompt: PropTypes.string.isRequired,
      correct: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default Quiz;