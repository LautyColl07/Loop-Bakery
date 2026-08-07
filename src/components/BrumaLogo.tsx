/**
 * Logo de Bruma Cafe — Gatito sonriente + tipografía retro
 * Basado en la identidad visual oficial.
 */

interface BrumaLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  variant?: 'full' | 'icon';
}

/** SVG del gatito Bruma (solo el ícono) */
export function BrumaCatIcon({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Orejas */}
      <path d="M25 40 L30 15 L45 35 Z" stroke="#402E23" strokeWidth="3" strokeLinejoin="round" fill="none" />
      <path d="M75 40 L70 15 L55 35 Z" stroke="#402E23" strokeWidth="3" strokeLinejoin="round" fill="none" />
      {/* Interior de orejas */}
      <path d="M30 35 L33 22 L42 33" stroke="#402E23" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M70 35 L67 22 L58 33" stroke="#402E23" strokeWidth="1.5" strokeLinejoin="round" fill="none" />

      {/* Cabeza (círculo grande) */}
      <circle cx="50" cy="52" r="30" stroke="#402E23" strokeWidth="3" fill="none" />

      {/* Ojos cerrados (arcos sonrientes) */}
      <path d="M37 46 Q40 42, 43 46" stroke="#402E23" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M57 46 Q60 42, 63 46" stroke="#402E23" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Nariz */}
      <circle cx="50" cy="51" r="1.5" fill="#402E23" />

      {/* Boca grande abierta (arco inferior) */}
      <path d="M33 56 Q50 82, 67 56" stroke="#402E23" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Línea superior de la boca */}
      <path d="M33 56 L67 56" stroke="#402E23" strokeWidth="2.5" strokeLinecap="round" />

      {/* Colmillos */}
      <path d="M37 56 L35 63" stroke="#402E23" strokeWidth="2" strokeLinecap="round" />
      <path d="M63 56 L65 63" stroke="#402E23" strokeWidth="2" strokeLinecap="round" />
      {/* Colmillos internos */}
      <path d="M45 56 L44 61" stroke="#402E23" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M55 56 L56 61" stroke="#402E23" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Logo completo con texto "BRUMA cafe" */
export function BrumaLogo({ size = 40, showText = true, className = '', variant = 'full' }: BrumaLogoProps) {
  if (variant === 'icon') {
    return <BrumaCatIcon size={size} className={className} />;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <BrumaCatIcon size={size} />
      {showText && (
        <div className="leading-none">
          <span
            className="block font-display font-bold tracking-wide"
            style={{ color: '#5B8296', fontSize: `${size * 0.45}px` }}
          >
            BRUMA
          </span>
          <span
            className="block font-display italic"
            style={{ color: '#402E23', fontSize: `${size * 0.28}px`, marginTop: '-2px' }}
          >
            cafe
          </span>
        </div>
      )}
    </div>
  );
}
