const words = [
  'Классический массаж',
  '✦',
  'Антицеллюлитный массаж',
  '✦',
  'Горячие камни',
  '✦',
  'Обёртывание',
  '✦',
  'Лимфодренаж',
  '✦',
  'Уход за лицом',
  '✦',
  'Пилинг',
  '✦',
  'Скраб',
  '✦',
];

export default function MarqueeBar() {
  return (
    <div className="py-4 overflow-hidden" style={{ background: 'linear-gradient(90deg, var(--gold) 0%, #C49840 50%, var(--gold) 100%)' }}>
      <div className="marquee-inner">
        {[...words, ...words].map((word, i) => (
          <span key={i} className="font-golos text-xs tracking-[0.2em] uppercase text-dark font-semibold flex-shrink-0">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
