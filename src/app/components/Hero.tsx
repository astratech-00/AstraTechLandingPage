import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ui/ImageWithFallback';
import React from 'react';

const mascote2 = new URL('../../assets/mascote-2-svg.svg', import.meta.url).href;

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-start md:items-start lg:items-center justify-center relative overflow-hidden pt-32 md:pt-24 lg:pt-0 scroll-mt-32 md:scroll-mt-24 lg:scroll-mt-0"
    >
      {/* Animated Background with 3D Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-950">
        {/* Large blurred 3D spheres */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-green-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-40 left-20 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-green-400/10 rounded-full blur-[90px]"
        />

        {/* Floating 3D geometric shapes with blur */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            rotateZ: [0, 180, 360],
            rotateX: [0, 90, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 left-[15%] w-32 h-32 bg-gradient-to-br from-green-400/30 to-emerald-600/30 rounded-3xl backdrop-blur-sm border border-green-400/20 shadow-2xl shadow-green-500/30"
          style={{ 
            transformStyle: 'preserve-3d',
            filter: 'blur(2px)'
          }}
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            rotateY: [0, 180, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-60 right-[20%] w-40 h-40 bg-gradient-to-br from-emerald-400/25 to-green-600/25 rounded-full backdrop-blur-sm border border-emerald-400/20 shadow-2xl shadow-emerald-500/30"
          style={{ 
            transformStyle: 'preserve-3d',
            filter: 'blur(3px)'
          }}
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotateZ: [0, -90, 0],
            rotateY: [0, 180, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-[10%] w-24 h-24 bg-gradient-to-br from-green-500/35 to-green-700/35 rounded-2xl backdrop-blur-sm border border-green-500/25 shadow-2xl shadow-green-500/40"
          style={{ 
            transformStyle: 'preserve-3d',
            filter: 'blur(1.5px)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-left lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Inovação Tecnológica</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-green-100 to-green-400 bg-clip-text text-transparent">
                Astra Tech
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-xl"
            >
              Transformando ideias em soluções tecnológicas inovadoras
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(34, 197, 94, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Comece seu projeto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-green-500 text-green-400 rounded-full font-semibold hover:bg-green-500/10 transition-colors cursor-pointer backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Conheça nossos serviços
              </motion.a>
            </motion.div>
          </div>

          {/* Right side - 3D Robot */}
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Main Robot with dramatic 3D effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: -45 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateY: 0,
                y: [0, -20, 0],
              }}
              transition={{
                opacity: { duration: 1, delay: 0.3 },
                scale: { duration: 1, delay: 0.3 },
                rotateY: { duration: 1, delay: 0.3 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative z-20"
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1200px'
              }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 10, -10, 0],
                  rotateX: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 15,
                  transition: { duration: 0.4 }
                }}
                className="relative cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ImageWithFallback
                  src={mascote2}
                  alt="Astra Tech Robot"
                  className="w-[400px] h-[400px] sm:w-[400px] sm:h-[400px] object-contain drop-shadow-[0_35px_70px_rgba(34,197,94,0.5)]"
                  style={{
                    filter: 'drop-shadow(0 0 80px rgba(34, 197, 94, 0.4))'
                  }}
                />

                {/* Glowing base platform */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-green-500/40 blur-3xl rounded-full"
                />

                {/* Orbiting rings */}
                <motion.div
                  animate={{
                    rotateZ: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotateZ: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 border-2 border-green-400/30 rounded-full"
                  style={{
                    transform: 'translateZ(-30px) scale(1.2)',
                    transformStyle: 'preserve-3d'
                  }}
                />
                <motion.div
                  animate={{
                    rotateZ: -360,
                    scale: [1.1, 1, 1.1],
                  }}
                  transition={{
                    rotateZ: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 border-2 border-emerald-400/20 rounded-full scale-150"
                  style={{ 
                    transform: 'translateZ(-50px) scale(1.4)',
                    transformStyle: 'preserve-3d'
                  }}
                />
                
                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -100, 0],
                      x: [0, Math.sin(i) * 50, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                    className="absolute w-2 h-2 bg-green-400 rounded-full blur-sm"
                    style={{
                      left: `${50 + Math.cos(i * 45) * 40}%`,
                      top: `${50 + Math.sin(i * 45) * 40}%`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Additional floating elements around robot */}
            <motion.div
              animate={{
                y: [0, -30, 0],
                rotateZ: [0, 180, 360],
                rotateY: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-green-400/40 to-green-600/40 rounded-2xl backdrop-blur-sm border border-green-400/30 shadow-2xl shadow-green-500/40"
              style={{ 
                transformStyle: 'preserve-3d',
                filter: 'blur(1px)'
              }}
            />
            <motion.div
              animate={{
                y: [0, 40, 0],
                rotateX: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-32 right-10 w-16 h-16 bg-gradient-to-br from-emerald-400/40 to-emerald-600/40 rounded-full backdrop-blur-sm border border-emerald-400/30 shadow-2xl shadow-emerald-500/40"
              style={{ 
                transformStyle: 'preserve-3d',
                filter: 'blur(1px)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}