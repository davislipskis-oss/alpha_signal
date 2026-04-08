export function OracleVisual() {
  return (
    <div className="oracle-visual" aria-hidden="true">
      <svg viewBox="0 0 600 760" className="oracle-svg" role="img">
        <defs>
          <radialGradient id="halo" cx="50%" cy="28%" r="58%">
            <stop offset="0%" stopColor="rgba(255,243,211,0.98)" />
            <stop offset="22%" stopColor="rgba(245,194,107,0.74)" />
            <stop offset="58%" stopColor="rgba(106,90,255,0.22)" />
            <stop offset="100%" stopColor="rgba(5,10,20,0)" />
          </radialGradient>
          <linearGradient id="robe" x1="0" x2="1">
            <stop offset="0%" stopColor="#162847" />
            <stop offset="45%" stopColor="#24446f" />
            <stop offset="100%" stopColor="#0c1730" />
          </linearGradient>
          <linearGradient id="skin" x1="0" x2="1">
            <stop offset="0%" stopColor="#f6d9bc" />
            <stop offset="50%" stopColor="#efc49f" />
            <stop offset="100%" stopColor="#c49173" />
          </linearGradient>
          <linearGradient id="hair" x1="0" x2="1">
            <stop offset="0%" stopColor="#f3f6ff" />
            <stop offset="100%" stopColor="#93a8ff" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="300" cy="182" r="182" fill="url(#halo)" className="oracle-halo" />
        <path d="M180 662c28-129 56-199 101-257 40-51 80-77 121-77 46 0 86 28 123 86 42 65 68 133 91 248-48 37-128 56-242 56-81 0-145-18-194-56Z" fill="url(#robe)" opacity="0.96" />
        <path d="M230 607c40-20 86-31 138-31 59 0 115 13 165 40" stroke="rgba(245,194,107,0.34)" strokeWidth="4" strokeLinecap="round" />
        <path d="M212 280c0-78 55-142 129-142 74 0 129 64 129 145 0 43-11 79-31 110-15 22-15 22-29 32-35 27-62 38-99 38-42 0-76-14-109-47-36-38-54-82-54-136Z" fill="url(#hair)" opacity="0.92" />
        <path d="M246 292c0-69 43-127 103-127 60 0 102 56 102 126 0 73-44 138-102 138-60 0-103-65-103-137Z" fill="url(#skin)" />
        <path d="M279 288c15-13 35-19 60-19 24 0 44 6 60 19" stroke="rgba(61,42,42,0.62)" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
        <ellipse cx="305" cy="315" rx="8" ry="10" fill="#261d27" />
        <ellipse cx="392" cy="315" rx="8" ry="10" fill="#261d27" />
        <path d="M328 358c14 9 28 13 43 13 15 0 30-4 43-13" stroke="rgba(125,71,84,0.78)" strokeWidth="6" strokeLinecap="round" />
        <path d="M344 322c0 17-7 31-20 41" stroke="rgba(111,75,61,0.56)" strokeWidth="4" strokeLinecap="round" />
        <path d="M255 253c24-20 53-30 89-32 45-2 81 8 109 31" stroke="rgba(229,235,255,0.64)" strokeWidth="10" strokeLinecap="round" opacity="0.9" />
        <path d="M253 418c14 43 39 77 75 100 10 6 15 18 15 31v39h-81l-45-123 36-47Z" fill="url(#robe)" />
        <path d="M443 419c-12 43-37 76-74 98-11 7-16 18-16 31v40h84l46-126-40-43Z" fill="url(#robe)" />
        <g filter="url(#glow)">
          <circle cx="173" cy="458" r="30" fill="rgba(245,194,107,0.92)" className="oracle-orb" />
          <circle cx="173" cy="458" r="52" fill="none" stroke="rgba(245,194,107,0.24)" strokeWidth="3" />
          <circle cx="173" cy="458" r="78" fill="none" stroke="rgba(139,125,255,0.18)" strokeWidth="2" />
        </g>
        <path d="M116 482c44-9 74-24 96-46" stroke="rgba(245,194,107,0.46)" strokeWidth="5" strokeLinecap="round" />
        <path d="M468 188c53 17 87 39 102 64" stroke="rgba(139,125,255,0.32)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="495" cy="120" r="5" fill="rgba(255,255,255,0.82)" className="oracle-star star-one" />
        <circle cx="524" cy="226" r="4" fill="rgba(245,194,107,0.84)" className="oracle-star star-two" />
        <circle cx="116" cy="132" r="4" fill="rgba(255,255,255,0.92)" className="oracle-star star-three" />
      </svg>
    </div>
  );
}
