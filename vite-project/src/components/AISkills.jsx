import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import { FiTerminal, FiEdit3, FiSearch, FiShield } from 'react-icons/fi';

/**
 * Секция отвечает на один вопрос: как AI участвует в моей работе.
 * Прежняя версия заявляла восемь «специализаций» — RAG, векторные базы,
 * дообучение Llama и Mistral, — которых за этим кодом не стоит. Четыре
 * честные карточки убеждают сильнее восьми громких.
 */
const AISkills = () => {
  const { t } = useTranslation();

  const cards = [
    { key: 'pair', icon: <FiTerminal /> },
    { key: 'context', icon: <FiEdit3 /> },
    { key: 'review', icon: <FiSearch /> },
    { key: 'ownership', icon: <FiShield /> },
  ];

  return (
    <section id="ai-skills" className="section">
      <div className="container-page">
        <SectionTitle
          title={t('ai_skills.title')}
          subtitle={t('ai_skills.subtitle')}
          index="03"
          intro={t('ai_skills.intro')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => (
            <article key={card.key} className="glass-card card-hover p-6 flex flex-col">
              <span
                className="w-11 h-11 rounded-chip glass-1 flex items-center justify-center text-lg text-accent mb-5"
                aria-hidden="true"
              >
                {card.icon}
              </span>
              <h3 className="t-card mb-2.5">{t(`ai_skills.${card.key}_title`)}</h3>
              <p className="t-body">{t(`ai_skills.${card.key}_desc`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISkills;
