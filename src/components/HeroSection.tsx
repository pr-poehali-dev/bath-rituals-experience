import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    wordsRef.current.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 300 + i * 180);
      }
    });
  }, []);

  const scrollToBooking = () => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToRituals = () => document.querySelector('#rituals')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: 'var(--dark)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-100px', right: '-150px', background: 'radial-gradient(circle, rgba(212,168,87,0.10) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute rounded-full" style={{ width: '400px', height: '400px', bottom: '100px', left: '-100px', background: 'radial-gradient(circle, rgba(232,112,90,0.08) 0%, transparent 70%)', animation: 'float 6s ease-in-out infinite reverse', animationDelay: '2s' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(212,168,87,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(212,168,87,0.025) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none" style={{ opacity: 0.12 }}>
        <div className="w-80 h-80 rounded-full border border-gold" style={{ animation: 'rotateSlow 30s linear infinite' }} />
        <div className="absolute inset-8 rounded-full border border-gold/60" style={{ animation: 'rotateSlow 20s linear infinite reverse' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-cormorant text-6xl text-gold" style={{ opacity: 0.5 }}>✦</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20">
        <div className="flex items-center gap-3 mb-8 opacity-0 animate-fade-in delay-100" style={{ animationFillMode: 'forwards' }}>
          <div className="w-8 h-px bg-gold/60" />
          <span className="font-golos text-xs tracking-[0.3em] uppercase text-gold/70">СПА · Пространство Пара</span>
        </div>

        <div className="overflow-hidden mb-4">
          <h1 className="font-cormorant text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[0.9]">
            <span ref={(el) => { if (el) wordsRef.current[0] = el; }} className="block text-cream">Массаж.</span>
            <span ref={(el) => { if (el) wordsRef.current[1] = el; }} className="block" style={{ WebkitTextStroke: '1px rgba(212,168,87,0.6)', color: 'transparent' }}>Обёртывание.</span>
            <span ref={(el) => { if (el) wordsRef.current[2] = el; }} className="block text-gold">Уход.</span>
          </h1>
        </div>

        <div className="max-w-md mt-10 opacity-0 animate-fade-in delay-600" style={{ animationFillMode: 'forwards' }}>
          <p className="font-golos text-base text-cream/60 leading-relaxed">
            Профессиональные массажи, обёртывания и косметологические процедуры. Опытные специалисты и индивидуальный подход к каждому гостю.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-10 opacity-0 animate-fade-in delay-700" style={{ animationFillMode: 'forwards' }}>
          <button onClick={scrollToBooking} className="btn-gold">Записаться</button>
          <button onClick={scrollToRituals} className="btn-outline-gold flex items-center gap-2">
            Все процедуры <Icon name="ArrowRight" size={14} />
          </button>
        </div>

        <div className="flex flex-wrap gap-12 mt-20 opacity-0 animate-fade-in delay-800" style={{ animationFillMode: 'forwards' }}>
          {[
            { num: '3', label: 'Года работы' },
            { num: '500+', label: 'Гостей' },
            { num: '15+', label: 'Процедур' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-cormorant text-4xl text-gold font-light">{stat.num}</span>
              <span className="font-golos text-xs tracking-widest uppercase text-cream/40 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in delay-800" style={{ animationFillMode: 'forwards' }}>
        <span className="font-golos text-[10px] tracking-[0.3em] uppercase text-cream/30">Листать</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent" />
      </div>
    </section>
  );
}