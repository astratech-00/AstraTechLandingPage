import React from 'react';
import { ArrowDown } from 'lucide-react';
import { MascotHero } from './Mascot';

/* Estrelas de 4 pontas: [top %, left %, tamanho px, atraso s] */
const stars: Array<[number, number, number, number]> = [
  [18, 8, 14, 0],
  [30, 46, 10, 1.2],
  [12, 62, 18, 0.6],
  [58, 4, 10, 2.1],
  [72, 40, 14, 0.9],
  [22, 90, 12, 1.8],
  [78, 84, 16, 0.3],
  [48, 70, 8, 2.4],
];

function Star({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path d="M12 0c.8 6.6 5.4 11.2 12 12-6.6.8-11.2 5.4-12 12-.8-6.6-5.4-11.2-12-12C6.6 11.2 11.2 6.6 12 0z" fill="currentColor" />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand pb-16 pt-28 text-ink md:pb-20 md:pt-32"
    >
      {/* Fundo: estrelinhas (só opacidade) e uma órbita lenta */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {stars.map(([top, left, size, delay], i) => (
          <span
            key={i}
            className="twinkle absolute text-paper opacity-40"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animation: `twinkle 4s ease-in-out ${delay}s infinite`,
            }}
          >
            <Star size={size} />
          </span>
        ))}
      </div>

      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
        <div>
          <h1 className="text-display font-extrabold">
            <span className="block">Você tem a ideia.</span>
            <span className="block">
              A gente{' '}
              <span className="whitespace-nowrap [background:linear-gradient(var(--paper),var(--paper))_0_92%/100%_0.16em_no-repeat]">
                põe no ar.
              </span>
            </span>
          </h1>

          <p className="text-lead mt-7 max-w-[34ch] font-medium sm:max-w-[40ch]">
            A Astra Tech desenha e programa apps, sites e sistemas, do primeiro rascunho à loja de aplicativos.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#projetos"
              className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-7 text-lg font-bold text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              Ver o que já está no ar
              <ArrowDown
                aria-hidden="true"
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contato"
              className="inline-flex min-h-11 items-center text-lg font-bold underline decoration-2 underline-offset-[6px] hover:decoration-4"
            >
              Falar com a gente
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[22rem] items-center justify-center py-6 sm:max-w-[26rem] lg:max-w-none">
          {/* Órbita: anel fino com um "planeta", gira devagar atrás do mascote */}
          <div
            aria-hidden="true"
            className="orbit pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink/15"
            style={{ animation: 'orbit 70s linear infinite' }}
          >
            <span className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper/35"
          />
          <MascotHero className="relative z-[var(--z-mascot)] w-[68%] sm:w-[62%]" />
        </div>
      </div>
    </section>
  );
}
