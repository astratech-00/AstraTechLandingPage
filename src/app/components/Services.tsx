import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Smartphone, Globe, Layout, Server, Database, Palette } from 'lucide-react';
import React from 'react';

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const services = [
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: "Aplicativos Mobile",
      description: "Apps nativos e híbridos para iOS e Android com performance excepcional",
      features: ["React Native", "Expo", "UX/UI Design"]
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Websites",
      description: "Sites modernos, responsivos e otimizados para conversão",
      features: ["React", "Next.js", "Nuxt.js", "Vue.js", "SEO", "Analytics"]
    },
    {
      icon: <Layout className="w-10 h-10" />,
      title: "Sistemas Web",
      description: "Plataformas web completas e escaláveis para seu negócio",
      features: ["Dashboard", "APIs", "Integrações", "Pagamentos"]
    },
    {
      icon: <Server className="w-10 h-10" />,
      title: "Backend & APIs",
      description: "Arquitetura robusta e APIs RESTful para suas aplicações",
      features: ["Node.js", "Cloud", "Docker", "Kubernetes"]
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: "Banco de Dados",
      description: "Modelagem e otimização de bancos de dados relacionais e NoSQL",
      features: ["PostgreSQL", "MongoDB", "Redis"]
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: "UI/UX Design",
      description: "Interfaces intuitivas e experiências memoráveis para seus usuários",
      features: ["Prototipagem", "Design System", "UI/UX"]
    }
  ];

  return (
    <section id="services" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"
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
              Nossos Serviços
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluções tecnológicas completas para transformar suas ideias em realidade
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                rotateX: 5,
                rotateY: 5,
              }}
              className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/50 group-hover:shadow-green-500/80 transition-all group-hover:scale-110">
                  <div className="text-white">{service.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-sm text-green-400"
                    >
                      {feature}
                    </span>
                  ))}
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