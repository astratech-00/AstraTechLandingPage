import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ImageWithFallback } from './ui/ImageWithFallback';
import React from 'react';
import { ContactForm } from './ContactForm';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "tech.astra00@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefone",
      content: "+55 (61) 98235-7258"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localização",
      content: "Brasília, Brasil"
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Entre em Contato
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Vamos transformar sua ideia em realidade. Entre em contato conosco!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, rotateY: 5 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/20 rounded-2xl p-6 hover:border-green-500/50 transition-all"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/50 flex-shrink-0">
                    <div className="text-white">{info.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                    <p className="text-gray-400">{info.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Additional CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Pronto para começar?
              </h3>
              <p className="text-gray-300 mb-6">
                Estamos ansiosos para conhecer seu projeto e ajudá-lo a alcançar seus objetivos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:tech.astra00@gmail.com"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all"
                >
                  Enviar Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center text-gray-500 border-t border-green-500/10 pt-8"
        >
          <p>&copy; {new Date().getFullYear()} Astra Tech. Todos os direitos reservados.</p>
          <p className="mt-2">Desenvolvido com 💚 por Astra Tech</p>
        </motion.div>
      </div>
    </section>
  );
}