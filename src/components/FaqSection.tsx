import { useState, useEffect, useRef } from 'react';
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

const faqs = [
  {
    q: 'Нужно ли предварительно записываться?',
    a: 'Да, мы рекомендуем записываться заранее — особенно на выходные и праздничные дни. Записаться можно онлайн через форму на сайте, по телефону или в мессенджерах. Это гарантирует, что нужный мастер и время будут свободны именно для вас.',
  },
  {
    q: 'Как подготовиться к ритуалу?',
    a: 'Для большинства процедур достаточно прийти в комфортной одежде. Перед массажем лучше не есть за 2 часа. Для обёртываний и детокс-программ рекомендуем хорошо гидратироваться накануне. Перед первым визитом мастер проведёт консультацию.',
  },
  {
    q: 'Есть ли противопоказания к процедурам?',
    a: 'Да, некоторые ритуалы имеют противопоказания: беременность, кожные заболевания в стадии обострения, высокое давление. Полный список уточняется при записи. Наши мастера всегда проводят предварительную консультацию и подбирают программу с учётом вашего состояния.',
  },
  {
    q: 'Что входит в стоимость ритуала?',
    a: 'В стоимость включены: все расходные материалы, профессиональная косметика, использование шкафчика и предоставление халата, чай или вода до и после процедуры. Ряд программ включает также минеральную ванну или паровую капсулу.',
  },
  {
    q: 'Можно ли подарить ритуал в подарок?',
    a: 'Конечно! Мы оформляем подарочные сертификаты на любую сумму или конкретную программу. Сертификат действует 6 месяцев с момента выдачи. Оформить можно на месте или онлайн с доставкой.',
  },
  {
    q: 'Есть ли программы для пар?',
    a: 'Да! У нас есть парные ритуалы — например, «Золотой дуэт» (2 персоны, 120 мин, 16 000 ₽). Процедуры проходят в отдельном кабинете одновременно двумя мастерами. Идеально для романтических вечеров или подарка близкому человеку.',
  },
];

export default function FaqSection() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28" style={{ background: 'var(--dark-3)' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-10" ref={ref}>
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
            <span className="font-golos text-xs tracking-[0.3em] uppercase text-gold/70">FAQ</span>
            <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
          </div>
          <h2
            className="font-cormorant text-5xl md:text-6xl font-light text-cream"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease',
            }}
          >
            Вопросы <em className="text-gold not-italic">и ответы</em>
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-sm overflow-hidden transition-all duration-300"
              style={{
                background: open === i ? 'rgba(212,168,87,0.06)' : 'var(--dark-2)',
                border: open === i ? '1px solid rgba(212,168,87,0.2)' : '1px solid rgba(212,168,87,0.08)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s, background 0.3s, border 0.3s`,
              }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-golos text-sm font-medium text-cream pr-4">{faq.q}</span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: open === i ? 'var(--gold)' : 'rgba(212,168,87,0.1)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <Icon name="Plus" size={14} color={open === i ? 'var(--dark)' : 'rgba(212,168,87,0.6)'} />
                </div>
              </button>

              {open === i && (
                <div className="px-6 pb-6">
                  <div className="h-px mb-4" style={{ background: 'rgba(212,168,87,0.1)' }} />
                  <p className="font-golos text-sm text-cream/50 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
