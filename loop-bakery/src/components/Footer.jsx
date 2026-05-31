import React from 'react';
import { Instagram, MessageCircle, Music2, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      href: 'https://wa.me/541167905119?text=Hola!%20Me%20gustaría%20hacer%20un%20pedido%20en%20Loop%20Bakery',
      color: 'hover:text-green-500',
    },
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      href: 'https://instagram.com', // Replace with actual link
      color: 'hover:text-pink-500',
    },
    {
      name: 'TikTok',
      icon: <Music2 size={20} />,
      href: '#',
      color: 'hover:text-black',
    },
  ];

  return (
    <footer className="bg-cream-dark border-t border-primary/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center group">
              <div className="bg-primary text-cream p-2 rounded-full mr-2">
                <Heart size={20} />
              </div>
              <span className="text-2xl font-bold text-primary-dark tracking-tight">
                Loop <span className="text-primary">Bakery</span>
              </span>
            </div>
            <p className="text-neutral text-sm leading-relaxed">
              Creamos experiencias dulces y personalizadas para hacer tus momentos especiales aún más inolvidables. Calidad artesanal en cada bocado.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-white border border-primary/10 text-neutral-dark transition-all duration-300 shadow-sm ${link.color} hover:-translate-y-1`}
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-primary-dark font-bold uppercase tracking-widest text-xs">Productos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral text-sm hover:text-primary transition-colors">Cajas Personalizadas</a></li>
                <li><a href="#" className="text-neutral text-sm hover:text-primary transition-colors">Cajas Armadas</a></li>
                <li><a href="#" className="text-neutral text-sm hover:text-primary transition-colors">Otros Productos</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-primary-dark font-bold uppercase tracking-widest text-xs">Servicios</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral text-sm hover:text-primary transition-colors">Eventos</a></li>
                <li><a href="#" className="text-neutral text-sm hover:text-primary transition-colors">Catering</a></li>
                <li><a href="#" className="text-neutral text-sm hover:text-primary transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-primary-dark font-bold uppercase tracking-widest text-xs">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-neutral text-sm">
                <MessageCircle size={18} className="text-primary shrink-0" />
                <span>+54 11 6790-5119<br/>Atención personalizada vía WhatsApp</span>
              </div>
              <div className="flex items-start space-x-3 text-neutral text-sm">
                <span className="text-primary shrink-0 font-bold">📍</span>
                <span>Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-dark/60 text-xs">
            © {currentYear} Loop Bakery. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-xs text-neutral-dark/60">
            <a href="#" className="hover:text-primary transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
