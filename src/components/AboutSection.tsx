import { useEffect, useRef, useState } from 'react';

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

const values = [
  { icon: '🌿', title: 'Натуральность', desc: 'Только органические компоненты, без химии и агрессивных веществ' },
  { icon: '✦', title: 'Мастерство', desc: 'Каждый специалист — сертифицированный профессионал с опытом от 5 лет' },
  { icon: '🔮', title: 'Индивидуальность', desc: 'Каждый ритуал адаптируется под вас: кожу, состояние, желания' },
];

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="relative py-28 overflow-hidden" style={{ background: 'var(--dark)' }}>
      {/* Decorative large text */}
      <div
        className="absolute top-0 right-0 font-cormorant select-none pointer-events-none"
        style={{
          fontSize: 'clamp(80px, 18vw, 240px)',
          color: 'rgba(212,168,87,0.03)',
          lineHeight: 0.9,
          fontStyle: 'italic',
          transform: 'translateX(5%)',
        }}
      >
        AURA
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: visual */}
          <div
            className="relative"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-50px)',
              transition: 'all 1s ease',
            }}
          >
            {/* Main visual block */}
            <div
              className="relative aspect-[3/4] rounded-sm overflow-hidden"
              style={{
                background: 'var(--dark-3)',
                border: '1px solid rgba(212,168,87,0.1)',
              }}
            >
              {/* Abstract spa imagery with CSS */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(160deg, rgba(212,168,87,0.08) 0%, transparent 50%, rgba(232,112,90,0.06) 100%)',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <div
                  className="w-24 h-24 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(212,168,87,0.3) 0%, transparent 70%)',
                    animation: 'float 5s ease-in-out infinite',
                  }}
                />
                <span
                  className="font-cormorant text-8xl text-center"
                  style={{ color: 'rgba(212,168,87,0.15)', fontStyle: 'italic' }}
                >
                  12
                </span>
                <span className="font-golos text-xs tracking-[0.3em] uppercase text-cream/20">лет совершенства</span>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-6 -right-6 p-6 rounded-sm"
              style={{
                background: 'var(--gold)',
                width: '160px',
              }}
            >
              <div className="font-cormorant text-4xl font-light text-dark leading-none">40+</div>
              <div className="font-golos text-xs text-dark/70 tracking-widest uppercase mt-1">Ритуалов</div>
            </div>

            {/* Second small block */}
            <div
              className="absolute -top-6 -left-6 p-4 rounded-sm hidden lg:block"
              style={{
                background: 'var(--dark-3)',
                border: '1px solid rgba(212,168,87,0.2)',
                width: '140px',
              }}
            >
              <div className="font-cormorant text-3xl font-light text-gold leading-none">3.8K+</div>
              <div className="font-golos text-xs text-cream/40 tracking-widest uppercase mt-1">Гостей</div>
            </div>
          </div>

          {/* Right: text */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 1s ease 0.2s',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
              <span className="font-golos text-xs tracking-[0.3em] uppercase text-gold/70">О нас</span>
            </div>

            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream leading-[1.1] mb-8">
              Место, где<br />
              <em className="text-gold not-italic">тело говорит</em><br />
              на языке ритуала
            </h2>

            <p className="font-golos text-cream/60 text-sm leading-relaxed mb-6">
              AURA SPA — это больше, чем просто салон красоты. Это пространство, где древние практики встречаются с современными технологиями ухода. Мы создавали каждый уголок с мыслью о вашем полном погружении.
            </p>
            <p className="font-golos text-cream/50 text-sm leading-relaxed mb-12">
              Основанный в 2012 году, наш СПА объединил лучших мастеров из России, Таиланда и Бали. Более 3800 гостей ежегодно выбирают нас для восстановления и обновления.
            </p>

            {/* Values */}
            <div className="flex flex-col gap-5">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="flex gap-4 group"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(20px)',
                    transition: `all 0.7s ease ${0.4 + i * 0.15}s`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: 'rgba(212,168,87,0.1)', border: '1px solid rgba(212,168,87,0.2)' }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <div className="font-golos text-sm font-semibold text-cream mb-1">{v.title}</div>
                    <div className="font-golos text-xs text-cream/40 leading-relaxed">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
