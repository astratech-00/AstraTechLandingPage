import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './ui/ImageWithFallback';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "contato@astratech.com.br"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefone",
      content: "+55 (11) 98765-4321"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localização",
      content: "São Paulo, Brasil"
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
          {/* Floating robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0],
              rotateY: [0, 10, -10, 0],
            } : {}}
            transition={{
              opacity: { duration: 0.8, delay: 0.3 },
              scale: { duration: 0.8, delay: 0.3 },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotateY: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 hidden sm:block"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1751554933476-d029737d58b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHJvYm90JTIwdGVjaG5vbG9neSUyMGdyZWVufGVufDF8fHx8MTc3MTU5MjI4NXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Robot"
              className="w-32 h-32 object-contain drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full -z-10 animate-pulse" />
          </motion.div>

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
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/20 rounded-2xl p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                      placeholder="Conte-nos sobre seu projeto..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
                  >
                    Enviar Mensagem
                    <Send className="w-5 h-5" />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h3>
                  <p className="text-gray-400">
                    Obrigado pelo contato. Retornaremos em breve!
                  </p>
                </motion.div>
              )}
            </div>
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
                  href="mailto:contato@astratech.com.br"
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
          <p>&copy; 2026 Astra Tech. Todos os direitos reservados.</p>
          <p className="mt-2">Desenvolvido com 💚 por Taynara e Thiago</p>
        </motion.div>
      </div>
    </section>
  );
}