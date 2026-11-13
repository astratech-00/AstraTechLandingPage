import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import mascotSrc from '../../assets/mascote-2-svg.svg';

const FLOAT_DURATION = 6;

type MascotProps = {
  className?: string;
  /** Espelha o mascote (para "espiar" do lado oposto). */
  flip?: boolean;
  /** Rotação base em graus. */
  tilt?: number;
  alt?: string;
};

/**
 * Mascote leve, para seções secundárias: só flutua devagar (transform).
 * Decorativo por padrão (alt vazio) para não repetir a descrição do Hero.
 */
export function MascotPeek({ className = '', flip = false, tilt = 0, alt = '' }: MascotProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden={alt ? undefined : true}
      className={className}
      style={{ rotate: tilt, scaleX: flip ? -1 : 1 }}
      animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: FLOAT_DURATION, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img
        src={mascotSrc}
        alt={alt}
        draggable={false}
        width={116}
        height={155}
        className="block h-auto w-full select-none"
      />
    </motion.div>
  );
}

/**
 * Mascote do Hero: chega voando, flutua, inclina na direção do cursor e
 * pode ser arrastado (volta com efeito mola). Seguir/arrastar só em ponteiro
 * fino (desktop) e sem reduced-motion; no celular fica só flutuando.
 */
export function MascotHero({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 60, damping: 14, mass: 0.8 };
  const followX = useSpring(useTransform(pointerX, [-1, 1], [-24, 24]), spring);
  const followY = useSpring(useTransform(pointerY, [-1, 1], [-16, 16]), spring);
  const followRotate = useSpring(useTransform(pointerX, [-1, 1], [-8, 8]), spring);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    setFinePointer(true);

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const onMove = (e: PointerEvent) => {
      const el = areaRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      pointerX.set(clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      pointerY.set(clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [reduceMotion, pointerX, pointerY]);

  return (
    <div ref={areaRef} className={className}>
      {/* 1) Entrada: voa de baixo/direita, passa do ponto e se acomoda */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 160, y: 200, rotate: 30, scale: 0.5 }}
        animate={{
          opacity: 1,
          x: [160, -20, 8, 0],
          y: [200, -50, 8, 0],
          rotate: [30, -10, 4, 0],
          scale: [0.5, 1.05, 0.99, 1],
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 1.6,
                times: [0, 0.55, 0.8, 1],
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.4 },
              }
        }
      >
        {/* 2) Arrastável com retorno em mola */}
        <motion.div
          drag={finePointer}
          dragSnapToOrigin
          dragElastic={0.35}
          dragTransition={{ bounceStiffness: 120, bounceDamping: 10 }}
          whileDrag={{ scale: 1.06 }}
          className={finePointer ? 'cursor-grab active:cursor-grabbing' : undefined}
        >
          {/* 3) Segue o cursor */}
          <motion.div style={{ x: followX, y: followY, rotate: followRotate }}>
            {/* 4) Flutuação em gravidade zero */}
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -18, -6, 0], rotate: [0, -2.5, 2, 0] }
              }
              transition={{
                duration: FLOAT_DURATION,
                times: [0, 0.3, 0.65, 1],
                delay: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img
                src={mascotSrc}
                alt="Mascote da Astra Tech: um robô astronauta de capacete preto flutuando"
                draggable={false}
                width={116}
                height={155}
                className="block h-auto w-full select-none pointer-events-none"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
