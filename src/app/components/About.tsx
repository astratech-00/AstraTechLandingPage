import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Lightbulb, Rocket } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const values = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Expertise Técnica",
      description: "Domínio das tecnologias mais modernas do mercado"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Inovação",
      description: "Soluções criativas para desafios complexos"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Agilidade",
      description: "Desenvolvimento rápido e eficiente"
    }
  ];

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Sobre a Astra Tech
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Uma empresa independente formada por profissionais apaixonados por tecnologia,
            dedicados a criar soluções digitais que fazem a diferença.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
              }}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/20 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/50 group-hover:shadow-green-500/80 transition-shadow">
                  <div className="text-white">{value.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
