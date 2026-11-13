import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { MascotPeek } from './Mascot';
import betina from '../../assets/projects/betina.jpg';
import apollo from '../../assets/projects/apollo.jpg';
import aleson from '../../assets/projects/aleson.jpg';
import carla from '../../assets/projects/carla.jpg';
import cooktimeHome from '../../assets/projects/cooktime-home.webp';
import cooktimeTimers from '../../assets/projects/cooktime-timers.webp';

const webProjects = [
  {
    name: 'Apollo Leads',
    category: 'Sistema web · Inteligência de mercado',
    description:
      'Plataforma que analisa a concorrência local e mostra oportunidades de negócio com base em dados.',
    image: apollo,
    url: 'https://apolloleads.com.br/',
    domain: 'apolloleads.com.br',
  },
  {
    name: 'Aleson Estevam',
    category: 'Landing page · Portfólio de design',
    description:
      'Um espaço para apresentar projetos de design gráfico, UX/UI e vídeo com a personalidade do profissional.',
    image: aleson,
    url: 'https://alesonestevam.com/',
    domain: 'alesonestevam.com',
  },
  {
    name: 'Carla Muniz',
    category: 'Landing page · Site profissional',
    description:
      'Apresentação da consultoria de sono infantil, dos atendimentos e de uma abordagem acolhedora para as famílias.',
    image: carla,
    url: 'https://carlamuniz.com.br/',
    domain: 'carlamuniz.com.br',
  },
];

function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight aria-hidden="true" className="h-[1.1em] w-[1.1em] shrink-0" />
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

function BrowserFrame({
  src,
  alt,
  domain,
  href,
}: {
  src: string;
  alt: string;
  domain: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visitar ${domain} (abre em nova aba)`}
      className="group block overflow-hidden rounded-2xl border border-ink/15 bg-white shadow-[0_1px_0_0_oklch(0.2_0.02_160/0.08)]"
    >
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-ink/10 bg-white px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
        <span className="ml-3 truncate text-sm font-medium text-ink-soft">{domain}</span>
      </div>
      <img
        src={src}
        alt={alt}
        width={1265}
        height={712}
        loading="lazy"
        decoding="async"
        className="block aspect-[16/9] w-full object-cover object-top transition-transform duration-500 [transition-timing-function:var(--ease-out-quart)] group-hover:scale-[1.03]"
      />
    </a>
  );
}

const pillLink =
  'inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-5 font-bold transition-colors duration-200';

export function Projects() {
  const reduceMotion = useReducedMotion();
  const rise = reduceMotion
    ? {}
    : {
        initial: { y: 36 },
        whileInView: { y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="relative scroll-mt-16 bg-paper py-20 md:py-28">
      <div className="wrap">
        <header className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h2 id="projetos-titulo" className="text-title">
            O que já está no ar
          </h2>
          <p className="text-lead max-w-[38ch] text-ink-soft lg:mr-28">
            Apps nas lojas, um sistema web e sites de profissionais.
          </p>
          <MascotPeek
            tilt={10}
            flip
            className="pointer-events-none absolute -top-4 right-0 hidden w-20 lg:block xl:w-24"
          />
        </header>

        <div className="mt-14 space-y-6 md:mt-20 md:space-y-8">
          {/* Betina */}
          <motion.article
            {...rise}
            className="grid items-center gap-8 rounded-[2rem] bg-brand-tint p-5 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:p-12"
          >
            <BrowserFrame
              src={betina}
              alt="Página inicial do site da Betina, aplicativo de rotina de saúde"
              domain="betina-app.com"
              href="https://betina-app.com/"
            />
            <div>
              <p className="font-semibold text-brand-ink">Aplicativo · Saúde e bem-estar</p>
              <h3 className="mt-2 text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] font-extrabold">Betina</h3>
              <p className="mt-4 max-w-[42ch]">
                Uma rotina de saúde mais simples, com alimentação, hidratação, exercícios e lembretes em um só lugar.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ExternalLink
                  href="https://play.google.com/store/apps/details?id=com.astratech.betina"
                  className={`${pillLink} border-ink bg-ink text-paper hover:bg-transparent hover:text-ink`}
                >
                  Google Play
                </ExternalLink>
                <ExternalLink
                  href="https://apps.apple.com/br/app/betina/id6794507591"
                  className={`${pillLink} border-ink bg-ink text-paper hover:bg-transparent hover:text-ink`}
                >
                  App Store
                </ExternalLink>
                <ExternalLink
                  href="https://betina-app.com/"
                  className="inline-flex min-h-11 items-center gap-2 font-bold text-ink underline decoration-2 underline-offset-4 sm:pl-2"
                >
                  Conhecer o site
                </ExternalLink>
              </div>
            </div>
          </motion.article>

          {/* CookTime */}
          <motion.article
            {...rise}
            className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-ink p-5 text-paper sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-12"
          >
            <div className="order-2 lg:order-1">
              <p className="font-semibold text-brand">Aplicativo · Android e iOS</p>
              <h3 className="mt-2 text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] font-extrabold">CookTime</h3>
              <p className="mt-4 max-w-[42ch] text-paper/85">
                Mais tranquilidade na cozinha. Gerencie vários timers e receba alertas para acompanhar o preparo de cada receita.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ExternalLink
                  href="https://play.google.com/store/apps/details?id=com.astratech.cooktimeapp&hl=pt_BR"
                  className={`${pillLink} border-brand bg-brand text-ink hover:bg-transparent hover:text-brand`}
                >
                  Google Play
                </ExternalLink>
                <ExternalLink
                  href="https://apps.apple.com/br/app/cooktime/id6761033031?l=en-GB"
                  className={`${pillLink} border-brand bg-brand text-ink hover:bg-transparent hover:text-brand`}
                >
                  App Store
                </ExternalLink>
              </div>
            </div>

            <div className="order-1 flex items-end justify-center gap-4 lg:order-2" role="group" aria-label="Telas do aplicativo CookTime">
              <img
                src={cooktimeHome}
                alt="Tela do CookTime para escolher a quantidade de bocas do fogão"
                width={314}
                height={680}
                loading="lazy"
                decoding="async"
                className="aspect-[314/680] w-[40%] max-w-[15rem] -rotate-3 rounded-3xl border border-paper/15 object-cover"
              />
              <img
                src={cooktimeTimers}
                alt="Tela de timers do CookTime para acompanhar o tempo de preparo"
                width={314}
                height={680}
                loading="lazy"
                decoding="async"
                className="aspect-[314/680] w-[40%] max-w-[15rem] translate-y-6 rotate-3 rounded-3xl border border-paper/15 object-cover"
              />
            </div>
          </motion.article>

          {/* Sites e sistema web: escalonados para quebrar a grade */}
          <ul className="grid gap-x-8 gap-y-14 pt-8 md:grid-cols-3 md:pt-12">
            {webProjects.map((p, i) => (
              <li key={p.name} className={i === 1 ? 'md:mt-14' : i === 2 ? 'md:mt-28' : ''}>
                <article>
                  <BrowserFrame
                    src={p.image}
                    alt={`Página inicial de ${p.name}`}
                    domain={p.domain}
                    href={p.url}
                  />
                  <p className="mt-5 text-sm font-semibold text-brand-ink">{p.category}</p>
                  <h3 className="mt-1 text-3xl font-extrabold">{p.name}</h3>
                  <p className="mt-3 text-ink-soft">{p.description}</p>
                  <ExternalLink
                    href={p.url}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold underline decoration-2 underline-offset-4 hover:text-brand-ink"
                  >
                    Conhecer {p.name}
                  </ExternalLink>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
