import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoVerde from '../../assets/logo-verde-quadrado-arredondado.svg';

const navItems = [
  { label: 'Projetos', id: 'projetos' },
  { label: 'O que fazemos', id: 'servicos' },
  { label: 'Quem somos', id: 'quem-somos' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Link ativo: a seção que ocupa a faixa central da tela
  useEffect(() => {
    const ids = [...navItems.map((i) => i.id), 'contato'];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!('IntersectionObserver' in window) || targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) setActiveId(id);
          else setActiveId((current) => (current === id ? '' : current));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Esc fecha o menu mobile
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const solid = isScrolled || isOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[var(--z-nav)] transition-colors duration-300 ${
        solid ? 'border-b border-line bg-paper' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Principal" className="wrap flex h-[4.5rem] items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <img src={logoVerde} alt="" width={40} height={40} className="h-10 w-10 rounded-[10px]" />
          <span className="text-xl font-extrabold tracking-tight text-ink">Astra Tech</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? 'true' : undefined}
                className={`py-2 font-semibold text-ink underline-offset-8 decoration-2 hover:underline ${
                  activeId === item.id ? 'underline' : ''
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contato"
              className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 font-semibold text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              Fale com a gente
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
        >
          {isOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </nav>

      {isOpen && (
        <div id="menu-mobile" className="border-t border-line bg-paper md:hidden">
          <ul className="wrap flex flex-col py-3">
            {[...navItems, { label: 'Contato', id: 'contato' }].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  className="flex min-h-12 items-center text-2xl font-extrabold tracking-tight text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
