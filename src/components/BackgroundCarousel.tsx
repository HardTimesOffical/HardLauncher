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
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Затемняющий градиент для читаемости интерфейса */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a] z-10" />

      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2500ms] ease-in-out scale-110
            ${index === i ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: `url('${img}')`,
            // Добавляем небольшое смещение для эффекта "живого" фона
            transform: index === i ? 'scale(1.05)' : 'scale(1.1)' 
          }}
        />
      ))}

      {/* Индикаторы (точки) */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-20 opacity-30 hover:opacity-100 transition-opacity">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              index === i ? 'w-4 bg-[#00ff95]' : 'w-1 bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundCarousel;