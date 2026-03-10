import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

const COOLDOWN_MS = 10_000;

type FormData = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCooldown, setIsCooldown] = useState(false);
  const cooldownTimeoutRef = useRef<number | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    },
    []
  );

  const validate = useCallback((data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Nome é obrigatório.';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email é obrigatório.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = 'Informe um email válido.';
      }
    }

    if (!data.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória.';
    }

    return newErrors;
  }, []);

  const startCooldown = useCallback(() => {
    setIsCooldown(true);

    if (cooldownTimeoutRef.current) {
      window.clearTimeout(cooldownTimeoutRef.current);
    }

    cooldownTimeoutRef.current = window.setTimeout(() => {
      setIsCooldown(false);
      cooldownTimeoutRef.current = null;
    }, COOLDOWN_MS);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isCooldown) {
        setErrorMessage('Aguarde alguns segundos antes de enviar outra mensagem.');
        return;
      }

      if (formData.company.trim()) {
        return;
      }

      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        setErrorMessage(
          'Configuração de email não encontrada. Verifique as variáveis de ambiente.'
        );
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

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
          {
            publicKey: EMAILJS_PUBLIC_KEY,
          }
        );

        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          message: '',
          company: '',
        });
        setErrors({});
        startCooldown();

        window.setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } catch (error) {
        console.error('Erro ao enviar email:', error);
        setErrorMessage(
          'Não foi possível enviar sua mensagem no momento. Tente novamente em instantes.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [formData, isCooldown, startCooldown, validate]
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/20 rounded-2xl p-8">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="hidden">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="off"
              value={formData.company}
              onChange={handleChange}
              tabIndex={-1}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
              placeholder="Seu nome"
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
              placeholder="seu@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
              placeholder="Conte-nos sobre seu projeto..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
              {errorMessage}
            </p>
          )}

          <motion.button
            type="submit"
            whileHover={!isLoading && !isCooldown ? { scale: 1.02 } : {}}
            whileTap={!isLoading && !isCooldown ? { scale: 0.98 } : {}}
            disabled={isLoading || isCooldown}
            className={`w-full px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg transition-all
              ${
                isLoading || isCooldown
                  ? 'bg-gray-600 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/30 hover:shadow-green-500/50'
              }`}
          >
            {isLoading
              ? 'Enviando...'
              : isCooldown
              ? 'Aguarde alguns segundos...'
              : 'Enviar Mensagem'}
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h3>
          <p className="text-gray-400">
            Obrigado pelo contato. Retornaremos em breve!
          </p>
        </motion.div>
      )}
    </div>
  );
}

