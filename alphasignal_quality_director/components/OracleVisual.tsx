export function OracleVisual() {
  return (
    <div className="oracle-visual" aria-hidden="true">
      <svg viewBox="0 0 600 760" className="oracle-svg" role="img">
        <defs>
          <radialGradient id="halo" cx="50%" cy="30%" r="55%">
            <stop offset="0%" stopColor="rgba(255,243,211,0.95)" />
            <stop offset="20%" stopColor="rgba(245,194,107,0.72)" />
            <stop offset="55%" stopColor="rgba(106,90,255,0.24)" />
            <stop offset="100%" stopColor="rgba(5,10,20,0)" />
          </radialGradient>
          <linearGradient id="robe" x1="0" x2="1">
            <stop offset="0%" stopColor="#182747" />
            <stop offset="40%" stopColor="#223a64" />
            <stop offset="100%" stopColor="#0f1a33" />
          </linearGradient>
          <linearGradient id="skin" x1="0" x2="1">
            <stop offset="0%" stopColor="#f5d5b1" />
            <stop offset="50%" stopColor="#eebf95" />
            <stop offset="100%" stopColor="#c79472" />
          </linearGradient>
          <linearGradient id="hair" x1="0" x2="1">
            <stop offset="0%" stopColor="#d9e1ff" />
            <stop offset="100%" stopColor="#8ba3ff" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="300" cy="180" r="180" fill="url(#halo)" className="oracle-halo" />
        <path d="M185 660c28-128 53-194 95-252 39-54 80-82 124-82 49 0 89 31 125 90 39 65 61 130 87 244-47 37-128 56-246 56-75 0-137-18-185-56Z" fill="url(#robe)" opacity="0.95" />
        <path d="M218 618c48-32 103-49 165-49 58 0 109 12 154 36" stroke="rgba(245,194,107,0.35)" strokeWidth="4" strokeLinecap="round" />
        <path d="M245 513c20-46 40-80 59-102 17-18 36-28 59-28 27 0 47 11 65 32 18 22 38 56 56 103" fill="rgba(255,255,255,0.02)" />
        <path d="M215 270c-6-71 31-126 95-142 74-18 163 22 189 103 18 56 9 117-33 171-24 31-47 47-85 55-57 13-110-3-149-53-17-22-17-22-17-134Z" fill="url(#hair)" opacity="0.9" />
        <path d="M243 282c0-66 41-123 100-123s102 53 102 120c0 72-45 140-103 140-58 0-99-65-99-137Z" fill="url(#skin)" />
        <path d="M267 289c11-12 29-19 52-19 20 0 40 7 53 19" stroke="rgba(52,39,36,0.68)" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
        <ellipse cx="293" cy="310" rx="7" ry="9" fill="#241e28" />
        <ellipse cx="390" cy="310" rx="7" ry="9" fill="#241e28" />
        <path d="M326 350c11 8 24 12 38 12 15 0 29-4 40-12" stroke="rgba(108,63,79,0.72)" strokeWidth="6" strokeLinecap="round" />
        <path d="M346 318c0 17-8 30-21 40" stroke="rgba(100,68,55,0.55)" strokeWidth="4" strokeLinecap="round" />
        <path d="M265 262c18-18 42-28 72-31 44-4 80 6 111 31" stroke="rgba(219,225,255,0.56)" strokeWidth="10" strokeLinecap="round" opacity="0.9" />
        <path d="M258 410c10 43 33 77 69 101 10 7 15 18 15 31v45h-76l-48-122 40-55Z" fill="url(#robe)" />
        <path d="M434 408c-10 44-33 78-70 103-10 7-15 18-15 31v45h76l49-125-40-54Z" fill="url(#robe)" />

        <g filter="url(#glow)">
          <circle cx="166" cy="456" r="28" fill="rgba(245,194,107,0.9)" className="oracle-orb" />
          <circle cx="166" cy="456" r="48" fill="none" stroke="rgba(245,194,107,0.26)" strokeWidth="3" />
          <circle cx="166" cy="456" r="72" fill="none" stroke="rgba(139,125,255,0.18)" strokeWidth="2" />
        </g>

        <path d="M110 480c42-10 72-26 90-49" stroke="rgba(245,194,107,0.44)" strokeWidth="5" strokeLinecap="round" />
        <path d="M455 183c54 18 88 39 103 65" stroke="rgba(139,125,255,0.32)" strokeWidth="3" strokeLinecap="round" />
        <path d="M90 180c56-20 94-25 114-15" stroke="rgba(139,125,255,0.24)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="482" cy="118" r="5" fill="rgba(255,255,255,0.82)" className="oracle-star star-one" />
        <circle cx="520" cy="230" r="4" fill="rgba(245,194,107,0.82)" className="oracle-star star-two" />
        <circle cx="118" cy="130" r="4" fill="rgba(255,255,255,0.92)" className="oracle-star star-three" />
      </svg>
    </div>
  );
}
