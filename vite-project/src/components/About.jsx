import { Card } from 'antd';
import SectionTitle from './SectionTitle';
import { FaCode, FaGraduationCap, FaLaptopCode, FaCircleCheck } from 'react-icons/fa6';

const About = () => {
  const stats = [
    { icon: <FaCode className="text-cyan-400 text-3xl" />, title: 'Age', value: '15 Years Old' },
    { icon: <FaGraduationCap className="text-purple-400 text-3xl" />, title: 'Experience', value: '2+ Years Studying' },
    { icon: <FaLaptopCode className="text-emerald-400 text-3xl" />, title: 'Main Focus', value: 'Frontend & AI' },
  ];

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
      <SectionTitle title="About Me" subtitle="My Journey & Values" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Карточки статистики */}
        <div className="flex flex-col gap-4 justify-between">
          {stats.map((stat, idx) => (
            <Card 
              key={idx}
              bordered={false} 
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-white shadow-lg"
            >
              <div className="flex items-center gap-4">
                {stat.icon}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.title}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Текст био */}
        <div className="lg:col-span-2">
          <Card 
            bordered={false} 
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-white h-full p-2 md:p-4"
          >
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              I am an aspiring web developer who enjoys creating modern websites and learning JavaScript, HTML, and CSS. 
              I have hands-on experience working with tools and libraries like GitHub, Vercel, JSON Server, Fetch, and Axios, 
              and I am constantly developing my skills and improving my knowledge.
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              In my work, I value practical implementation, continuous learning, and finding clean, effective solutions to frontend challenges.
            </p>

            <div className="border-t border-white/10 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FaCircleCheck className="text-cyan-400" /> Continuous Learning
              </div>
              <div className="flex items-center gap-2">
                <FaCircleCheck className="text-cyan-400" /> Modern Web Technologies
              </div>
              <div className="flex items-center gap-2">
                <FaCircleCheck className="text-cyan-400" /> API & Data Integration
              </div>
              <div className="flex items-center gap-2">
                <FaCircleCheck className="text-cyan-400" /> Effective Problem Solving
              </div>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default About;