import { useEffect, useState } from 'react';

type WatchingFaceProps = {
  isTyping: boolean;
};

export default function WatchingFace({ isTyping }: WatchingFaceProps) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const handleMouse = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBlink(true);
      const timeout = window.setTimeout(() => setBlink(false), 200);
      return () => window.clearTimeout(timeout);
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  const pupilX = typeof window === 'undefined' ? 0 : Math.max(-7, Math.min(7, (cursor.x / window.innerWidth - 0.5) * 14));

  return (
    <div aria-hidden="true" className="flex h-32 w-full items-center justify-center">
      <div className="relative flex size-28 items-center justify-center gap-5 rounded-full border-2 border-foreground bg-primary shadow-[4px_4px_0_var(--foreground)]">
        {[0, 1].map((eye) => (
          <div
            key={eye}
            className="flex w-7 items-end justify-center overflow-hidden bg-background transition-[height,border-radius,background-color] duration-150"
            style={{
              height: isTyping ? 4 : blink ? 6 : 32,
              borderRadius: isTyping || blink ? 2 : '50% / 60%',
              backgroundColor: isTyping ? 'var(--foreground)' : undefined,
            }}
          >
            {!isTyping && (
              <span className="mb-1 size-3 rounded-full bg-foreground transition-transform duration-100" style={{ transform: `translateX(${pupilX}px)` }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
