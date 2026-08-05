import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import { 
  FiCpu, FiTerminal, FiDatabase, 
  FiLayers, FiZap, FiGrid, FiSliders 
} from 'react-icons/fi';
import { TbRobot } from 'react-icons/tb';

const AISkills = () => {
  const { t } = useTranslation();

  const aiSkills = [
    {
      title: t('ai_skills.llm_title'),
      description: t('ai_skills.llm_desc'),
      icon: <FiCpu className="text-purple-400 text-3xl" />
    },
    {
      title: t('ai_skills.prompt_title'),
      description: t('ai_skills.prompt_desc'),
      icon: <FiTerminal className="text-purple-400 text-3xl" />
    },
    {
      title: t('ai_skills.rag_title'),
      description: t('ai_skills.rag_desc'),
      icon: <FiDatabase className="text-purple-400 text-3xl" />
    },
    {
      title: t('ai_skills.agents_title'),
      description: t('ai_skills.agents_desc'),
      icon: <TbRobot className="text-purple-400 text-3xl" />
    },
    {
      title: t('ai_skills.langchain_title'),
      description: t('ai_skills.langchain_desc'),
      icon: <FiLayers className="text-purple-400 text-3xl" />
    },
    {
      title: t('ai_skills.openai_title'),
      description: t('ai_skills.openai_desc'),
      icon: <FiZap className="text-purple-400 text-3xl" />
    },
    {
      title: t('ai_skills.vectordb_title'),
      description: t('ai_skills.vectordb_desc'),
      icon: <FiGrid className="text-purple-400 text-3xl" />
    },
    {
      title: t('ai_skills.finetuning_title'),
      description: t('ai_skills.finetuning_desc'),
      icon: <FiSliders className="text-purple-400 text-3xl" />
    }
  ];

  return (
    <section id="ai-skills" className="py-20 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/20 rounded-full blur-[140px] pointer-events-none"></div>

      <SectionTitle title={t('ai_skills.title')} subtitle={t('ai_skills.subtitle')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {aiSkills.map((skill, index) => (
          <div
            key={index}
            className="group relative bg-white/5 border border-purple-500/20 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-purple-400 transition-all duration-300 shadow-md shadow-purple-950">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {skill.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AISkills;
