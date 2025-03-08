import { useState, useEffect } from 'react';

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function DragDropExercise({ title, items }) {
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [dragged, setDragged] = useState(null);
  const [matches, setMatches] = useState({});
  const [attempted, setAttempted] = useState({});
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const letters = items.map(item => item.letter);
    const words = items.map(item => item.word);
    setShuffledLetters(shuffle(letters));
    setShuffledWords(shuffle(words));
  }, [items]);

  const handleDragStart = (letter) => setDragged(letter);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (word) => {
    if (dragged) {
      const correctLetter = items.find(item => item.word === word).letter;
      const isCorrect = dragged === correctLetter;
      if (isCorrect) {
        setMatches({ ...matches, [dragged]: word });
      } else {
        setAttempted({ ...attempted, [word]: { letter: dragged, isCorrect: false } });
        setTimeout(() => {
          setAttempted(prev => {
            const newAttempted = { ...prev };
            delete newAttempted[word];
            return newAttempted;
          });
        }, 1000);
      }
      setDragged(null);
      setShowFeedback(false); // Reset feedback on new drop
    }
  };

  const checkAnswers = () => {
    const allCorrect = items.every(item => matches[item.letter] === item.word);
    setFeedback(allCorrect && Object.keys(matches).length === items.length ? 'Good job!' : 'Uh oh, try again :)');
    setShowFeedback(true);
  };

  return (
    <div className="exercise drag-drop-exercise">
      <h3>{title}</h3>
      <div className="exercise-content">
        <div className="letters">
          {shuffledLetters.map(letter => (
            <div
              key={letter}
              className={`exercise-item ${matches[letter] ? 'correct' : ''}`}
              draggable={!matches[letter]}
              onDragStart={() => handleDragStart(letter)}
            >
              {letter.toUpperCase()}
            </div>
          ))}
        </div>
        <div className="words">
          {shuffledWords.map(word => {
            const attemptedMatch = attempted[word];
            const matchedLetter = shuffledLetters.find(l => matches[l] === word);
            return (
              <div
                key={word}
                className={`exercise-dropzone ${matchedLetter ? 'correct' : attemptedMatch ? 'incorrect' : ''}`}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(word)}
              >
                {matchedLetter
                  ? `${matchedLetter.toUpperCase()}${word.slice(1)}`
                  : `___${word.slice(1)}`}
              </div>
            );
          })}
        </div>
      </div>
      <button className="exercise-check" onClick={checkAnswers}>
        Check
      </button>
      {showFeedback && <p className="exercise-feedback">{feedback}</p>}
    </div>
  );
}

export default DragDropExercise;