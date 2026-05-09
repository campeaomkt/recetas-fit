/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronDown, 
  CreditCard, 
  Gift, 
  Heart, 
  Leaf, 
  Lock, 
  Mail, 
  Plus, 
  ShieldCheck, 
  Smile, 
  Sparkles, 
  Star, 
  TrendingDown,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

// --- Components ---

const Button = ({ 
  children, 
  className = "", 
  variant = "primary",
  onClick,
  href
}: { 
  children: React.ReactNode, 
  className?: string, 
  variant?: "primary" | "secondary" | "outline",
  onClick?: () => void,
  href?: string
}) => {
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200/50",
    secondary: "bg-white text-emerald-600 border border-emerald-100 hover:bg-emerald-50",
    outline: "border-2 border-white/20 text-white hover:bg-white/10"
  };

  const commonProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    onClick: onClick,
    className: `px-8 py-5 rounded-xl md:rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${variants[variant]} ${className}`
  };

  if (href) {
    return (
      <motion.a
        href={href}
        {...commonProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      {...commonProps}
    >
      {children}
    </motion.button>
  );
};

const SectionHeading = ({ children, centered = true }: { children: React.ReactNode, centered?: boolean }) => (
  <h2 className={`text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 ${centered ? 'text-center' : ''}`}>
    {children}
  </h2>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    {description && <p className="text-slate-600 leading-relaxed">{description}</p>}
  </motion.div>
);

const BonusCard = ({ number, title, description }: { number: number, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
  >
    <div className="absolute -top-3 right-6 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
      Gratis
    </div>
    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-6">
      <Gift size={24} />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-3">Bono {number} — {title}</h3>
    <p className="text-slate-500 text-sm">{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">{question}</span>
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           className="text-slate-400"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-500 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 21 });
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* --- STICKY MOBILE CTA --- */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 lg:hidden"
          >
            <Button href="https://pay.hotmart.com/W105762268D?hideBillet=1" className="w-full text-lg py-4 px-6 h-14">
              Asegura tu acceso ahora <ArrowRight size={20} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-24 md:pb-32">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-emerald-50 rounded-full blur-3xl -z-10 opacity-50 translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-6 md:mb-8">
              <Sparkles size={14} />
              Ebook digital • Acceso inmediato
            </div>
            
            <h1 className="text-4xl xs:text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 md:mb-8">
              Deja de privarte: <span className="text-emerald-500 underline decoration-emerald-100 underline-offset-8">Adelgaza</span> comiendo dulces todos los días
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0">
              Descubre recetas simples, rápidas y deliciosas que te ayudarán a bajar de peso sin renunciar a lo que más te gusta.
            </p>
            
            <div className="space-y-6">
              <Button onClick={scrollToPricing} className="w-full sm:w-auto text-lg md:text-xl py-5 md:py-6 px-8 md:px-12">
                Quiero mi ebook ahora <ArrowRight className="ml-2" />
              </Button>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-2">
                  {[
                    "1494790108377-be9c29b29330",
                    "1438761681033-6461ffad8d80",
                    "1544005313-94ddf0286df2",
                    "1488423191216-721950fd46ad",
                    "1517841905240-472988babdf9"
                  ].map((id, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shrink-0">
                      <img 
                        src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=100&h=100`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-500 text-center sm:text-left">
                  <div className="flex justify-center sm:justify-start text-orange-400 mb-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="font-semibold text-slate-700">Más de 2,000 mujeres</span> ya transformaron su relación con la comida
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[400px] lg:max-w-lg aspect-square mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-[40px] md:rounded-[60px] rotate-3 -z-10" />
              <img 
                src="https://i.ibb.co/JWtJLpPD/Chat-GPT-Image-9-de-mai-de-2026-15-20-41.webp" 
                alt="Healthy Desserts" 
                className="w-full h-full object-cover rounded-[35px] md:rounded-[55px] shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- WHAT YOU WILL RECEIVE --- */}
      <section className="py-16 md:py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading>Lo que vas a recibir</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
            {[
              "+30 recetas fitness dulces probadas y aprobadas",
              "Ingredientes simples y económicos para el día a día",
              "Preparaciones rápidas en menos de 15 minutos",
              "Alternativas saludables al azúcar y la harina"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 flex items-center justify-center rounded-full text-white shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <span className="font-semibold text-sm md:text-base text-slate-800 leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE THIS EBOOK --- */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading>Por qué elegir este ebook</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <FeatureCard 
              icon={Heart} 
              title="Placer sin culpa" 
              description="No necesitas eliminar los dulces de tu vida para adelgazar." 
            />
            <FeatureCard 
              icon={Leaf} 
              title="Dieta ligera" 
              description="Evita dietas restrictivas y sufridas que nunca funcionan." 
            />
            <FeatureCard 
              icon={Smile} 
              title="Adiós a la ansiedad" 
              description="Reduce de verdad la ansiedad por comer dulces." 
            />
            <FeatureCard 
              icon={TrendingDown} 
              title="Peso saludable" 
              description="Ayuda a bajar de peso de forma ligera y deliciosa." 
            />
          </div>
        </div>
      </section>

      {/* --- FEATURED RECIPES --- */}
      <section className="py-16 md:py-24 bg-slate-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <SectionHeading>Mira lo que vas a aprender</SectionHeading>
            <p className="text-slate-500 text-sm md:text-base">Recetas reales, fotos reales. Todo práctico y rico.</p>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: "Helado fit", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600" },
                { title: "Pastel de zanahoria fit", img: "https://i.ibb.co/1t1HSDS6/Chat-GPT-Image-9-de-mai-de-2026-15-31-53.png" },
                { title: "Brownie fit", img: "https://i.ibb.co/PZWbJ3Lz/Chat-GPT-Image-9-de-mai-de-2026-15-32-40.png" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[30px] md:rounded-[40px] overflow-hidden shadow-lg border border-slate-100"
                >
                  <img src={item.img} alt={item.title} className="w-full aspect-square object-cover" />
                  <div className="p-6 md:p-8 text-center">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- EXCLUSIVE BONUS --- */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <SectionHeading>Bonos exclusivos por tiempo limitado</SectionHeading>
            <p className="text-slate-500 text-sm md:text-base">Te llevas todo esto junto, sin pagar nada extra:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <BonusCard 
              number={1} 
              title="Lista de compras fit" 
              description="Todo lo que necesitas comprar en el súper, organizado por sección." 
            />
            <BonusCard 
              number={2} 
              title="Guía de sustituciones inteligentes" 
              description="Cambia ingredientes calóricos por opciones ligeras sin perder el sabor." 
            />
            <BonusCard 
              number={3} 
              title="Plan de 7 días con dulces fit" 
              description="Un menú listo para empezar con el pie derecho tu proyecto." 
            />
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-16 md:py-24 bg-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 underline decoration-emerald-400 underline-offset-8">Quién lo probó, lo aprobó</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Camila R.", text: "No podía dejar de comer dulces, esto me ayudó muchísimo en mi proceso.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" },
              { name: "Juliana M.", text: "Recetas fáciles y realmente ricas. Bajé 4kg el primer mes sin sufrir.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" },
              { name: "Patrícia L.", text: "Empecé a adelgazar sin ningún sufrimiento. ¡El pastel de zanahoria es divino!", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" }
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl text-slate-800 relative">
                <Quote className="absolute top-4 right-4 md:top-6 md:right-6 text-emerald-100/50" size={32} />
                <div className="flex gap-1 text-orange-400 mb-4 md:mb-6">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="italic text-base md:text-lg mb-6 md:mb-8 text-slate-600 leading-relaxed text-balance">"{t.text}"</p>
                <div className="flex items-center gap-3 md:gap-4">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
                  <span className="font-bold text-slate-900 text-sm md:text-base">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-16 md:py-24 relative overflow-hidden bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 md:mb-8">
            <Clock size={16} />
            Oferta por tiempo limitado
          </div>
          
          <h2 className="text-3xl xs:text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 px-4">Asegura tu acceso ahora con descuento</h2>
          
          <div className="mb-6 md:mb-8">
            <span className="text-slate-400 line-through text-lg md:text-2xl">De U$ 37</span>
            <div className="text-slate-500 font-medium my-2 text-sm md:text-lg">por solo</div>
            <div className="text-6xl xs:text-7xl md:text-9xl font-black text-emerald-500 tracking-tight">U$ 7</div>
            <p className="text-slate-500 mt-4 text-base md:text-lg font-medium">Pago único • Acceso de por vida</p>
          </div>

          <div className="bg-emerald-50 p-6 md:p-8 rounded-3xl mb-10 md:mb-12 max-w-sm mx-auto border border-emerald-100 inline-block w-full">
            <p className="text-slate-600 mb-4 font-semibold text-xs md:text-sm uppercase tracking-wider">Esta oferta expira en:</p>
            <div className="flex items-center justify-center gap-3 md:gap-4 text-4xl md:text-5xl font-black text-white">
              <div className="bg-emerald-500 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl md:rounded-2xl shadow-lg shadow-emerald-200/50">{timeLeft.minutes}</div>
              <span className="text-emerald-500">:</span>
              <div className="bg-emerald-500 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl md:rounded-2xl shadow-lg shadow-emerald-200/50">{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Button href="https://pay.hotmart.com/W105762268D?hideBillet=1" className="w-full max-w-md mx-auto text-xl md:text-2xl py-6 md:py-8">
              ¡Quiero mi acceso ahora! <ArrowRight />
            </Button>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 text-slate-400 text-xs md:text-sm font-medium">
              <span className="flex items-center gap-2"><ShieldCheck size={18} /> Compra 100% segura</span>
              <span className="flex items-center gap-2"><Mail size={18} /> Acceso inmediato por e-mail</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- GUARANTEE SECTION --- */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white p-12 rounded-[50px] border-2 border-emerald-50 shadow-xl shadow-emerald-100/50 flex flex-col md:flex-row items-center gap-12">
            <div className="relative">
              <div className="w-40 h-40 bg-emerald-500 rounded-full flex items-center justify-center text-white relative z-10">
                <div className="text-center">
                  <ShieldCheck size={48} className="mx-auto mb-1" />
                  <div className="font-bold text-lg leading-tight">7 días</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Garantía incondicional de 7 días</h2>
              <p className="text-xl text-slate-500 leading-relaxed">
                Si no te gusta por cualquier motivo, te devolvemos el 100% de tu dinero. Sin preguntas ni letras pequeñas. El riesgo es todo mío.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading>Preguntas frecuentes</SectionHeading>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <FAQItem 
              question="¿Necesito saber cocinar?" 
              answer="¡Para nada! Las recetas fueron pensadas para quienes no tienen experiencia en la cocina. Todo se explica de forma muy simple y rápida." 
            />
            <FAQItem 
              question="¿Los ingredientes son caros?" 
              answer="De ninguna manera. Priorizamos ingredientes comunes que encuentras en cualquier supermercado de tu barrio." 
            />
            <FAQItem 
              question="¿Realmente funciona?" 
              answer="¡Sí! El método se basa en sustituciones inteligentes por opciones de baja densidad calórica, permitiéndote comer más por menos calorías." 
            />
            <FAQItem 
              question="¿Cómo recibo el material?" 
              answer="¡El acceso es inmediato! En cuanto se confirme el pago, recibirás un enlace de descarga directo en tu email." 
            />
            <FAQItem 
              question="¿Tiene garantía?" 
              answer="Sí, tienes una garantía incondicional de 7 días. Si no te gusta, simplemente pides tu reembolso." 
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-8 text-slate-400">
             <CreditCard size={24} />
             <Lock size={24} />
             <ShieldCheck size={24} />
          </div>
          <p className="text-slate-400 text-sm">
            © 2026 Recetas Saludables. Todos los derechos reservados.
          </p>
        </div>
      </footer>
      
      {/* --- TRUST BADGE (Fixed) --- */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <div className="bg-emerald-600 p-1 rounded-full shadow-2xl border-4 border-white overflow-hidden w-16 h-16 flex items-center justify-center">
          <div className="text-white">
             <ShieldCheck size={40} />
          </div>
        </div>
      </div>
      
    </div>
  );
}
