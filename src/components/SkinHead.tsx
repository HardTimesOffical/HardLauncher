import React from 'react';

interface SkinHeadProps {
  nickname: string;
  provider?: string;
  size?: number; // px
  className?: string;
}

const SkinHead: React.FC<SkinHeadProps> = ({ nickname, provider, size = 32, className = '' }) => {
  const isEly = provider === 'ely';
  const isEmpty = !nickname || nickname.trim() === '';

  if (isEmpty) {
    return (
      <div
        className={`flex-shrink-0 bg-white/[0.05] rounded ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  if (isEly) {
    return (
      <div
        className={`flex-shrink-0 ${className}`}
        style={{
          width: size,
          height: size,
          backgroundImage: `url(https://skinsystem.ely.by/skins/${nickname}.png)`,
          backgroundSize: '800%',
          backgroundPosition: '14.285% 14.285%',
          imageRendering: 'pixelated',
        }}
      />
    );
  }

  return (
    <img
      src={`https://minotar.net/helm/${nickname}/${size * 2}.png`}
      className={`flex-shrink-0 pixelated ${className}`}
      style={{ width: size, height: size }}
      alt={nickname}
      onError={(e: any) => {
        e.target.src = `https://minotar.net/helm/char/${size * 2}.png`;
      }}
    />
  );
};

export default SkinHead;