import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import AISkills from '../components/AISkills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Reveal from '../components/Reveal';

const Home = () => {
  return (
    <div className="space-y-12 pb-10">
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
    </div>
  );
};

export default Home;