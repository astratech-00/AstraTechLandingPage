import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { MascotPeek } from './Mascot';

const contactInfo = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'tech.astra00@gmail.com',
    href: 'mailto:tech.astra00@gmail.com',
  },
  {
    Icon: Phone,
    label: 'Telefone',
    value: '+55 (61) 98235-7258',
    href: 'tel:+5561982357258',
  },
  {
    Icon: MapPin,
    label: 'Onde estamos',
    value: 'Brasília, Brasil',
  },
];

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="relative scroll-mt-16 overflow-hidden bg-brand py-20 text-ink md:py-28"
    >
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <h2 id="contato-titulo" className="text-title">
            Bora conversar?
          </h2>
          <p className="text-lead mt-5 max-w-[34ch] font-medium">
            Conta a ideia, mesmo que ela ainda esteja no guardanapo. A gente responde por email.
          </p>

          <ul className="mt-10 space-y-6">
            {contactInfo.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-paper"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="break-all text-xl font-extrabold underline decoration-2 underline-offset-4 hover:decoration-4"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-xl font-extrabold">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:pt-10">
          {/* O mascote espia por trás do formulário */}
          <MascotPeek
            tilt={-8}
            className="pointer-events-none absolute -top-14 right-6 z-0 w-20 sm:w-24 lg:-top-6 lg:right-10 lg:w-28"
          />
          <div className="relative z-[var(--z-content)]">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
