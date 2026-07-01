import { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export default function DecryptedText({ text, speed = 50, maxIterations = 10, className }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const iterationsRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  const startDecryption = () => {
    iterationsRef.current = 0;
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (iterationsRef.current > index + maxIterations) {
              return char;
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      iterationsRef.current += 1;

      if (iterationsRef.current >= text.length + maxIterations) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);
  };

  useEffect(() => {
    startDecryption();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span 
      className={className}
      onMouseEnter={() => {
        if (!isHovered) {
          setIsHovered(true);
          startDecryption();
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
