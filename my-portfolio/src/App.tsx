
import { Layout } from './components/layout/Layout';
import { Hero } from './views/Hero';
import { About } from './views/About';
import { Projects } from './views/Projects';
import { Contact } from './views/Contact';

function App() {
  return (
    <Layout>
      <section id="stack">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </Layout>
  );
}

export default App;
