import { useState, useEffect } from 'react';

function Slideshow({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // 3 seconds per slide
    return () => clearInterval(timer);
  }, [slides.length]);

  // Play audio when slide changes
  useEffect(() => {
    const audio = new Audio(slides[currentSlide].audio);
    audio.play().catch(err => console.log('Audio error:', err));
  }, [currentSlide, slides]);

  return (
    <div className="slideshow">
      <img
        src={slides[currentSlide].image}
        alt={`${slides[currentSlide].letter.toUpperCase()} - ${slides[currentSlide].word}`}
      />
      <p>
        {slides[currentSlide].letter.toUpperCase()} - {slides[currentSlide].word}
      </p>
      <div className="slide-controls">
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
          Previous
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Slideshow;