import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { LinkedinIcon, Github, Mail, FolderIcon } from 'lucide-react';
import { ImageWithFallback } from './ui/ImageWithFallback';
import React from 'react';

const taynara = new URL('../../assets/taynara.jpeg', import.meta.url).href;
const thiago = new URL('../../assets/thiago.jpeg', import.meta.url).href;


export function Founders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const founders = [
    {
      name: "Taynara Muniz",
      role: "Co-Fundadora & Especialista em UX/UI",
      image: taynara,
      bio: "Especialista em Experiência do Usuário, com atuação também em Análise de Requisitos. A experiência conecta necessidades do negócio e do usuário, com foco na criação de soluções eficientes. Possui experiência em pesquisa, levantamento e análise de necessidades do projeto, construção de fluxos e design de interfaces.",
      linkedin: "https://www.linkedin.com/in/taynaramuniz/",
      portifolio: "https://taynaramuniz.webflow.io/",
      email: "taynaramunizg@gmail.com"
    },
    {
      name: "Thiago Lago",
      role: "Co-Fundador & Desenvolvedor",
      image: thiago,
      bio: "Engenheiro de Software Sênior com mais de 8 anos de experiência em desenvolvimento frontend e mobile, atuando com as tecnologias mais modernas no mercado. Experiência na construção e evolução de sistemas escaláveis em diferentes setores, incluindo governo, automotivo e financeiro. Atuação em liderança técnica, modernização de arquiteturas legadas e desenvolvimento de aplicações web e mobile com foco em performance, qualidade de código e experiência do usuário.",
      linkedin: "https://www.linkedin.com/in/thiagolago/",
      portifolio: "https://github.com/thiagolago1",
      email: "thiagolago1@gmail.com"
    }
  ];

  return (
    <section id="founders" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Nossos Fundadores
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça os profissionais por trás da Astra Tech
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.03,
                rotateY: 5,
              }}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/20 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 -mt-20">
                <h3 className="text-3xl font-bold text-white mb-2">{founder.name}</h3>
                <p className="text-green-400 text-lg mb-4">{founder.role}</p>
                <p className="text-gray-400 mb-6">{founder.bio}</p>

                {/* Social Links */}
                <div className="flex gap-4">
                  {founder.linkedin && (
                    <motion.a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center hover:bg-green-500/20 transition-colors"
                    >
                      <LinkedinIcon className="w-5 h-5 text-green-400" />
                    </motion.a>
                  )}
                  {founder.portifolio && (
                    <motion.a
                      href={founder.portifolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center hover:bg-green-500/20 transition-colors"
                    >
                      {index == 0 ? <FolderIcon className="w-5 h-5 text-green-400" /> : <Github className="w-5 h-5 text-green-400" />}
                    </motion.a>
                  )}
                  {founder.email && (
                    <motion.a
                      href={`mailto:${founder.email}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center hover:bg-green-500/20 transition-colors"
                    >
                      <Mail className="w-5 h-5 text-green-400" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* 3D effect layer */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ transform: 'translateZ(10px)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
