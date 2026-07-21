import { Card, Tag } from 'antd';
import SectionTitle from './SectionTitle';
import { FaGithub, FaUpRightFromSquare } from 'react-icons/fa6';

const projectsList = [
  {
    title: 'Clothes Shop',
    description: 'Modern E-commerce frontend application featuring product filtering, interactive cart management, and seamless layout built with React.',
    tags: ['React', 'Tailwind CSS', 'Axios', 'JSON Server'],
    github: 'https://github.com/IsroilIslomov37',
    demo: '#',
  },
  {
    title: 'Weather Project',
    description: 'Dynamic weather forecasting web application providing real-time meteorological data and detailed weather metrics using API integration.',
    tags: ['JavaScript', 'Fetch API', 'Tailwind CSS', 'Weather API'],
    github: 'https://github.com/IsroilIslomov37',
    demo: '#',
  },
  {
    title: 'Contact App',
    description: 'Full-featured contact management web interface allowing users to create, search, edit, and filter contact records in real time.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'JSON Server'],
    github: 'https://github.com/IsroilIslomov37',
    demo: '#',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      <SectionTitle title="Featured Projects" subtitle="What I've Built" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectsList.map((project, idx) => (
          <Card
            key={idx}
            bordered={false}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-white hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
            styles={{ body: { padding: '24px' } }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tIdx) => (
                  <Tag key={tIdx} color="purple" className="border-none bg-purple-500/20 text-purple-300 px-3 py-1 rounded-md text-xs">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <FaGithub /> Code
              </a>
              {project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <FaUpRightFromSquare /> Demo
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;