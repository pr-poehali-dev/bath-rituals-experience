import Icon from '@/components/ui/icon';

const footerLinks = [
  { label: 'Процедуры', href: '#rituals' },
  { label: 'О нас', href: '#about' },
  { label: 'Специалисты', href: '#masters' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16" style={{ background: 'var(--dark)', borderTop: '1px solid rgba(212,168,87,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="mb-4">
              <div className="font-cormorant text-2xl font-light tracking-[0.15em] text-gold leading-none">ПРОСТРАНСТВО ПАРА</div>
              <div className="font-golos text-[9px] tracking-[0.35em] text-cream/30 uppercase mt-0.5">СПА · МАССАЖ · УХОД</div>
            </div>
            <p className="font-golos text-xs text-cream/35 leading-relaxed max-w-xs">
              Профессиональные массажи, обёртывания и косметологические процедуры. Индивидуальный подход к каждому гостю.
            </p>
          </div>

          <div>
            <div className="font-golos text-[10px] tracking-widest uppercase text-cream/25 mb-5">Навигация</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {footerLinks.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="font-golos text-sm text-cream/40 hover:text-gold text-left transition-colors duration-200">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="font-golos text-[10px] tracking-widest uppercase text-cream/25 mb-5">Запись</div>
            <p className="font-golos text-xs text-cream/35 leading-relaxed mb-5">
              Запишитесь онлайн в любое удобное время — быстро и без звонков.
            </p>
            <button onClick={() => scrollTo('#booking')} className="btn-gold w-full sm:w-auto">
              Записаться онлайн
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(212,168,87,0.08)' }}>
          <span className="font-golos text-xs text-cream/20">© 2026 Пространство Пара. Все права защищены.</span>
          <div className="flex items-center gap-2 text-cream/20">
            <Icon name="Heart" size={10} color="rgba(232,112,90,0.5)" />
            <span className="font-golos text-xs">Создано с заботой о вас</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
