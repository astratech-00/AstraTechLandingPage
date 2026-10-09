import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import betina from '../../assets/projects/betina.jpg';
import apollo from '../../assets/projects/apollo.jpg';
import aleson from '../../assets/projects/aleson.jpg';
import carla from '../../assets/projects/carla.jpg';
import cooktimeTimers from '../../assets/projects/cooktime-timers.webp';
import cooktimeHome from '../../assets/projects/cooktime-home.webp';
import './projects.css';

const projects = [
  { name: 'Betina', category: 'Aplicativo · Saúde e bem-estar', description: 'Uma rotina de saúde mais simples, com alimentação, hidratação, exercícios e lembretes em um só lugar.', image: betina, url: 'https://betina-app.com/', domain: 'betina-app.com' },
  { name: 'Apollo Leads', category: 'Sistema web · Inteligência de mercado', description: 'Plataforma para analisar a concorrência local e descobrir oportunidades de negócio com base em dados.', image: apollo, url: 'https://apolloleads.com.br/', domain: 'apolloleads.com.br' },
  { name: 'Aleson Estevam', category: 'Landing page · Portfólio de design', description: 'Um espaço para apresentar projetos de design gráfico, UX/UI e vídeo com a personalidade do profissional.', image: aleson, url: 'https://alesonestevam.com/', domain: 'alesonestevam.com' },
  { name: 'Carla Muniz', category: 'Landing page · Site profissional', description: 'Apresentação da consultoria de sono infantil, dos atendimentos e de uma abordagem acolhedora para as famílias.', image: carla, url: 'https://carlamuniz.com.br/', domain: 'carlamuniz.com.br' },
];

function renderProject(project: (typeof projects)[number]) {
  return (
            <article key={project.name} className="project-card">
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-preview" aria-label={`Visitar ${project.name} (abre em nova aba)`}>
                <div className="project-browser" aria-hidden="true"><span /><span /><span /><p>{project.domain}</p><ArrowUpRight size={16} /></div>
                <img src={project.image} alt={`Captura da página inicial de ${project.name}`} loading="lazy" width="1440" height="900" />
              </a>
              <div className="project-copy">
                <p className="text-green-400 text-sm mb-2">{project.category}</p>
                <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>
                <p className="text-gray-300 leading-relaxed mb-5">{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">Conhecer {project.name}<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span></a>
                {project.name === 'Betina' && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button type="button" disabled className="project-store-pending">Google Play <span>Em breve</span></button>
                    <button type="button" disabled className="project-store-pending">App Store <span>Em breve</span></button>
                  </div>
                )}
              </div>
            </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="projects-section py-20" aria-labelledby="projects-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 sm:mb-16">
          <h2 id="projects-title" className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-400 mb-6">Projetos realizados</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Ideias que saíram do papel. Conheça alguns dos sites e aplicativos que desenvolvemos na Astra Tech.</p>
        </header>

        <div className="projects-grid">
          {projects.slice(0, 1).map(renderProject)}
          <article className="project-card">
            <div className="project-preview">
              <div className="project-browser" aria-hidden="true"><span /><span /><span /><p>CookTime · Android e iOS</p></div>
              <div className="cooktime-screens">
                <img src={cooktimeHome} alt="Configuração do CookTime para escolher a quantidade de bocas do fogão" loading="lazy" width="314" height="680" />
                <img src={cooktimeTimers} alt="Tela de timers do CookTime para acompanhar o tempo de preparo" loading="lazy" width="314" height="680" />
              </div>
            </div>
            <div className="project-copy">
              <p className="text-green-400 text-sm mb-2">Aplicativo · Android e iOS</p>
              <h3 className="text-2xl font-bold text-white mb-3">CookTime</h3>
              <p className="text-gray-300 leading-relaxed mb-5">Mais tranquilidade na cozinha. Gerencie múltiplos timers e receba alertas para acompanhar o preparo de cada receita.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <a className="project-link" href="https://play.google.com/store/apps/details?id=com.astratech.cooktimeapp&hl=pt_BR" target="_blank" rel="noopener noreferrer">Google Play<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span></a>
                <a className="project-link" href="https://apps.apple.com/br/app/cooktime/id6761033031?l=en-GB" target="_blank" rel="noopener noreferrer">App Store<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span></a>
              </div>
            </div>
          </article>
          {projects.slice(1).map(renderProject)}
        </div>
      </div>
    </section>
  );
}
