import { useState } from 'react';
import Icon from '@/components/ui/icon';

const ritualOptions = [
  'Золотой детокс — 90 мин · 7 500 ₽',
  'Сияние кожи — 75 мин · 6 200 ₽',
  'Тайский массаж — 120 мин · 9 800 ₽',
  'Горячие камни — 90 мин · 8 400 ₽',
  'Балийский ритуал — 180 мин · 14 500 ₽',
  'Флоатинг — 60 мин · 5 500 ₽',
];

const masterOptions = [
  { name: 'Алина Соколова', spec: 'Тайский · Балийский', color: '#D4A857', initials: 'АС' },
  { name: 'Марина Вебер', spec: 'Косметология · Лицо', color: '#E8705A', initials: 'МВ' },
  { name: 'Дмитрий Орлов', spec: 'Массаж · Флоатинг', color: '#60A5FA', initials: 'ДО' },
  { name: 'Ольга Сайто', spec: 'Обёртывания · Скрабы', color: '#6BCB8B', initials: 'ОС' },
];

const timeSlots = [
  ['10:00', '11:30', '13:00'],
  ['14:30', '16:00', '17:30'],
  ['19:00', '20:30'],
];

const busySlots = ['11:30', '16:00'];

type BookStep = 'ritual' | 'master' | 'datetime' | 'info' | 'done';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь',
  'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

