import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ImageWithFallback } from './ui/ImageWithFallback';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#about' },
    { label: 'Serviços', href: '#services' },
    { label: 'Fundadores', href: '#founders' },
    { label: 'Contato', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg shadow-green-500/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => {
              document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <motion.div
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1751554933476-d029737d58b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHJvYm90JTIwdGVjaG5vbG9neSUyMGdyZWVufGVufDF8fHx8MTc3MTU5MjI4NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Astra Tech"
                className="w-10 h-10 object-contain"
              />
            </motion.div>
            <span className="text-white font-bold text-xl">Astra Tech</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="block py-2 text-gray-300 hover:text-green-400 transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}