import { Progress } from 'antd';
import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
// 1. Убери SiOpenai из 'react-icons/si'
import { 
  SiReact, 
  SiJavascript, 
  SiTypescript, 
  SiTailwindcss, 
  SiHtml5, 
  SiGit, 
  SiVercel, 
  SiFigma 
} from 'react-icons/si';

// 2. Импортируй OpenAI из 'react-icons/ri'
import { RiOpenaiFill } from 'react-icons/ri';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      titleKey: 'skills.cat_frontend',
      skills: [
        { name: 'React', percent: 90, icon: <SiReact className="text-cyan-400" /> },
        { name: 'JavaScript', percent: 92, icon: <SiJavascript className="text-yellow-400" /> },
        { name: 'TypeScript', percent: 80, icon: <SiTypescript className="text-blue-500" /> },
        { name: 'Tailwind CSS', percent: 88, icon: <SiTailwindcss className="text-sky-400" /> },
        { name: 'HTML5 / CSS3', percent: 95, icon: <SiHtml5 className="text-orange-500" /> },
      ],
    },
    {
      titleKey: 'skills.cat_tools',
      skills: [
        { name: 'Git & GitHub', percent: 88, icon: <SiGit className="text-red-500" /> },
        { name: 'Vercel Deployment', percent: 90, icon: <SiVercel className="text-white" /> },
        { name: 'OpenAI API Integration', percent: 82, icon: <RiOpenaiFill className="text-emerald-400" /> },
        { name: 'Figma (UI/UX)', percent: 78, icon: <SiFigma className="text-purple-400" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto">
      <SectionTitle title={t('skills.title')} subtitle={t('skills.subtitle')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {skillCategories.map((category, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">
              {t(category.titleKey)}
            </h3>

            <div className="space-y-6">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{skill.icon}</span>
                      <span className="text-gray-200 font-semibold">{skill.name}</span>
                    </div>
                    <span className="text-gray-400 font-mono">{skill.percent}%</span>
                  </div>
                  <Progress
                    percent={skill.percent}
                    showInfo={false}
                    strokeColor={{
                      '0%': '#3b82f6',
                      '100%': '#8b5cf6',
                    }}
                    trailColor="rgba(255, 255, 255, 0.08)"
                    strokeWidth={8}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;