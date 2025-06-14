import { useState } from 'react';
import './Carousel.css';

function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="carousel">
      <div className="carousel-images">
        <button onClick={goToPrevious} className="left-arrow">
          ❮
        </button>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
        <button onClick={goToNext} className="right-arrow">
          ❯
        </button>
      </div>
      <div className="carousel-dots">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`dot ${slideIndex === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(slideIndex)}
          >
            •
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;