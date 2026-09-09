import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import AISkills from '../components/AISkills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Reveal from '../components/Reveal';

/*
 * Вертикальный ритм задают сами секции (класс .section). Прежний space-y-12
 * добавлял сверху ещё 48px между обёртками Reveal, из-за чего расстояния
 * между секциями не совпадали с внутренними отступами.
 */
const Home = () => (
  <>
    <div id="home">
      <Hero />
    </div>
    <Reveal>
      <About />
    </Reveal>
    <Reveal>
      <Skills />
    </Reveal>
    <Reveal>
      <AISkills />
    </Reveal>
    <Reveal>
      <Projects />
    </Reveal>
    <Reveal>
      <Contact />
    </Reveal>
  </>
);

export default Home;
