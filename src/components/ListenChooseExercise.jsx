import { useState, useEffect } from 'react';

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ListenChooseExercise({ title, questions }) {
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

  const handleSelect = (audio, option) => {
    const originalQuestion = questions.find(q => q.audio === audio);
    const isCorrect = option === originalQuestion.correct;
    setAnswers({ ...answers, [audio]: option });
    setFeedback({ ...feedback, [audio]: isCorrect });
    setShowResult(false);
  };

  const checkAnswers = () => {
    const allCorrect = shuffledQuestions.every(q => answers[q.audio] === q.correct);
    setResult(allCorrect && Object.keys(answers).length === questions.length ? 'Good job!' : 'Uh oh, try again :)');
    setShowResult(true);
  };

  return (
    <div className="exercise listen-choose-exercise">
      <h3>{title}</h3>
      <div className="listen-choose-grid">
        {shuffledQuestions.map((q, index) => (
          <div key={index} className="exercise-question">
            <p>
              Listen and choose:
              <button className="exercise-play" onClick={() => playAudio(q.audio)}>
                ▶️
              </button>
            </p>
            <div className="exercise-options">
              {q.options.map(option => (
                <button
                  key={option}
                  className={`exercise-option ${answers[q.audio] === option ? (feedback[q.audio] ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleSelect(q.audio, option)}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="exercise-check" onClick={checkAnswers}>
        Check
      </button>
      {showResult && <p className="exercise-feedback">{result}</p>}
    </div>
  );
}

export default ListenChooseExercise;