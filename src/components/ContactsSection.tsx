import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import LegalModal from '@/components/LegalModal';

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

const contacts = [
  { icon: 'MapPin', label: 'Адрес', value: 'мкр. Глобус 2, дом 1А', sub: 'г. Артём' },
  { icon: 'Phone', label: 'Телефон', value: '+7 (908) 980-35-45', sub: 'Пн–Вс, 9:00–21:00' },
  { icon: 'Mail', label: 'Email', value: 'info@prostranstvo-para.ru', sub: 'Ответим в течение часа' },
  { icon: 'Clock', label: 'Часы работы', value: 'Ежедневно 9:00–21:00', sub: 'Без выходных' },
];

const socials = [
  { icon: 'Instagram', label: 'Instagram', handle: '@prostranstvo.para' },
  { icon: 'MessageCircle', label: 'Telegram', handle: '@prostranstvopara' },
  { icon: 'Youtube', label: 'VK', handle: 'vk.com/prostranstvopara' },
];

export default function ContactsSection() {
  const { ref, inView } = useInView();
  const [agreed, setAgreed] = useState(false);
  const [modal, setModal] = useState<'privacy' | 'consent' | null>(null);

  return (
    <section id="contacts" className="relative py-28 overflow-hidden" style={{ background: 'var(--dark)' }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,168,87,0.06) 0%,transparent 70%)', transform: 'translate(30%,-30%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
              <span className="font-golos text-xs tracking-[0.3em] uppercase text-gold/70">Контакты</span>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream mb-6">
              Найдите<br /><em className="text-gold not-italic">нас</em>
            </h2>
            <p className="font-golos text-cream/50 text-sm leading-relaxed mb-10 max-w-sm">
              Ждём вас в Пространстве Пара. Для вопросов и записи — свяжитесь любым удобным способом.
            </p>

            <div className="flex flex-col gap-5">
              {contacts.map((c, i) => (
                <div key={c.label} className="flex gap-4" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-20px)', transition: `all 0.7s ease ${0.2 + i * 0.1}s` }}>
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,168,87,0.1)', border: '1px solid rgba(212,168,87,0.15)' }}>
                    <Icon name={c.icon} size={16} color="var(--gold)" />
                  </div>
                  <div>
                    <div className="font-golos text-[10px] tracking-widest uppercase text-cream/30 mb-0.5">{c.label}</div>
                    <div className="font-golos text-sm text-cream">{c.value}</div>
                    <div className="font-golos text-xs text-cream/35">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="font-golos text-[10px] tracking-widest uppercase text-cream/25 mb-4">Мы в соцсетях</div>
              <div className="flex gap-3 flex-wrap">
                {socials.map((s) => (
                  <button key={s.label} className="flex items-center gap-2 px-3 py-2 rounded-sm font-golos text-xs text-cream/50 hover:text-gold transition-all duration-200" style={{ background: 'var(--dark-3)', border: '1px solid rgba(212,168,87,0.1)' }}>
                    <Icon name={s.icon} size={14} />
                    {s.handle}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(30px)', transition: 'all 0.8s ease 0.2s' }}>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-6 flex items-center justify-center" style={{ background: 'var(--dark-3)', border: '1px solid rgba(212,168,87,0.1)' }}>
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(212,168,87,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,168,87,0.04) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="relative flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(212,168,87,0.15)' }}>
                  <Icon name="MapPin" size={20} color="var(--gold)" />
                </div>
                <div className="text-center">
                  <div className="font-cormorant text-xl text-cream">Пространство Пара</div>
                  <div className="font-golos text-xs text-cream/40 mt-1">г. Артём, мкр. Глобус 2, д. 1А</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-sm" style={{ background: 'var(--dark-3)', border: '1px solid rgba(212,168,87,0.1)' }}>
              <div className="font-cormorant text-xl text-cream mb-4">Обратный звонок</div>
              <div className="flex gap-3 flex-col sm:flex-row">
                <input type="tel" placeholder="+7 (___) ___-__-__" className="flex-1 px-4 py-3 rounded-sm font-golos text-sm text-cream placeholder-cream/20 outline-none transition-all" style={{ background: 'var(--dark-2)', border: '1px solid rgba(212,168,87,0.15)' }} />
                <button className="btn-gold whitespace-nowrap" disabled={!agreed} style={{ opacity: agreed ? 1 : 0.4 }}>Позвоните мне</button>
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3 mt-4">
                <button
                  onClick={() => setAgreed(!agreed)}
                  className="flex-shrink-0 w-5 h-5 rounded-sm border flex items-center justify-center transition-all duration-200 mt-0.5"
                  style={{ background: agreed ? 'var(--gold)' : 'transparent', borderColor: agreed ? 'var(--gold)' : 'rgba(212,168,87,0.3)' }}
                >
                  {agreed && <Icon name="Check" size={11} color="var(--dark)" />}
                </button>
                <p className="font-golos text-xs text-cream/35 leading-relaxed">
                  Согласен(на) с{' '}
                  <button onClick={() => setModal('privacy')} className="text-gold/70 hover:text-gold underline underline-offset-2 transition-colors">
                    Политикой конфиденциальности
                  </button>{' '}
                  и даю{' '}
                  <button onClick={() => setModal('consent')} className="text-gold/70 hover:text-gold underline underline-offset-2 transition-colors">
                    согласие на обработку данных
                  </button>
                </p>
              </div>

              <p className="font-golos text-[10px] text-cream/20 mt-3">Перезвоним в течение 15 минут в рабочее время</p>
            </div>
          </div>
        </div>
      </div>

      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}
    </section>
  );
}