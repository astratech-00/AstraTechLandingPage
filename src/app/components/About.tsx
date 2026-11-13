import React from 'react';
import { FolderIcon, Github, LinkedinIcon, Mail } from 'lucide-react';
import taynara from '../../assets/taynara.jpeg';
import thiago from '../../assets/thiago.jpeg';

const founders = [
  {
    name: 'Taynara Muniz',
    role: 'Cofundadora · UX/UI',
    image: taynara,
    imageAlt: 'Retrato de Taynara Muniz',
    bio: 'Especialista em Experiência do Usuário e também em análise de requisitos. Conecta o que o negócio precisa ao que a pessoa do outro lado da tela quer: pesquisa, fluxos e design de interfaces. Atua hoje na AGU – Advocacia-Geral da União.',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taynaramuniz/', Icon: LinkedinIcon },
      { label: 'Portfólio', href: 'https://taynaramuniz.webflow.io/', Icon: FolderIcon },
      { label: 'Email', href: 'mailto:taynaramunizg@gmail.com', Icon: Mail },
    ],
  },
  {
    name: 'Thiago Lago',
    role: 'Cofundador · Desenvolvimento',
    image: thiago,
    imageAlt: 'Retrato de Thiago Lago',
    bio: 'Engenheiro de Software Sênior, com mais de 8 anos de experiência. Já construiu e modernizou sistemas escaláveis em governo, automotivo e financeiro, e lidera tecnicamente o que desenvolve. Atua hoje na AGU – Advocacia-Geral da União.',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thiagolago/', Icon: LinkedinIcon },
      { label: 'GitHub', href: 'https://github.com/thiagolago1', Icon: Github },
      { label: 'Email', href: 'mailto:thiagolago1@gmail.com', Icon: Mail },
    ],
  },
];

export function About() {
  return (
    <section
      id="quem-somos"
      aria-labelledby="quem-somos-titulo"
      className="scroll-mt-16 bg-paper py-20 md:py-28"
    >
      <div className="wrap">
        <h2
          id="quem-somos-titulo"
          className="max-w-[18ch] text-[clamp(2.25rem,1.3rem+4vw,4.75rem)] leading-[1] tracking-[-0.035em]"
        >
          Taynara desenha. Thiago programa. <span className="text-brand-ink">Os dois respondem pelo resultado.</span>
        </h2>

        <p className="text-lead mt-8 max-w-[46ch] text-ink-soft">
          A Astra Tech é uma empresa independente e pequena de propósito: quem conversa com você é quem faz, do primeiro rascunho ao app na loja.
        </p>

        <ul className="mt-16 grid gap-x-12 gap-y-16 md:mt-24 lg:grid-cols-2">
          {founders.map((f, i) => (
            <li key={f.name} className={i === 1 ? 'lg:mt-24' : ''}>
              <article className="grid gap-6 sm:grid-cols-[minmax(0,13rem)_1fr] sm:items-start lg:grid-cols-1 xl:grid-cols-[minmax(0,15rem)_1fr]">
                <div className="relative max-w-[15rem]">
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-brand ${
                      i === 1 ? '-rotate-3' : 'rotate-3'
                    }`}
                  />
                  <img
                    src={f.image}
                    alt={f.imageAlt}
                    width={960}
                    height={1280}
                    loading="lazy"
                    decoding="async"
                    className="relative aspect-[4/5] w-full rounded-[2rem] border-2 border-ink object-cover object-top"
                  />
                </div>

                <div>
                  <h3 className="text-3xl font-extrabold">{f.name}</h3>
                  <p className="mt-1 font-semibold text-brand-ink">{f.role}</p>
                  <p className="mt-4 max-w-[46ch] text-ink-soft">{f.bio}</p>
                  <ul className="mt-6 flex gap-3">
                    {f.links.map(({ label, href, Icon }) => {
                      const external = href.startsWith('http');
                      return (
                        <li key={label}>
                          <a
                            href={href}
                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            aria-label={`${label} de ${f.name}${external ? ' (abre em nova aba)' : ''}`}
                            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
                          >
                            <Icon aria-hidden="true" className="h-5 w-5" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
