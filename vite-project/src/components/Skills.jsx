import { Card, Progress } from 'antd';
import SectionTitle from './SectionTitle';
import { 
  SiReact, SiTypescript, SiJavascript, SiTailwindcss, 
  SiGit, SiVercel, SiFigma 
} from 'react-icons/si';
import { FaHtml5, FaCss3Alt, FaRobot } from 'react-icons/fa6';

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', percent: 90, icon: <SiReact className="text-cyan-400" /> },
      { name: 'JavaScript', percent: 92, icon: <SiJavascript className="text-yellow-400" /> },
      { name: 'TypeScript', percent: 80, icon: <SiTypescript className="text-blue-500" /> },
      { name: 'Tailwind CSS', percent: 88, icon: <SiTailwindcss className="text-sky-400" /> },
      { 
        name: 'HTML5 / CSS3', 
        percent: 95, 
        icon: (
          <div className="flex items-center gap-1">
            <FaHtml5 className="text-orange-500" />
            <FaCss3Alt className="text-blue-500" />
          </div>
        ) 
      },
    ],
  },
  {
    title: 'Tools & Ecosystem',
    skills: [
      { name: 'Git & GitHub', percent: 88, icon: <SiGit className="text-red-500" /> },
      { name: 'Vercel Deployment', percent: 90, icon: <SiVercel className="text-white" /> },
      { name: 'OpenAI API Integration', percent: 82, icon: <FaRobot className="text-emerald-400" /> },
      { name: 'Figma (UI/UX)', percent: 78, icon: <SiFigma className="text-pink-400" /> },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto">
      <SectionTitle title="Technical Skills" subtitle="Technologies & Tools I Use" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <div key={idx}>
            <Card
              title={
                <span className="text-xl font-bold text-white tracking-wide">
                  {category.title}
                </span>
              }
              bordered={false}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-white shadow-xl"
              styles={{
                header: { borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px 24px' },
                body: { padding: '24px' }
              }}
            >
              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="text-gray-200">{skill.name}</span>
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
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;