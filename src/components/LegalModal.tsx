import { useEffect } from 'react';
import Icon from '@/components/ui/icon';

type ModalType = 'privacy' | 'consent';

interface LegalModalProps {
  type: ModalType;
  onClose: () => void;
}

const content = {
  privacy: {
    title: 'Политика конфиденциальности',
    subtitle: 'СПА «Пространство Пара»',
    sections: [
      {
        heading: '1. Общие положения',
        text: 'Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей, обратившихся за услугами СПА «Пространство Пара» (далее — Оператор), расположенного по адресу: г. Артём, мкр. Глобус 2, дом 1А.\n\nОператор обязуется соблюдать конфиденциальность персональных данных и обеспечивать их защиту в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».',
      },
      {
        heading: '2. Какие данные мы собираем',
        text: 'Оператор обрабатывает следующие категории персональных данных:\n— Фамилия, имя, отчество;\n— Номер телефона;\n— Дата и время записи на процедуру;\n— Выбранная процедура и специалист;\n— Пожелания и противопоказания (при наличии).',
      },
      {
        heading: '3. Цели обработки данных',
        text: 'Персональные данные обрабатываются исключительно в следующих целях:\n— Запись и подтверждение записи на процедуры;\n— Информирование о статусе записи;\n— Улучшение качества предоставляемых услуг;\n— Соблюдение требований законодательства РФ.',
      },
      {
        heading: '4. Хранение и защита данных',
        text: 'Персональные данные хранятся на защищённых серверах с ограниченным доступом. Оператор принимает все необходимые технические и организационные меры для защиты данных от несанкционированного доступа, изменения, раскрытия или уничтожения.\n\nДанные хранятся в течение срока, необходимого для достижения целей обработки, но не более 3 лет.',
      },
      {
        heading: '5. Передача данных третьим лицам',
        text: 'Оператор не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных действующим законодательством РФ. Данные не продаются, не передаются в аренду и не используются в коммерческих целях.',
      },
      {
        heading: '6. Права субъекта персональных данных',
        text: 'Вы вправе:\n— Получить информацию об обрабатываемых данных;\n— Требовать уточнения, блокирования или уничтожения данных;\n— Отозвать согласие на обработку персональных данных;\n— Обратиться с жалобой в Роскомнадзор.',
      },
      {
        heading: '7. Контактная информация',
        text: 'По вопросам обработки персональных данных обращайтесь:\nТелефон: +7 (908) 980-35-45\nАдрес: г. Артём, мкр. Глобус 2, дом 1А',
      },
    ],
  },
  consent: {
    title: 'Согласие на обработку персональных данных',
    subtitle: 'СПА «Пространство Пара»',
    sections: [
      {
        heading: 'Субъект персональных данных',
        text: 'Настоящим я, пользователь, оставляющий заявку на сайте СПА «Пространство Пара» (г. Артём, мкр. Глобус 2, дом 1А), действуя свободно, своей волей и в своём интересе, даю согласие на обработку моих персональных данных.',
      },
      {
        heading: 'Оператор персональных данных',
        text: 'СПА «Пространство Пара»\nАдрес: г. Артём, мкр. Глобус 2, дом 1А\nТелефон: +7 (908) 980-35-45',
      },
      {
        heading: 'Перечень персональных данных',
        text: 'Я даю согласие на обработку следующих персональных данных:\n— Фамилия, имя;\n— Номер мобильного телефона;\n— Пожелания к процедурам и сведения о противопоказаниях (при указании).',
      },
      {
        heading: 'Цель обработки',
        text: 'Персональные данные обрабатываются с целью:\n— Организации записи на процедуры;\n— Подтверждения и напоминания о записи;\n— Обратной связи по качеству услуг.',
      },
      {
        heading: 'Перечень действий с данными',
        text: 'Согласие распространяется на следующие действия: сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.',
      },
      {
        heading: 'Срок действия согласия',
        text: 'Настоящее согласие действует с момента его предоставления и до достижения целей обработки персональных данных, либо до момента его отзыва. Отзыв согласия осуществляется путём письменного обращения к Оператору.',
      },
      {
        heading: 'Отзыв согласия',
        text: 'Вы вправе в любой момент отозвать настоящее согласие, направив письменное заявление по адресу: г. Артём, мкр. Глобус 2, дом 1А, или позвонив по телефону: +7 (908) 980-35-45.\n\nПосле отзыва согласия Оператор прекратит обработку данных в течение 30 дней.',
      },
    ],
  },
};

export default function LegalModal({ type, onClose }: LegalModalProps) {
  const data = content[type];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(10, 8, 6, 0.85)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-sm"
        style={{
          background: 'var(--dark-3)',
          border: '1px solid rgba(212,168,87,0.2)',
          animation: 'fadeInUp 0.3s ease forwards',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4" style={{ borderBottom: '1px solid rgba(212,168,87,0.1)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-px" style={{ background: 'var(--gold)' }} />
              <span className="font-golos text-[10px] tracking-[0.25em] uppercase text-gold/60">{data.subtitle}</span>
            </div>
            <h2 className="font-cormorant text-2xl font-light text-cream">{data.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ml-4 transition-all duration-200 hover:bg-gold/10"
            style={{ border: '1px solid rgba(212,168,87,0.2)' }}
          >
            <Icon name="X" size={14} color="rgba(212,168,87,0.7)" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,87,0.3) transparent' }}>
          {data.sections.map((section, i) => (
            <div key={i}>
              <h3 className="font-golos text-xs font-semibold tracking-wider uppercase text-gold/70 mb-2">{section.heading}</h3>
              <p className="font-golos text-sm text-cream/50 leading-relaxed whitespace-pre-line">{section.text}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 pt-4" style={{ borderTop: '1px solid rgba(212,168,87,0.1)' }}>
          <button onClick={onClose} className="btn-gold w-full justify-center">
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}
