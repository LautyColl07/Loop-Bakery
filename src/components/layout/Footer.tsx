import { Cake, MessageCircle, Instagram, Music2, MapPin, Heart, ExternalLink } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    sublabel: '+54 11 6790-5119',
    href: 'https://wa.me/5491167905119',
    icon: MessageCircle,
    color: '#25D366',
    bgClass: 'hover:bg-green-500/10',
    borderClass: 'hover:border-green-400/40',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    sublabel: '@loopbakery',
    href: 'https://instagram.com/loopbakery',
    icon: Instagram,
    color: '#E4405F',
    bgClass: 'hover:bg-pink-500/10',
    borderClass: 'hover:border-pink-400/40',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    sublabel: '@loopbakery',
    href: 'https://tiktok.com/@loopbakery',
    icon: Music2,
    color: '#69C9D0',
    bgClass: 'hover:bg-teal-400/10',
    borderClass: 'hover:border-teal-400/40',
  },
] as const;

const QUICK_LINKS = [
  { label: 'Elegir caja personalizada', href: '#personalizada' },
  { label: 'Cajas ya armadas', href: '#armadas' },
  { label: 'Otros productos', href: '#otros' },
  { label: 'Servicio de fiesta y cáterin', href: '#catering' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative overflow-hidden bg-purple-deep">
      {/* Fondo con gradiente y patrón de puntos */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-dark to-primary-800 pattern-dots" />

      {/* Decoración superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lila-DEFAULT to-transparent" />

      {/* Orbes decorativos */}
      <div className="absolute top-10 right-16 w-40 h-40 rounded-full bg-primary-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-16 w-32 h-32 rounded-full bg-lila-DEFAULT/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">

        {/* ── Grid principal ───────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* Columna 1 — Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-lila-DEFAULT to-white/90 flex items-center justify-center shadow-glow-lila flex-shrink-0">
                <Cake className="w-5 h-5 text-primary-800" strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-display font-bold text-white text-xl leading-none">Loop Bakery</p>
                <p className="text-lila-light text-xs tracking-widest uppercase font-light mt-0.5">Pastelería Artesanal</p>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Creamos experiencias dulces con ingredientes seleccionados y mucho amor. 
              Cada producto es elaborado artesanalmente, pensado para hacer tu momento especial.
            </p>

            {/* Ubicación placeholder */}
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <MapPin className="w-3.5 h-3.5 text-lila-light/60 flex-shrink-0" strokeWidth={1.8} />
              <span>Buenos Aires, Argentina</span>
            </div>
          </div>

          {/* Columna 2 — Links rápidos */}
          <div className="space-y-4">
            <h3 className="font-display text-white font-semibold text-base">
              Nuestros productos
            </h3>
            <div className="w-8 h-0.5 bg-gradient-to-r from-lila-DEFAULT to-primary-400 rounded-full" />
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    id={`footer-link-${link.href.replace('#', '')}`}
                    className="text-white/60 text-sm hover:text-lila-light transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-400 group-hover:bg-lila-DEFAULT transition-colors duration-200 flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Redes sociales */}
          <div className="space-y-4">
            <h3 className="font-display text-white font-semibold text-base">
              Contacto & Redes
            </h3>
            <div className="w-8 h-0.5 bg-gradient-to-r from-lila-DEFAULT to-primary-400 rounded-full" />

            <div className="space-y-3">
              {SOCIAL_LINKS.map(({ id, label, sublabel, href, icon: Icon, color, bgClass, borderClass }) => (
                <a
                  key={id}
                  id={`footer-social-${id}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label}: ${sublabel}`}
                  className={`flex items-center gap-3 p-3 rounded-xl border border-white/10 ${bgClass} ${borderClass} transition-all duration-300 group`}
                >
                  {/* Ícono */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.8} />
                  </div>

                  {/* Texto */}
                  <div className="min-w-0 flex-1">
                    <p className="text-white/90 text-sm font-medium leading-none">{label}</p>
                    <p className="text-white/50 text-xs mt-0.5 truncate">{sublabel}</p>
                  </div>

                  {/* Flecha */}
                  <ExternalLink
                    className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors duration-200 flex-shrink-0"
                    strokeWidth={1.8}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Separador ────────────────────────────── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6" />

        {/* ── Bottom bar ───────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <p>
            © {currentYear} Loop Bakery — Todos los derechos reservados
          </p>
          <p className="flex items-center gap-1.5">
            Hecho con{' '}
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            {' '}en Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  );
}
