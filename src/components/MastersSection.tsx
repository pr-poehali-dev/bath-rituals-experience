import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const masters = [
  {
    name: 'Анна Соколова',
    role: 'Массажист',
    spec: 'Классический · Антицеллюлитный · Горячие камни',
    exp: '8 лет',
    rating: 4.9,
    reviews: 312,
    color: '#D4A857',
    initials: 'АС',
    bg: 'from-yellow-900/40 to-yellow-800/10',
  },
  {
    name: 'Марина Вебер',
    role: 'Косметолог',
    spec: 'Уход за лицом · Пилинги · Чистки',
    exp: '6 лет',
    rating: 4.9,
    reviews: 215,
    color: '#E8705A',
    initials: 'МВ',
    bg: 'from-rose-900/40 to-rose-800/10',
  },
  {
    name: 'Дмитрий Орлов',
    role: 'Массажист',
    spec: 'Лимфодренаж · Спортивный · Релакс',
    exp: '10 лет',
    rating: 5.0,
    reviews: 418,
    color: '#60A5FA',
    initials: 'ДО',
    bg: 'from-blue-900/40 to-blue-800/10',
  },
  {
    name: 'Ольга Сайто',
    role: 'СПА-специалист',
    spec: 'Обёртывания · Скрабы · Ароматерапия',
    exp: '7 лет',
    rating: 4.9,
    reviews: 267,
    color: '#6BCB8B',
    initials: 'ОС',
    bg: 'from-emerald-900/40 to-emerald-800/10',
  },
];

export default function MastersSection() {
  const { ref, inView } = useInView();

  return (
    <section id="masters" className="relative py-28" style={{ background: 'var(--dark-3)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
            <span className="font-golos text-xs tracking-[0.3em] uppercase text-gold/70">Команда</span>
            <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
          </div>
          <h2
            className="font-cormorant text-5xl md:text-6xl font-light text-cream"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}
          >
            Наши <em className="text-gold not-italic">специалисты</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {masters.map((m, i) => (
            <div
              key={m.name}
              className="group relative rounded-sm overflow-hidden cursor-pointer"
              style={{
                background: 'var(--dark-2)',
                border: '1px solid rgba(212,168,87,0.1)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s ease ${0.1 + i * 0.1}s`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${m.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute top-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: m.color, transformOrigin: 'left' }} />

              <div className="relative z-10 p-6">
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto font-cormorant font-light" style={{ background: `${m.color}20`, border: `2px solid ${m.color}40`, color: m.color, fontSize: '1.5rem' }}>
                    {m.initials}
                  </div>
                  <div className="absolute bottom-0 right-[calc(50%-32px-4px)] w-3 h-3 rounded-full border-2" style={{ background: '#4CAF50', borderColor: 'var(--dark-2)' }} />
                </div>

                <div className="text-center">
                  <h3 className="font-cormorant text-xl text-cream font-light mb-0.5">{m.name}</h3>
                  <div className="font-golos text-[10px] tracking-widest uppercase mb-1" style={{ color: m.color }}>{m.role}</div>
                  <p className="font-golos text-xs text-cream/40 leading-relaxed mb-4">{m.spec}</p>
                  <div className="h-px mb-4" style={{ background: 'rgba(212,168,87,0.1)' }} />
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={11} color={m.color} />
                      <span className="font-golos font-semibold" style={{ color: m.color }}>{m.rating}</span>
                      <span className="text-cream/30 font-golos">({m.reviews})</span>
                    </div>
                    <span className="font-golos text-cream/30">{m.exp} опыта</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ background: 'linear-gradient(to top, var(--dark-2) 80%, transparent)' }}>
                <button onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-2 text-xs font-golos font-medium tracking-wider uppercase text-dark rounded-sm" style={{ background: m.color }}>
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
