import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Founders } from './components/Founders';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-950">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Founders />
      <Contact />
    </div>
  );
}