export default function BookingSection() {
  const today = new Date();
  const [step, setStep] = useState<BookStep>('ritual');
  const [selectedRitual, setSelectedRitual] = useState('');
  const [selectedMaster, setSelectedMaster] = useState('');
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  const steps: { key: BookStep; label: string }[] = [
    { key: 'ritual', label: 'Ритуал' },
    { key: 'master', label: 'Мастер' },
    { key: 'datetime', label: 'Дата' },
    { key: 'info', label: 'Данные' },
  ];

  const stepIndex = steps.findIndex(s => s.key === step);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1;

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const isPastDay = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  const handleSubmit = () => setStep('done');

  if (step === 'done') {
    return (
      <section id="booking" className="relative py-28" style={{ background: 'var(--dark-2)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: 'rgba(212,168,87,0.1)', border: '1px solid rgba(212,168,87,0.3)' }}
          >
            <Icon name="Check" size={32} color="#D4A857" />
          </div>
          <h2 className="font-cormorant text-5xl text-cream mb-4">Запись подтверждена</h2>
          <p className="font-golos text-cream/50 text-sm mb-2">Ждём вас, <span className="text-cream">{name}</span>!</p>
          <p className="font-golos text-cream/40 text-sm mb-8">
            {selectedMaster} · {MONTHS[calMonth]} {selectedDay} · {selectedTime}
          </p>
          <p className="font-golos text-cream/30 text-xs mb-10">Мы свяжемся с вами по номеру {phone} для подтверждения</p>
          <button
            className="btn-outline-gold"
            onClick={() => {
              setStep('ritual');
              setSelectedRitual('');
              setSelectedMaster('');
              setSelectedDay(null);
              setSelectedTime('');
              setName('');
              setPhone('');
              setComment('');
            }}
          >
            Новая запись
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="relative py-28" style={{ background: 'var(--dark-2)' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,87,0.3), transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
            <span className="font-golos text-xs tracking-[0.3em] uppercase text-gold/70">Онлайн-запись</span>
            <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream">
            Забронируйте <em className="text-gold not-italic">ритуал</em>
          </h2>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-golos font-medium transition-all duration-300"
                  style={{
                    background: i <= stepIndex ? 'var(--gold)' : 'rgba(212,168,87,0.1)',
                    color: i <= stepIndex ? 'var(--dark)' : 'rgba(212,168,87,0.4)',
                    border: i <= stepIndex ? 'none' : '1px solid rgba(212,168,87,0.2)',
                  }}
                >
                  {i < stepIndex ? <Icon name="Check" size={12} color="var(--dark)" /> : i + 1}
                </div>
                <span
                  className="font-golos text-[10px] mt-1.5 tracking-wider"
                  style={{ color: i <= stepIndex ? 'var(--gold)' : 'rgba(212,168,87,0.3)' }}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-16 h-px mb-4 mx-1 transition-all duration-500"
                  style={{ background: i < stepIndex ? 'var(--gold)' : 'rgba(212,168,87,0.15)' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div
          className="rounded-sm p-8"
          style={{ background: 'var(--dark-3)', border: '1px solid rgba(212,168,87,0.1)' }}
        >
          {/* Step 1: Ritual */}
          {step === 'ritual' && (
            <div>
              <h3 className="font-cormorant text-2xl text-cream mb-6">Выберите ритуал</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ritualOptions.map((r) => {
                  const name = r.split(' — ')[0];
                  const rest = r.split(' — ')[1];
                  return (
                    <button
                      key={r}
                      onClick={() => setSelectedRitual(r)}
                      className="text-left p-4 rounded-sm transition-all duration-200"
                      style={{
                        background: selectedRitual === r ? 'rgba(212,168,87,0.12)' : 'var(--dark-2)',
                        border: selectedRitual === r ? '1px solid rgba(212,168,87,0.5)' : '1px solid rgba(212,168,87,0.1)',
                      }}
                    >
                      <div className="font-golos text-sm font-medium text-cream">{name}</div>
                      <div className="font-golos text-xs text-cream/40 mt-0.5">{rest}</div>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end mt-8">
                <button
                  className="btn-gold"
                  disabled={!selectedRitual}
                  style={{ opacity: selectedRitual ? 1 : 0.4 }}
                  onClick={() => setStep('master')}
                >
                  Далее <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Master */}
          {step === 'master' && (
            <div>
              <h3 className="font-cormorant text-2xl text-cream mb-6">Выберите мастера</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {masterOptions.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMaster(m.name)}
                    className="flex items-center gap-4 p-4 rounded-sm text-left transition-all duration-200"
                    style={{
                      background: selectedMaster === m.name ? 'rgba(212,168,87,0.1)' : 'var(--dark-2)',
                      border: selectedMaster === m.name ? `1px solid ${m.color}50` : '1px solid rgba(212,168,87,0.1)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-golos font-medium flex-shrink-0"
                      style={{ background: `${m.color}20`, color: m.color }}
                    >
                      {m.initials}
                    </div>
                    <div>
                      <div className="font-golos text-sm text-cream">{m.name}</div>
                      <div className="font-golos text-xs text-cream/40">{m.spec}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <button className="btn-outline-gold" onClick={() => setStep('ritual')}>Назад</button>
                <button
                  className="btn-gold flex items-center gap-2"
                  disabled={!selectedMaster}
                  style={{ opacity: selectedMaster ? 1 : 0.4 }}
                  onClick={() => setStep('datetime')}
                >
                  Далее <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Date + Time */}
          {step === 'datetime' && (
            <div>
              <h3 className="font-cormorant text-2xl text-cream mb-6">Выберите дату и время</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="text-cream/40 hover:text-gold transition-colors p-1">
                      <Icon name="ChevronLeft" size={18} />
                    </button>
                    <span className="font-cormorant text-lg text-cream">
                      {MONTHS[calMonth]} {calYear}
                    </span>
                    <button onClick={nextMonth} className="text-cream/40 hover:text-gold transition-colors p-1">
                      <Icon name="ChevronRight" size={18} />
                    </button>
                  </div>

                  {/* Weekdays */}
                  <div className="grid grid-cols-7 mb-2">
                    {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d => (
                      <div key={d} className="cal-day text-[11px] font-golos text-cream/25 font-medium">{d}</div>
                    ))}
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-7 gap-y-1">
                    {[...Array(adjustedFirst)].map((_, i) => <div key={`e${i}`} className="cal-day" />)}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const day = i + 1;
                      const past = isPastDay(day);
                      const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                      const isSelected = selectedDay === day;
                      return (
                        <button
                          key={day}
                          onClick={() => !past && setSelectedDay(day)}
                          className={`cal-day ${isSelected ? 'cal-day-selected' : ''} ${past ? 'cal-day-disabled' : ''} ${isToday && !isSelected ? 'cal-day-today' : ''}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                <div>
                  <div className="font-golos text-xs text-cream/40 tracking-wider uppercase mb-4">
                    {selectedDay ? `${selectedDay} ${MONTHS[calMonth]}` : 'Сначала выберите дату'}
                  </div>
                  {selectedDay ? (
                    <div className="flex flex-col gap-3">
                      {timeSlots.map((group, gi) => (
                        <div key={gi} className="flex gap-2 flex-wrap">
                          {group.map(t => {
                            const busy = busySlots.includes(t);
                            return (
                              <button
                                key={t}
                                disabled={busy}
                                onClick={() => !busy && setSelectedTime(t)}
                                className={`time-slot ${selectedTime === t ? 'time-slot-selected' : ''} ${busy ? 'time-slot-busy' : ''}`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--gold)' }} />
                          <span className="font-golos text-[10px] text-cream/30">Выбрано</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(212,168,87,0.15)', opacity: 0.4 }} />
                          <span className="font-golos text-[10px] text-cream/30">Занято</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-cream/20 font-golos text-sm">—</div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button className="btn-outline-gold" onClick={() => setStep('master')}>Назад</button>
                <button
                  className="btn-gold flex items-center gap-2"
                  disabled={!selectedDay || !selectedTime}
                  style={{ opacity: selectedDay && selectedTime ? 1 : 0.4 }}
                  onClick={() => setStep('info')}
                >
                  Далее <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Personal info */}
          {step === 'info' && (
            <div>
              <h3 className="font-cormorant text-2xl text-cream mb-2">Ваши данные</h3>

              {/* Summary */}
              <div
                className="p-4 rounded-sm mb-6"
                style={{ background: 'rgba(212,168,87,0.05)', border: '1px solid rgba(212,168,87,0.1)' }}
              >
                <div className="flex flex-wrap gap-4 text-xs font-golos text-cream/50">
                  <span>📋 {selectedRitual.split(' — ')[0]}</span>
                  <span>👤 {selectedMaster}</span>
                  <span>📅 {selectedDay} {MONTHS[calMonth]} · {selectedTime}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-golos text-xs text-cream/40 tracking-wider uppercase mb-2 block">Имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 rounded-sm font-golos text-sm text-cream placeholder-cream/20 outline-none focus:ring-1 transition-all"
                    style={{
                      background: 'var(--dark-2)',
                      border: '1px solid rgba(212,168,87,0.15)',
                      // @ts-expect-error focus ring
                      '--tw-ring-color': 'rgba(212,168,87,0.4)',
                    }}
                  />
                </div>
                <div>
                  <label className="font-golos text-xs text-cream/40 tracking-wider uppercase mb-2 block">Телефон</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 rounded-sm font-golos text-sm text-cream placeholder-cream/20 outline-none focus:ring-1 transition-all"
                    style={{
                      background: 'var(--dark-2)',
                      border: '1px solid rgba(212,168,87,0.15)',
                    }}
                  />
                </div>
                <div>
                  <label className="font-golos text-xs text-cream/40 tracking-wider uppercase mb-2 block">Пожелания (необязательно)</label>
                  <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Особые пожелания, противопоказания..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-sm font-golos text-sm text-cream placeholder-cream/20 outline-none resize-none transition-all"
                    style={{
                      background: 'var(--dark-2)',
                      border: '1px solid rgba(212,168,87,0.15)',
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button className="btn-outline-gold" onClick={() => setStep('datetime')}>Назад</button>
                <button
                  className="btn-gold flex items-center gap-2"
                  disabled={!name || !phone}
                  style={{ opacity: name && phone ? 1 : 0.4 }}
                  onClick={handleSubmit}
                >
                  Подтвердить запись
                  <Icon name="Check" size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
