import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const rituals = [
  {
    id: 1,
    category: 'Тело',
    name: 'Золотой детокс',
    desc: 'Обёртывание с золотыми частицами и морскими водорослями. Очищает, питает и подтягивает кожу.',
    duration: '90 мин',
    price: '7 500 ₽',
    emoji: '✨',
    color: 'from-yellow-900/30 to-yellow-800/10',
    accent: 'var(--gold)',
  },
  {
    id: 2,
    category: 'Лицо',
    name: 'Сияние кожи',
    desc: 'Профессиональный уход с микротоками и гиалуроновой сывороткой. Видимый результат с первой процедуры.',
    duration: '75 мин',
    price: '6 200 ₽',
    emoji: '🌿',
    color: 'from-emerald-900/30 to-emerald-800/10',
    accent: '#6BCB8B',
  },
  {
    id: 3,
    category: 'Расслабление',
    name: 'Тайский массаж',
    desc: 'Традиционная техника с ароматическими маслами. Снимает напряжение, восстанавливает энергию.',
    duration: '120 мин',
    price: '9 800 ₽',
    emoji: '🪷',
    color: 'from-rose-900/30 to-rose-800/10',
    accent: 'var(--coral)',
  },
  {
    id: 4,
    category: 'Энергия',
    name: 'Горячие камни',
    desc: 'Массаж базальтовыми камнями с эфирными маслами. Глубокое расслабление и прогрев мышц.',
    duration: '90 мин',
    price: '8 400 ₽',
    emoji: '🔥',
    color: 'from-orange-900/30 to-orange-800/10',
    accent: '#FF8A50',
  },
  {
    id: 5,
    category: 'Восстановление',
    name: 'Балийский ритуал',
    desc: 'Полный ритуал: скраб, ванна с цветами, массаж и медитация. Полное обновление за 3 часа.',
    duration: '180 мин',
    price: '14 500 ₽',
    emoji: '🌺',
    color: 'from-violet-900/30 to-violet-800/10',
    accent: '#B78BFA',
  },
  {
    id: 6,
    category: 'Тело',
    name: 'Флоатинг',
    desc: 'Сенсорная депривация в солевом растворе. Глубокая медитация и восстановление нервной системы.',
    duration: '60 мин',
    price: '5 500 ₽',
    emoji: '💧',
    color: 'from-blue-900/30 to-blue-800/10',
    accent: '#60A5FA',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function RitualsSection() {
  const { ref, inView } = useInView();

  return (
    <section id="rituals" className="relative py-28 overflow-hidden" style={{ background: 'var(--dark-2)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,87,0.3), transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,87,0.3), transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
              <span className="font-golos text-xs tracking-[0.3em] uppercase text-gold/70">Наши услуги</span>
            </div>
            <h2
              className="font-cormorant text-5xl md:text-6xl font-light text-cream"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease',
              }}
            >
              Ритуалы<br />
              <em className="text-gold not-italic">красоты</em>
            </h2>
          </div>
          <p
            className="font-golos text-cream/50 text-sm max-w-xs leading-relaxed"
            style={{
              opacity: inView ? 1 : 0,
              transition: 'all 0.8s ease 0.3s',
            }}
          >
            Каждый ритуал разработан нашими мастерами с использованием натуральных ингредиентов со всего мира
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rituals.map((ritual, i) => (
            <div
              key={ritual.id}
              className="card-ritual group relative rounded-sm overflow-hidden cursor-pointer"
              style={{
                background: 'var(--dark-3)',
                border: '1px solid rgba(212, 168, 87, 0.1)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s ease ${0.1 + i * 0.08}s`,
              }}
            >
              {/* Gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${ritual.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: ritual.accent, transformOrigin: 'left' }}
              />

              <div className="relative z-10 p-7">
                {/* Category + emoji */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="font-golos text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-sm"
                    style={{
                      color: ritual.accent,
                      background: `${ritual.accent}15`,
                      border: `1px solid ${ritual.accent}30`,
                    }}
                  >
                    {ritual.category}
                  </span>
                  <span className="text-2xl">{ritual.emoji}</span>
                </div>

                {/* Name */}
                <h3 className="font-cormorant text-2xl text-cream font-light mb-3 group-hover:text-gold transition-colors duration-300">
                  {ritual.name}
                </h3>

                {/* Desc */}
                <p className="font-golos text-sm text-cream/50 leading-relaxed mb-6">
                  {ritual.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(212,168,87,0.1)' }}>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Clock" size={13} className="text-cream/30" />
                    <span className="font-golos text-xs text-cream/40">{ritual.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-cormorant text-xl text-gold">{ritual.price}</span>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                      style={{ background: ritual.accent }}
                    >
                      <Icon name="ArrowRight" size={12} color="var(--dark)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button
            onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold"
          >
            Забронировать ритуал
          </button>
        </div>
      </div>
    </section>
  );
}
