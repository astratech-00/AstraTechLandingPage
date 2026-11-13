import React from 'react';
import logoVerde from '../../assets/logo-verde-quadrado-arredondado.svg';

export function Footer() {
  return (
    <footer className="bg-ink py-10 text-paper">
      <div className="wrap flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={logoVerde} alt="" width={36} height={36} className="h-9 w-9 rounded-[9px]" />
          <span className="text-lg font-extrabold tracking-tight">Astra Tech</span>
        </a>
        <p className="text-[0.9375rem] text-paper/80">
          &copy; {new Date().getFullYear()} Astra Tech. Feito por pessoas que gostam de colocar ideias no ar.
        </p>
      </div>
    </footer>
  );
}
