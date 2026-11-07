import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ui/ImageWithFallback';
import React, { useEffect, useRef, useState } from 'react';

const mascote2 = new URL('../../assets/mascote-2-svg.svg', import.meta.url).href;

const ENTRY_DURATION = 1.8;
const FLOAT_DURATION = 6;

export function Hero() {
  const reduceMotion = useReducedMotion();

  // Robô segue o mouse: posição normalizada (-1..1) do cursor em relação ao centro do robô
  const robotAreaRef = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springCfg = { stiffness: 60, damping: 14, mass: 0.8 };
  const followX = useSpring(useTransform(pointerX, [-1, 1], [-28, 28]), springCfg);
  const followY = useSpring(useTransform(pointerY, [-1, 1], [-20, 20]), springCfg);
  const followRotate = useSpring(useTransform(pointerX, [-1, 1], [-10, 10]), springCfg);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    setFinePointer(true);
    const onMove = (e: PointerEvent) => {
      const el = robotAreaRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      pointerX.set(clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      pointerY.set(clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
    };
    const onLeave = () => { pointerX.set(0); pointerY.set(0); };
    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [reduceMotion, pointerX, pointerY]);

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

          {/* Right side - Robot: entrada com voo e depois flutuação contínua */}
          <div ref={robotAreaRef} className="relative h-[600px] flex items-center justify-center">
            {/* Anéis orbitais (ficam parados enquanto o robô flutua) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, rotateZ: reduceMotion ? 0 : 360 }}
              transition={{
                opacity: { duration: 1.2, delay: 0.4 },
                scale: { duration: 1.2, delay: 0.4 },
                rotateZ: { duration: 40, repeat: Infinity, ease: 'linear' },
              }}
              className="absolute w-[480px] h-[480px] max-w-[90vw] max-h-[90vw] border-2 border-green-400/25 rounded-full pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.6 }}
              className="absolute w-[300px] h-[300px] border border-emerald-400/20 rounded-full pointer-events-none"
            />

            {/* Brilho de fundo */}
            <motion.div
              animate={reduceMotion ? undefined : { opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: FLOAT_DURATION, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-72 h-72 bg-green-500/30 blur-[90px] rounded-full pointer-events-none"
            />

            {/* Sombra no "chão": aparece quando o robô chega e encolhe quando ele sobe, dando sensação de altura */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: reduceMotion ? 0 : ENTRY_DURATION * 0.7 }}
              className="absolute bottom-20 left-1/2 -ml-24 w-48 h-6 pointer-events-none"
            >
              <motion.div
                animate={reduceMotion ? undefined : { scaleX: [1, 0.7, 0.88, 1], opacity: [0.55, 0.28, 0.42, 0.55] }}
                transition={{ duration: FLOAT_DURATION, times: [0, 0.3, 0.65, 1], delay: ENTRY_DURATION, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-green-400/70 blur-xl rounded-[50%]"
              />
            </motion.div>

            {/* 1) Entrada: o robô chega voando de baixo/direita, passa do ponto e se acomoda */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 220, y: 260, rotate: 35, scale: 0.4 }}
              animate={{
                opacity: 1,
                x: [220, -30, 12, 0],
                y: [260, -70, 10, 0],
                rotate: [35, -14, 6, 0],
                scale: [0.4, 1.08, 0.98, 1],
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: ENTRY_DURATION,
                      times: [0, 0.55, 0.8, 1],
                      ease: [0.22, 1, 0.36, 1],
                      opacity: { duration: 0.4 },
                    }
              }
              className="relative z-20"
            >
              {/* 2) Arrastável: dá para puxar o robô; ao soltar ele volta com efeito mola */}
              <motion.div
                drag={finePointer}
                dragSnapToOrigin
                dragElastic={0.35}
                dragTransition={{ bounceStiffness: 120, bounceDamping: 10 }}
                whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
                className={finePointer ? 'cursor-grab' : undefined}
              >
              {/* 3) Segue o mouse: inclina e desliza levemente na direção do cursor */}
              <motion.div style={{ x: followX, y: followY, rotate: followRotate }}>
              {/* 4) Flutuação: sobe e desce devagar, com leve balanço, como em gravidade zero */}
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -22, -8, 0],
                        rotate: [0, -3, 2.5, 0],
                        x: [0, 4, -3, 0],
                      }
                }
                transition={{
                  duration: FLOAT_DURATION,
                  times: [0, 0.3, 0.65, 1],
                  delay: ENTRY_DURATION,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={reduceMotion ? undefined : { scale: 1.05, transition: { type: 'spring', stiffness: 200, damping: 14 } }}
                className="relative"
              >
                <ImageWithFallback
                  src={mascote2}
                  alt="Mascote da Astra Tech, um robô astronauta flutuando"
                  draggable={false}
                  className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] object-contain select-none pointer-events-none"
                  style={{ filter: 'drop-shadow(0 0 60px rgba(34, 197, 94, 0.35))' }}
                />
              </motion.div>
              </motion.div>
              </motion.div>
            </motion.div>

            {/* Partículas subindo ao redor */}
            {!reduceMotion && [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -100, 0], x: [0, Math.sin(i) * 40, 0], opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: ENTRY_DURATION + i * 0.3, ease: 'easeInOut' }}
                className="absolute w-2 h-2 bg-green-400 rounded-full blur-sm pointer-events-none"
                style={{ left: `${50 + Math.cos(i * 45) * 35}%`, top: `${50 + Math.sin(i * 45) * 35}%` }}
              />
            ))}
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