import React, { useState, useEffect } from 'react';

interface BackgroundCarouselProps {
  images: string[];
  interval?: number;
}

const BackgroundCarousel: React.FC<BackgroundCarouselProps> = ({ 
  images, 
  interval = 10000 
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]); // Следим за длиной массива

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Градиент должен быть выше картинок, но ниже контента */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a] z-10 pointer-events-none" />

      {images.map((img, i) => (
        <div
          key={img} // Используем URL как ключ для лучшей работы React
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[3000ms] ease-in-out
            ${index === i ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
          style={{ 
            backgroundImage: `url('${img}')`,
            // Масштаб меняется вместе с прозрачностью
            transform: index === i ? 'scale(1)' : 'scale(1.1)',
            transitionProperty: 'opacity, transform'
          }}
        />
      ))}

      {/* Индикаторы */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 transition-all duration-700 ${
              index === i ? 'w-8 bg-[#00ff95]' : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundCarousel;