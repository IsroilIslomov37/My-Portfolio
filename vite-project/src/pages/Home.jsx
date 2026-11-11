import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import AISkills from '../components/AISkills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

/*
 * Секции видны сразу, без появления при прокрутке: контент, скрытый до
 * прокрутки, не видят расширения вроде Swarm Rebuild, которыми записывают
 * видео сайта. Вертикальный ритм задают сами секции (класс .section).
 */
const Home = () => (
  <>
    <div id="home">
      <Hero />
    </div>
    <About />
    <Skills />
    <AISkills />
    <Projects />
    <Contact />
  </>
);

export default Home;
