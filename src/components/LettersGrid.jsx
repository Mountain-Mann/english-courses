import PropTypes from 'prop-types';

function LettersGrid({ letters }) {
  const playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play().catch(err => console.log('Audio error:', err));
  };

  return (
    <div className="letters-grid">
      {letters.map((letter, index) => (
        <div key={index} className="letter-item">
          <img src={letter.image} alt={`${letter.letter}`} />
          <div className="audio-controls">
            {letter.name && (
              <div className="audio-row">
                <span className="audio-label">Name:</span>
                <button
                  className="audio-play"
                  onClick={() => playAudio(letter.name)}
                >
                  ▶️
                </button>
              </div>
            )}
            {letter.sound && (
              <div className="audio-row">
                <span className="audio-label">Sound:</span>
                <button
                  className="audio-play"
                  onClick={() => playAudio(letter.sound)}
                >
                  ▶️
                </button>
              </div>
            )}
            {letter.sound_short && (
              <div className="audio-row">
                <span className="audio-label">Short:</span>
                <button
                  className="audio-play"
                  onClick={() => playAudio(letter.sound_short)}
                >
                  ▶️
                </button>
              </div>
            )}
            {letter.sound_long && (
              <div className="audio-row">
                <span className="audio-label">Long:</span>
                <button
                  className="audio-play"
                  onClick={() => playAudio(letter.sound_long)}
                >
                  ▶️
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

LettersGrid.propTypes = {
  letters: PropTypes.array.isRequired,
};

export default LettersGrid;