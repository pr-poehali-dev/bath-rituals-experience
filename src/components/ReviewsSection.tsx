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

const reviews = [
  {
    name: 'Екатерина М.',
    date: 'Март 2026',
    ritual: 'Классический массаж',
    text: 'Пришла после очень тяжёлой рабочей недели — вышла другим человеком. Анна нашла все болевые точки, спина перестала болеть уже на следующий день. Буду ходить регулярно.',
    rating: 5,
    initials: 'ЕМ',
    color: '#D4A857',
  },
  {
    name: 'Анастасия В.',
    date: 'Февраль 2026',
    ritual: 'Уход за лицом',
    text: 'Марина — профессионал с большой буквы. Объяснила всё про мой тип кожи, подобрала программу. После третьей процедуры кожа стала просто другой — ровной, сияющей.',
    rating: 5,
    initials: 'АВ',
    color: '#E8705A',
  },
  {
    name: 'Ирина Л.',
    date: 'Апрель 2026',
    ritual: 'Горячие камни',
    text: 'Лучший массаж в моей жизни. Дмитрий работает очень чутко — чувствует каждую точку напряжения. После сеанса забыла о хронической боли в спине на несколько дней.',
    rating: 5,
    initials: 'ИЛ',
    color: '#60A5FA',
  },
  {
    name: 'Мария Д.',
    date: 'Март 2026',
    ritual: 'Антицеллюлитный массаж',
    text: 'Прошла курс из 8 сеансов — результат заметен визуально. Кожа подтянулась, объёмы ушли. Ольга работает профессионально, следит за результатом от процедуры к процедуре.',
    rating: 5,
    initials: 'МД',
    color: '#6BCB8B',
  },
  {
    name: 'Ольга К.',
    date: 'Январь 2026',
    ritual: 'Водорослевое обёртывание',
    text: 'Очень приятная атмосфера, уютно и спокойно. Обёртывание понравилось — кожа после стала мягкой и увлажнённой. Обязательно вернусь на повторную процедуру.',
    rating: 5,
    initials: 'ОК',
    color: '#B78BFA',
  },
  {
    name: 'Диана Р.',
    date: 'Февраль 2026',
    ritual: 'Лимфодренажный массаж',
    text: 'Сильные отёки на ногах беспокоили давно. После курса лимфодренажа у Дмитрия отёки прошли. Очень рекомендую тем, кто много времени проводит сидя.',
    rating: 5,
    initials: 'ДР',
    color: '#FF8A50',
  },
];

export default function ReviewsSection() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);

  return (
    <section id="reviews" className="relative py-28 overflow-hidden" style={{ background: 'var(--dark)' }}>
      <div className="absolute bottom-0 right-0 font-cormorant select-none pointer-events-none" style={{ fontSize: 'clamp(60px,15vw,180px)', color: 'rgba(212,168,87,0.03)', fontStyle: 'italic', lineHeight: 1 }}>
        Отзывы
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
              <span className="font-golos text-xs tracking-[0.3em] uppercase text-gold/70">Отзывы</span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
              Говорят<br /><em className="text-gold not-italic">наши гости</em>
            </h2>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-sm" style={{ background: 'var(--dark-3)', border: '1px solid rgba(212,168,87,0.15)' }}>
            <div>
              <div className="font-cormorant text-4xl text-gold">4.9</div>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={11} color="#D4A857" />)}
              </div>
            </div>
            <div>
              <div className="font-golos text-xs text-cream/40 leading-relaxed">На основе<br /><span className="text-cream/70 font-medium">800+ отзывов</span></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="group relative rounded-sm p-6 cursor-pointer transition-all duration-300"
              style={{
                background: 'var(--dark-3)',
                border: active === i ? `1px solid ${r.color}40` : '1px solid rgba(212,168,87,0.08)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.7s ease ${0.1 + i * 0.08}s, transform 0.7s ease ${0.1 + i * 0.08}s, border 0.3s ease`,
              }}
              onClick={() => setActive(i)}
            >
              <div className="font-cormorant text-5xl leading-none mb-3" style={{ color: `${r.color}30` }}>"</div>
              <p className="font-golos text-sm text-cream/60 leading-relaxed mb-6 italic">{r.text}</p>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-golos font-medium" style={{ background: `${r.color}20`, color: r.color }}>{r.initials}</div>
                  <div>
                    <div className="font-golos text-xs font-medium text-cream">{r.name}</div>
                    <div className="font-golos text-[10px] text-cream/30">{r.date}</div>
                  </div>
                </div>
                <div className="font-golos text-[10px] tracking-widest px-2 py-0.5 rounded-sm" style={{ color: r.color, background: `${r.color}12` }}>{r.ritual}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
