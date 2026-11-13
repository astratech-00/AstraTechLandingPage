import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

const COOLDOWN_MS = 10_000;
const SUCCESS_VISIBLE_MS = 6_000;
const FALLBACK_EMAIL = 'tech.astra00@gmail.com';

type FormData = {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const fieldClass =
  'block w-full rounded-xl border-2 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/70 transition-colors duration-150 focus:border-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-brand';

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    company: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [cooldownNotice, setCooldownNotice] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const cooldownTimeoutRef = useRef<number | null>(null);
  const successTimeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (cooldownTimeoutRef.current) window.clearTimeout(cooldownTimeoutRef.current);
      if (successTimeoutRef.current) window.clearTimeout(successTimeoutRef.current);
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const validate = useCallback((data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Conta pra gente como você se chama.';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Precisamos de um email para responder.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Esse email parece incompleto. Exemplo: nome@empresa.com';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Escreva um pouco sobre a sua ideia, mesmo que seja curto.';
    }

    return newErrors;
  }, []);

  const startCooldown = useCallback(() => {
    setIsCooldown(true);
    if (cooldownTimeoutRef.current) window.clearTimeout(cooldownTimeoutRef.current);
    cooldownTimeoutRef.current = window.setTimeout(() => {
      setIsCooldown(false);
      setCooldownNotice(false);
      cooldownTimeoutRef.current = null;
    }, COOLDOWN_MS);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isCooldown) {
        setCooldownNotice(true);
        return;
      }

      // honeypot preenchido: provavelmente robô, ignora em silêncio
      if (formData.company.trim()) return;

      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        const first = (['name', 'email', 'message'] as const).find((k) => validationErrors[k]);
        if (first) document.getElementById(`contact-${first}`)?.focus();
        return;
      }

      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        console.error('EmailJS: variáveis VITE_EMAILJS_* não configuradas neste build.');
        setSendFailed(true);
        return;
      }

      setIsLoading(true);
      setSendFailed(false);

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            // estes nomes precisam bater com as variáveis do template EmailJS
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          { publicKey: EMAILJS_PUBLIC_KEY }
        );

        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '', company: '' });
        setErrors({});
        startCooldown();

        if (successTimeoutRef.current) window.clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = window.setTimeout(() => {
          setIsSubmitted(false);
        }, SUCCESS_VISIBLE_MS);
      } catch (error) {
        console.error('Erro ao enviar email:', error);
        setSendFailed(true);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, isCooldown, startCooldown, validate]
  );

  const disabled = isLoading || isCooldown;

  return (
    <div className="rounded-[2rem] border-2 border-ink bg-paper p-6 text-ink shadow-[8px_8px_0_0_var(--ink)] sm:p-9">
      {isSubmitted ? (
        <div role="status" className="flex flex-col items-start gap-4 py-8">
          <CheckCircle aria-hidden="true" className="h-14 w-14 text-brand-ink" />
          <h3 className="text-3xl font-extrabold">Mensagem enviada!</h3>
          <p className="max-w-[34ch] text-ink-soft">
            Obrigado pelo contato. A gente lê com carinho e responde por email em breve.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Honeypot: invisível para pessoas, tentador para robôs */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="contact-name" className="mb-2 block font-bold">
              Seu nome
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              placeholder="Como podemos te chamar?"
              className={`${fieldClass} ${errors.name ? 'border-destructive' : 'border-ink/30'}`}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-2 text-[0.9375rem] font-semibold text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-2 block font-bold">
              Seu email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              placeholder="nome@empresa.com"
              className={`${fieldClass} ${errors.email ? 'border-destructive' : 'border-ink/30'}`}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-2 text-[0.9375rem] font-semibold text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-2 block font-bold">
              Sobre o que vamos conversar?
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              placeholder="Pode ser um rascunho: o que você quer construir e para quem."
              className={`${fieldClass} resize-y ${errors.message ? 'border-destructive' : 'border-ink/30'}`}
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-2 text-[0.9375rem] font-semibold text-destructive">
                {errors.message}
              </p>
            )}
          </div>

          {sendFailed && (
            <p
              role="alert"
              className="rounded-xl border-2 border-destructive bg-white px-4 py-3 text-[0.9375rem] font-medium text-destructive"
            >
              Não conseguimos enviar agora. Sem problema: escreva direto para{' '}
              <a href={`mailto:${FALLBACK_EMAIL}`} className="font-bold underline underline-offset-2">
                {FALLBACK_EMAIL}
              </a>{' '}
              que a gente responde.
            </p>
          )}

          {cooldownNotice && (
            <p role="status" className="text-[0.9375rem] font-semibold text-ink-soft">
              Sua mensagem acabou de ser enviada. Espere alguns segundos para mandar outra.
            </p>
          )}

          <button
            type="submit"
            disabled={disabled}
            aria-disabled={disabled}
            className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-ink px-8 text-lg font-bold text-paper transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-ink/55"
          >
            {isLoading ? 'Enviando...' : isCooldown ? 'Enviada! Aguarde um instante' : 'Enviar mensagem'}
            <Send
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 group-disabled:translate-x-0"
            />
          </button>
        </form>
      )}
    </div>
  );
}
