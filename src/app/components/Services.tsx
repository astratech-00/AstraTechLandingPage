import React from 'react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Aplicativos',
    outcome: 'Seu app nas lojas, para iPhone e Android.',
  },
  {
    title: 'Sites e landing pages',
    outcome: 'Sites rápidos, bonitos e fáceis de achar no Google.',
  },
  {
    title: 'Sistemas web',
    outcome: 'Painéis, APIs e integrações feitas sob medida para o seu negócio.',
  },
  {
    title: 'Design de interfaces',
    outcome: 'Telas pensadas com quem vai usar, do protótipo ao design system.',
  },
];

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-titulo"
      className="scroll-mt-16 bg-brand-tint py-20 md:py-28"
    >
      <div className="wrap">
        <header className="max-w-3xl">
          <h2 id="servicos-titulo" className="text-title">
            O que a gente faz
          </h2>
          <p className="text-lead mt-5 max-w-[40ch] text-ink-soft">
            Quatro frentes, e a mesma dupla do começo ao fim. Escolha a que mais se parece com a sua ideia.
          </p>
        </header>

        <ul className="mt-12 border-t border-ink/20 md:mt-16">
          {services.map((s) => (
            <li key={s.title} className="border-b border-ink/20">
              <a
                href="#contato"
                className="group -mx-4 grid items-center gap-x-10 gap-y-3 rounded-2xl px-4 py-8 transition-colors duration-200 hover:bg-brand md:-mx-6 md:grid-cols-[1fr_1.15fr_auto] md:px-6 md:py-10"
              >
                <h3 className="text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] font-extrabold leading-[1.05]">
                  {s.title}
                </h3>
                <div>
                  <p className="text-lg font-medium">{s.outcome}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 [transition-timing-function:var(--ease-out-quart)] group-hover:translate-x-1 md:flex"
                >
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="sr-only">Conversar sobre {s.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
