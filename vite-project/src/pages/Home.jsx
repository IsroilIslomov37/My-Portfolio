import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import AISkills from '../components/AISkills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="space-y-12 pb-10">
      <div id="home">
        <Hero />
      </div>
      <About />
      <Skills />
      <AISkills />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;