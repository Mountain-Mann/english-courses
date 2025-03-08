import PropTypes from 'prop-types';

function WordsGrid({ words }) {
  const playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play().catch(err => console.log('Audio error:', err));
  };

  return (
    <div className="words-grid">
      {words.map((word, index) => (
        <div key={index} className="word-item">
          <img src={word.image} alt={word.word} />
          <div className="audio-controls">
            <button
              className="audio-play"
              onClick={() => playAudio(word.word_audio)}
            >
              ▶️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

WordsGrid.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      word_audio: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default WordsGrid;