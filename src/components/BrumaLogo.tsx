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

/** Icono del logo (PNG) */
export function BrumaCatIcon({ size = 40, className = '' }: { size?: number; className?: string }) {
  // Escalamos el tamaño base para que el PNG no se vea tan chico
  const visualSize = size * 4;
  return (
    <img
      src="/Logo bruma.png"
      alt="Bruma Cafe"
      style={{ height: visualSize, width: 'auto' }}
      className={`object-contain ${className}`}
    />
  );
}

/** Logo completo (PNG) */
export function BrumaLogo({ size = 40, showText = true, className = '', variant = 'full' }: BrumaLogoProps) {
  // Escalamos el tamaño base para que el PNG no se vea tan chico
  const visualSize = size * 4;
  return (
    <img
      src="/Logo bruma.png"
      alt="Bruma Cafe"
      style={{ height: visualSize, width: 'auto' }}
      className={`object-contain ${className}`}
    />
  );
}
