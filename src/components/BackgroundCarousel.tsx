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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    setProgress(0);
    const startTime = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / interval) * 100, 100));
    }, 50);

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setProgress(0);
    }, interval);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(timer);
    };
  }, [index, images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Градиент */}
      <div className="absolute inset-0  via-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 to-transparent z-10 pointer-events-none" />

      {/* Картинки */}
      {images.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[3000ms] ease-in-out
            ${index === i ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
          style={{
            backgroundImage: `url('${img}')`,
            transform: index === i ? 'scale(1)' : 'scale(1.05)',
            transitionProperty: 'opacity, transform',
          }}
        />
      ))}

      {/* Индикаторы — ЛЕВАЯ СТОРОНА, вертикально, выше footer */}
      <div className="absolute left-4 bottom-20 flex flex-col gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group relative flex items-center gap-2 no-drag"
            title={`Слайд ${i + 1}`}
          >
            {/* Трек */}
            <div
              className={`relative overflow-hidden rounded-full transition-all duration-500
                ${index === i ? 'w-1 h-10' : 'w-1 h-4 opacity-30 hover:opacity-60'}`}
              style={{ backgroundColor: 'var(--color-border)' }}
            >
              {/* Прогресс-заливка */}
              {index === i && (
                <div
                  className="absolute top-0 left-0 w-full rounded-full transition-none"
                  style={{
                    height: `${progress}%`,
                    backgroundColor: 'var(--color-brand)',
                    boxShadow: '0 0 6px var(--color-brand)',
                  }}
                />
              )}
            </div>

            {/* Номер слайда при ховере */}
            <span
              className="text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none"
              style={{ color: 'var(--color-text-dim)', fontFamily: 'monospace' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundCarousel;
