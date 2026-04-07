const words = [
  'Тайский массаж',
  '✦',
  'Арома-ритуал',
  '✦',
  'Горячие камни',
  '✦',
  'Золотая маска',
  '✦',
  'Детокс-обёртывание',
  '✦',
  'Скраб с минералами',
  '✦',
  'Балийский ритуал',
  '✦',
  'Флоатинг',
  '✦',
];

export default function MarqueeBar() {
  return (
    <div
      className="py-4 overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, var(--gold) 0%, #C49840 50%, var(--gold) 100%)',
      }}
    >
      <div className="marquee-inner">
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className="font-golos text-xs tracking-[0.2em] uppercase text-dark font-semibold flex-shrink-0"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
