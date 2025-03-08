import { useState, useEffect } from 'react';

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function MatchingExercise({ title, pairs }) {
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [matches, setMatches] = useState({});
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const letters = pairs.map(pair => pair.letter);
    const words = pairs.map(pair => pair.word);
    setShuffledLetters(shuffle(letters));
    setShuffledWords(shuffle(words));
  }, [pairs]);

  const handleSelect = (item, isLetter) => {
    if (isLetter) {
      setSelectedLetter(item);
    } else if (selectedLetter) {
      const correctWord = pairs.find(pair => pair.letter === selectedLetter).word;
      setMatches({ ...matches, [selectedLetter]: item });
      setSelectedLetter(null);
      setShowFeedback(false); // Reset feedback on new match
    }
  };

  const checkAnswers = () => {
    const allCorrect = pairs.every(pair => matches[pair.letter] === pair.word);
    setFeedback(allCorrect ? 'Good job!' : 'Uh oh, try again :)');
    setShowFeedback(true);
  };

  return (
    <div className="exercise matching-exercise">
      <h3>{title}</h3>
      <div className="exercise-content">
        <div className="letters">
          {shuffledLetters.map(letter => (
            <button
              key={letter}
              className={`exercise-item ${matches[letter] ? (pairs.find(p => p.letter === letter).word === matches[letter] ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleSelect(letter, true)}
              disabled={matches[letter]}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="words">
          {shuffledWords.map(word => (
            <button
              key={word}
              className={`exercise-item ${Object.values(matches).includes(word) ? (pairs.find(p => p.word === word).letter === Object.keys(matches).find(k => matches[k] === word) ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleSelect(word, false)}
              disabled={Object.values(matches).includes(word)}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
      <button className="exercise-check" onClick={checkAnswers}>
        Check
      </button>
      {showFeedback && <p className="exercise-feedback">{feedback}</p>}
    </div>
  );
}

export default MatchingExercise;