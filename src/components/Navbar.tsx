import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const navItems = [
  { label: 'Ритуалы', href: '#rituals' },
  { label: 'О нас', href: '#about' },
  { label: 'Мастера', href: '#masters' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(15, 13, 10, 0.96)'
            : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(212, 168, 87, 0.15)' : 'none',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between" style={{ height: '72px' }}>
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-start">
            <span className="font-cormorant text-2xl font-light tracking-[0.2em] text-gold leading-none">AURA</span>
            <span className="font-golos text-[9px] tracking-[0.4em] text-cream/40 uppercase mt-0.5">SPA & RITUALS</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA + burger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#booking')}
              className="hidden sm:block btn-gold text-[11px] py-2.5 px-5"
            >
              Записаться
            </button>
            <button
              className="lg:hidden text-cream/70 hover:text-gold transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-center items-center"
          style={{ background: 'rgba(15, 13, 10, 0.98)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item, i) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="font-cormorant text-3xl font-light text-cream/80 hover:text-gold transition-colors"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#booking')}
              className="btn-gold mt-4"
            >
              Записаться
            </button>
          </div>
        </div>
      )}
    </>
  );
}
