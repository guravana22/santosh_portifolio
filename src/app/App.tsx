import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import tTherapy from '../app/assets/t-therapy.png';
import erpforce from '../app/assets/erpforce.png';
import weforce from '../app/assets/weforce.png';
import fat from '../app/assets/fat.png';
import quantasec from '../app/assets/quantasec.png';
import retrofit from '../app/assets/retrofit.png';
import trustin from "../app/assets/trustin.png";
import yaswash from '../app/assets/yaswash.png';
import ondemandlabs from "../app/assets/ondemandlabs.png";
import react from "../app/assets/react.png";
import nodejs from "../app/assets/nodejs.png";
import tailwind from "../app/assets/tailwind.png";
import aaks from "../app/assets/aaks.png";
import { Linkedin, Mail, MapPin } from "lucide-react";




export default function App() {
  // const heroRef = useRef(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDesktopToggle, setShowDesktopToggle] = useState(false);

  const { scrollYProgress } = useScroll({
    // target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isDark = theme === 'dark';


  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 180) {
      setShowDesktopToggle(true);
    } else {
      setShowDesktopToggle(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  const navLinks = [
    // { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f9]'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]/80 border-b border-white/5' : 'bg-[#f8f8f9]/80 border-b border-black/5'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
         
         <a href="#">
  <div
    className={`font-['Cormorant_Garamond'] tracking-wide transition-colors duration-300 ${
      isDark ? 'text-white' : 'text-[#1a1a1a]'
    }`}
    style={{
      fontStyle: 'italic',
      letterSpacing: '2.5px',
      fontSize: '29px',
      fontWeight: 800,
    }}
  >
    Santosh.
  </div>
</a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <div className="flex gap-6 lg:gap-10 font-['Outfit'] text-[13px] lg:text-[14px] tracking-wide">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`transition-colors duration-300 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Desktop Theme Toggle */}
             {showDesktopToggle && (
  <motion.button
    onClick={toggleTheme}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`p-2 rounded-full transition-all duration-300 cursor-pointer mobile-theme ${
      isDark
        ? 'bg-white/10 hover:bg-white/20 border border-white/20'
        : 'bg-black/5 hover:bg-black/10 border border-black/10'
    }`}
    aria-label="Toggle theme"
  >
    {isDark ? (
      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )}
  </motion.button>
)}
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="flex md:hidden items-center gap-3">
              {/* Mobile Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 border border-white/20'
                    : 'bg-black/5 border border-black/10'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>

              {/* Hamburger Button */}
              <motion.button
                onClick={toggleMobileMenu}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 border border-white/20'
                    : 'bg-black/5 hover:bg-black/10 border border-black/10'
                }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`md:hidden overflow-hidden ${
            isDark ? 'border-t border-white/5' : 'border-t border-black/5'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  x: mobileMenuOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={(e) => {
                e.preventDefault(); // stop default jump

                const target = document.querySelector(link.href);

                setMobileMenuOpen(false); // close menu first

                setTimeout(() => {
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 300); // match your animation duration
              }}
                // onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-xl font-['Outfit'] text-[15px] tracking-wide transition-all duration-300 ${
                  isDark
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-black hover:bg-black/5'
                }`}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
     
      {/* Hero Section */}
      <section 
      // ref={heroRef} 
      className="pt-32 pb-20 px-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 transition-colors duration-500 ${
            isDark
              ? 'bg-gradient-to-b from-[#0f0f0f] via-[#0a0a0a] to-[#0a0a0a]'
              : 'bg-gradient-to-b from-[#fafafa] via-[#f8f8f9] to-[#f8f8f9]'
          }`}></div>

          {/* Dot Pattern */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
            className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-[0.08]' : 'opacity-[0.15]'}`}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: isDark
                  ? 'radial-gradient(circle, #ffffff 1px, transparent 1px)'
                  : 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            ></div>
          </motion.div>

          {/* Abstract Shapes - Accent Glow */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]),
              opacity: useTransform(scrollYProgress, [0, 0.5], isDark ? [0.3, 0] : [0.4, 0])
            }}
            className={`absolute top-20 left-[10%] w-[500px] h-[500px] rounded-full blur-3xl transition-colors duration-500 ${
              isDark
                ? 'bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent'
                : 'bg-gradient-to-br from-[#e8e8ea]/30 to-transparent'
            }`}
          ></motion.div>

          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], ["0%", "25%"]),
              opacity: useTransform(scrollYProgress, [0, 0.5], isDark ? [0.25, 0] : [0.3, 0])
            }}
            className={`absolute top-40 right-[15%] w-[400px] h-[400px] rounded-full blur-3xl transition-colors duration-500 ${
              isDark
                ? 'bg-gradient-to-br from-purple-500/15 via-blue-500/10 to-transparent'
                : 'bg-gradient-to-br from-[#d8d8da]/20 to-transparent'
            }`}
          ></motion.div>
        </div>

        {/* Lamp Toggle - Right Side */}
        <LampToggle isDark={isDark} onToggle={toggleTheme} scrollYProgress={scrollYProgress} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[900px] mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="mb-10 inline-block relative group"
          >
            <div className={`absolute inset-0 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-700 ${
              isDark
                ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30'
                : 'bg-gradient-to-br from-[#e8e8ea] to-[#f5f5f6]'
            }`}></div>
           
           <motion.a
  href="https://www.linkedin.com/in/santosh-guravana-8a8a5828b/"
  target="_blank"
  rel="noopener noreferrer"
  className="relative inline-block group cursor-pointer"
  whileHover={{ scale: 1.05 }}
>
  {/* Image Wrapper */}
  <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden">
    
    {/* Image */}
    <ImageWithFallback
      src="https://media.licdn.com/dms/image/v2/D5603AQEU8PaGGUWFKQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725679034919?e=1778112000&v=beta&t=CU6srQ8PfqnNKSVBY0U30XY26iZCjhPUGTdaEdo1yv0"
      alt="Profile"
      className={`w-full h-full object-cover transition-all duration-500 ${
        isDark
          ? "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
          : "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
      }`}
    />

    {/* Overlay (FIXED) */}
    <div className="absolute inset-0 z-20 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
      <Linkedin
        size={30}
        className="text-white transform scale-75 group-hover:scale-100 transition-all duration-300"
      />
    </div>

    {/* Ring (separate layer) */}
    <div className={`absolute inset-0 rounded-full ring-4 pointer-events-none ${
      isDark ? "ring-white/10" : "ring-white/50"
    }`} />
  </div>
</motion.a>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className={`font-['Cormorant_Garamond'] text-[56px] md:text-[68px] leading-[1.1] tracking-tight mb-5 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-[#1a1a1a]'
            }`}
            style={{ fontWeight: 400 }}
          >
            Building digital products,<br />brands, and experience
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className={`font-['Outfit'] text-[15px] mb-10 max-w-[600px] mx-auto leading-relaxed tracking-wide transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-[#5a5a5a]'
            }`}
          >
            Crafting meaningful digital experiences that connect people with purpose through thoughtful design and development
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.a
            href='#contact'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-['Outfit'] text-[13px] tracking-widest uppercase hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(99,102,241,0.6)]"
              style={{ fontWeight: 500 }}
            >
              Get in Touch
            </motion.a>
            <motion.a
            href='#projects'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`px-10 py-4 rounded-full font-['Outfit'] text-[13px] tracking-widest uppercase transition-all duration-300 border-2 ${
                isDark
                  ? 'bg-transparent text-gray-300 hover:bg-white/5 border-white/20 hover:border-white/40'
                  : 'bg-transparent text-[#1a1a1a] hover:bg-white/60 border-[#1a1a1a]/20 hover:border-[#1a1a1a]/40'
              }`}
              style={{ fontWeight: 500 }}
            >
              View Work
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2, duration: 0.6 }}
  className="flex flex-col items-center gap-2"
>
  <div
    className={`font-['Outfit'] text-[10px] tracking-[3px] uppercase ${
      isDark ? "text-gray-500" : "text-gray-400"
    }`}
  >
    Scroll Down
  </div>
  <div
    className={`w-[22px] h-[36px] rounded-full border flex justify-center items-start p-1 ${
      isDark ? "border-white/20" : "border-black/20"
    }`}
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={`w-[4px] h-[4px] rounded-full ${
        isDark ? "bg-white" : "bg-black"
      }`}
    />
  </div>
</motion.div> */}

      {/* About Me Section - Redesigned */}
      <section className="py-20 px-8" id='about'>
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              {/* Left: Content */}
              <div>
                <div className={`inline-block px-5 py-2 rounded-full backdrop-blur-sm mb-6 font-['Outfit'] text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isDark ? 'bg-white/5 text-gray-400' : 'bg-white/40 text-[#6a6a6a]'
                }`} style={{ fontWeight: 500 }}>
                  About Me
                </div>
                <h2 className={`font-['Cormorant_Garamond'] text-[48px] leading-[1.15] tracking-tight mb-6 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-[#1a1a1a]'
                }`} style={{ fontWeight: 500 }}>
                  Software Engineer<br />Building Digital<br />Experiences
                </h2>
                <p className={`font-['Outfit'] text-[15px] leading-[1.8] mb-5 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-[#5a5a5a]'
                }`}>
                  Currently working at <span className={isDark ? 'text-blue-400' : 'text-[#2a2a2a]'} style={{ fontWeight: 600 }}>Trustin</span>, specializing in building modern, responsive web applications using <span className={isDark ? 'text-blue-400' : 'text-[#2a2a2a]'} style={{ fontWeight: 600 }}>React.js</span>, <span className={isDark ? 'text-blue-400' : 'text-[#2a2a2a]'} style={{ fontWeight: 600 }}>JavaScript</span>, and modern CSS to create seamless digital experiences.
                </p>
                <p className={`font-['Outfit'] text-[15px] leading-[1.8] mb-6 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-[#5a5a5a]'
                }`}>
                  Passionate about <span className={isDark ? 'text-blue-400' : 'text-[#2a2a2a]'} style={{ fontWeight: 600 }}>performance optimization</span>, <span className={isDark ? 'text-blue-400' : 'text-[#2a2a2a]'} style={{ fontWeight: 600 }}>API integration</span>, and creating intuitive user interfaces that solve real problems.
                </p>

                {/* Stats */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
                  {[
                    { value: "3+", label: "Years Exp" },
                    { value: "5+", label: "Projects" },
                    { value: "100%", label: "Committed" }
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className={`text-center p-4 rounded-2xl transition-all duration-500 ${
                        isDark ? 'bg-white/5 border border-white/10' : 'bg-white/60 border border-white/40'
                      }`}
                    >
                      <div className={`font-['Cormorant_Garamond'] text-[32px] transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-[#1a1a1a]'
                      }`} style={{ fontWeight: 600 }}>{stat.value}</div>
                      <div className={`font-['Outfit'] text-[12px] uppercase tracking-wider transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-[#6a6a6a]'
                      }`}>{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Skills/Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-5"
              >
                {[
                  { icon: react, title: "React.js", level: "Expert" },
                  { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/960px-Typescript_logo_2020.svg.png', title: "TypeScript", level: "Advanced" },
                  { icon: tailwind, title: "Tailwind", level: "Expert" },
                  { icon: nodejs, title: "Node.js", level: "Advanced" }
                ].map((skill, idx) => (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className={`p-6 rounded-2xl transition-all duration-500 hover:scale-105 ${
                      isDark
                        ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                        : 'bg-white/60 border border-white/40 hover:bg-white'
                    }`}
                  >
                    <div className="text-[28px] mb-3"><img src={skill.icon} alt='icon' style={{height:'auto',width:'30px',objectFit:'contain'}}></img></div>
                    <div className={`font-['Outfit'] text-[16px] mb-1 transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-[#1a1a1a]'
                    }`} style={{ fontWeight: 600 }}>{skill.title}</div>
                    <div className={`font-['Outfit'] text-[12px] uppercase tracking-wide transition-colors duration-300 ${
                      isDark ? 'text-gray-400' : 'text-[#6a6a6a]'
                    }`}>{skill.level}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Services / What I Do Section - Redesigned */}
      <section className="py-12 px-8">
        <div className="max-w-[1300px] mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className={`font-['Cormorant_Garamond'] text-[42px] leading-[1.2] tracking-tight mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-[#1a1a1a]'
              }`} style={{ fontWeight: 500 }}>
                What I Do
              </h2>
              <p className={`font-['Outfit'] text-[15px] max-w-[600px] mx-auto transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-[#6a6a6a]'
              }`}>
                Specialized in front-end development with a focus on modern web technologies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: react, title: "React Development", description: "Building component-based applications with React.js and modern state management" },
                { icon: "https://cdn-icons-png.flaticon.com/512/2504/2504196.png", title: "Responsive Design", description: "Creating mobile-first interfaces that work seamlessly across all devices" },
                { icon: "https://cdn-icons-png.flaticon.com/512/18224/18224749.png", title: "Performance", description: "Optimizing applications for speed and efficiency using best practices" },
                { icon: "https://cdn-icons-png.flaticon.com/512/2620/2620861.png", title: "API Integration", description: "Implementing REST APIs and real-time data synchronization" }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                >
                  <ServiceCard {...service} isDark={isDark} />
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Tech Stack Marquee Section */}
      <TechStackMarquee isDark={isDark} />

      {/* Experience & Education Combined Section - Timeline Style */}
      <section className="py-16 px-8">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-16">
              {/* Experience Timeline */}
              <div>
                <h2 className={`font-['Cormorant_Garamond'] text-[38px] leading-[1.2] tracking-tight mb-10 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-[#1a1a1a]'
                }`} style={{ fontWeight: 500 }}>
                  Experience
                </h2>
                <div className="space-y-8 relative before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-blue-500/50 before:to-transparent">
                  {[
                    { role: "Software Engineer", company: "Trustin", duration: "2024 - Present", description: "Developing scalable and high-performance web applications using React.js and Tailwind CSS. Working on secure digital escrow solutions with real-time transaction tracking, API integrations, and responsive UI/UX improvements. Collaborating with cross-functional teams to deliver reliable and user-friendly financial platforms.",img:"https://cdn.prod.website-files.com/668adad388c167cbff3c0d9e/66fed4c56b19ca1e8d4aa4b4_trustin-favicon-new.png", link :"https://www.trustin.ae/", current: true },
                    { role: "Associate Software Engineer", company: "Headrun Technologies", duration: "2022-2024", description: "Designed and developed responsive website interfaces with a strong focus on UI/UX. Created modern, visually appealing layouts using HTML, CSS, and JavaScript, ensuring cross-browser compatibility and mobile responsiveness. Collaborated with developers to translate design concepts into user-friendly web experiences.", img:"https://headrun.com/static/images/favicon.png", link : "https://headrun.com/", current: false },
                    // { role: "Junior Web Developer", company: "Digital Innovations", duration: "2022-2023", description: "Collaborated on responsive website development projects", current: false }
                  ].map((exp, index) => (
                    <motion.div
                      key={exp.role}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                      className="relative pl-8"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-0 top-[6px] w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isDark
                          ? exp.current ? 'bg-blue-500 border-blue-400' : 'bg-white/10 border-white/30'
                          : exp.current ? 'bg-blue-600 border-blue-500' : 'bg-white/40 border-gray-300'
                      }`}></div>

                      <div className={`p-5 rounded-2xl transition-all duration-500 ${
                        isDark ? 'bg-white/5 border border-white/10' : 'bg-white/60 border border-white/40'
                      }`}>
                        {exp.current && (
                          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-['Outfit'] text-[10px] tracking-widest uppercase mb-2" style={{ fontWeight: 500 }}>
                            Current
                          </div>
                        )}
                        <h3 className={`font-['Outfit'] text-[18px] mb-1 transition-colors duration-300 ${
                          isDark ? 'text-white' : 'text-[#1a1a1a]'
                        }`} style={{ fontWeight: 600 }}>{exp.role}</h3>
                        <div  className={`font-['Outfit'] text-[14px] mb-2 transition-colors duration-300 flex justify-start items-center gap-1 ${
                          isDark ? 'text-blue-400' : 'text-[#2a2a2a]'
                        }`} style={{ fontWeight: 500 }}>
                          <div className='flex justify-start items-center gap-1'><a className='flex justify-start items-center gap-2' href={exp.link} target='_blank'>{exp.company} <img src={exp.img} alt='logo' style={{height:'auto', width:'25px',objectFit:'contain'}}/></a></div>
                        </div>
                        <div className={`font-['Outfit'] text-[12px] mb-3 transition-colors duration-300 ${
                          isDark ? 'text-gray-500' : 'text-[#8a8a8a]'
                        }`}>{exp.duration}</div>
                        <p className={`font-['Outfit'] text-[13px] leading-relaxed transition-colors duration-300 ${
                          isDark ? 'text-gray-400' : 'text-[#6a6a6a]'
                        }`}>{exp.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education Timeline */}
              <div>
                <h2 className={`font-['Cormorant_Garamond'] text-[38px] leading-[1.2] tracking-tight mb-10 transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-[#1a1a1a]'
                }`} style={{ fontWeight: 500 }}>
                  Education
                </h2>
                <div className="space-y-8 relative before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-purple-500/50 before:to-transparent">
                  {[
                    { degree: "Master of Computer Applications(MCA)", institution: "Dr.B.R Ambedkar University", year: "2018 - 2020" },
                    { degree: "B.Sc (Computer Science)" , institution: "Sri G.C.S.R Degree College", year: "2014-2017" },
                    // { degree: "JavaScript Algorithms", institution: "freeCodeCamp", year: "2022" }
                  ].map((qual, index) => (
                    <motion.div
                      key={qual.degree}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                      className="relative pl-8"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-0 top-[6px] w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isDark ? 'bg-white/10 border-white/30' : 'bg-white/40 border-gray-300'
                      }`}></div>

                      <div className={`p-5 rounded-2xl transition-all duration-500 ${
                        isDark ? 'bg-white/5 border border-white/10' : 'bg-white/60 border border-white/40'
                      }`}>
                        <h3 className={`font-['Outfit'] text-[16px] mb-1 transition-colors duration-300 ${
                          isDark ? 'text-white' : 'text-[#1a1a1a]'
                        }`} style={{ fontWeight: 600 }}>{qual.degree}</h3>
                        <div className={`font-['Outfit'] text-[14px] mb-2 transition-colors duration-300 ${
                          isDark ? 'text-purple-400' : 'text-[#2a2a2a]'
                        }`} style={{ fontWeight: 500 }}>{qual.institution}</div>
                        <div className={`font-['Outfit'] text-[12px] transition-colors duration-300 ${
                          isDark ? 'text-gray-500' : 'text-[#8a8a8a]'
                        }`}>{qual.year}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Projects Section - Redesigned */}
      <section className="py-20 px-8" id='projects'>
        <div className="max-w-[1400px] mx-auto">
          <FadeInSection>
            <div className="text-center mb-14">
              <div className={`inline-block px-5 py-2 rounded-full backdrop-blur-sm mb-4 font-['Outfit'] text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                isDark ? 'bg-white/5 text-gray-400' : 'bg-white/40 text-[#6a6a6a]'
              }`} style={{ fontWeight: 500 }}>
                Our Work
              </div>
              <h2 className={`font-['Cormorant_Garamond'] text-[46px] leading-[1.2] tracking-tight mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-[#1a1a1a]'
              }`} style={{ fontWeight: 500 }}>
                Featured Projects
              </h2>
              <p className={`font-['Outfit'] text-[15px] max-w-[600px] mx-auto transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-[#6a6a6a]'
              }`}>
                Showcasing recent work and side projects built with modern technologies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {[
                 { image: trustin, title: "Trustin", description: "Regulated digital escrow platform in the UAE enabling secure, transparent transactions with instant IBAN accounts, multi-party support, and real-time fund tracking for real estate, trade, and high-value deals.", tag: "Webflow" , link :"https://www.trustin.ae/" },
                { image: tTherapy, title: "T-Therapy", description: "Swiss healthcare platform offering non-invasive pain relief through static magnetic field therapy, featuring clinical applications, certified medical technology, and partner network management.", tag: "React/Motion" , link :"https://t-therapyswiss.com/" },
                 { image: fat , title: "Fahad AL Tamimi Law Firm",  description: "Corporate legal services platform for a Saudi-based law firm, showcasing expertise in company formation, regulatory compliance, contract management, and AI-integrated client portal for real-time case tracking.",  tag: "React/Motion", link :"https://fat-website.erpforce.co/" },
                 {
  image: aaks,
  title: "AAKS & BROS Turbo Machinery L.L.C",
  description: "OEM-quality turbomachinery services specializing in gas and steam turbine maintenance, repair, refurbishment, and lifecycle support for power, oil & gas, and industrial sectors across the GCC region.",
  tag: "React/Motion",
  link: "https://abturbomachinery.com/"
},
                                 { image: yaswash, title: "YasWash", description: "Premium doorstep car wash platform in the UAE offering eco-friendly cleaning services, real-time booking via WhatsApp, and professional on-demand car care across Dubai and Abu Dhabi.",  tag: "ReactJS", link :"https://yaswash.com/" },
                                 { image: ondemandlabs, title: "Ondemandlabs", description: "Cloud-native DevOps platform delivering infrastructure automation, CI/CD pipelines, and managed cloud services to help businesses build scalable, secure, and high-performance applications with faster deployment cycles.", tag: "ReactJS", link :"https://ondemandlabs.com/" },
                                 { image: erpforce, title: "ERPForce", description: "AI-powered ERP platform designed for businesses in the UAE and Middle East, offering integrated modules for finance, HRMS, inventory, sales, and manufacturing with real-time analytics, automation, and enterprise-grade security.",  tag: "NextJS/next-intl", link :"https://erpforce.ai/" },
                { image: weforce, title: "WEForce", description: "Digital transformation platform delivering custom software, AI solutions, cloud integration, and scalable IT services to help businesses optimize operations and drive growth.", tag: "NextJS", link :"https://weforce.co/" },
                { image: quantasec, title: "QuantaSec",  description: "Security and surveillance solutions platform delivering SIRA-compliant CCTV systems, access control, and smart ELV integrations for residential and commercial environments in the UAE.",  tag: "HTML5/Javascript", link :"https://www.quantasec.ae/" },
                { image: retrofit, title: "Retrofit Turbine PartsTrading FZ",  description: "Industrial solutions platform delivering high-performance gas and steam turbine repair, refurbishment, and spare parts supply with global support and engineering expertise.",  tag: "HTML5/Javascript", link :"https://www.retrofitturbineparts.com/" }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className="group relative h-full"
                >
                  <div className={`h-full flex flex-col rounded-3xl overflow-hidden transition-all duration-500 ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                    : 'bg-white/60 hover:bg-white border border-white/40 hover:border-white/60'
                }`}>
                    {/* Image */}
                    <div className="aspect-[22/11] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      >
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className={`w-full h-full object-cover transition-opacity duration-500 ${
                            isDark ? 'opacity-85 group-hover:opacity-100' : 'opacity-100'
                          }`}
                        />
                      </motion.div>
                      {/* Tag */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-['Outfit'] text-[11px] tracking-wider uppercase backdrop-blur-sm" style={{ fontWeight: 600 }}>
                          {project.tag}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className={`font-['Outfit'] text-[20px] mb-2 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-[#1a1a1a]'
                      }`} style={{ fontWeight: 600 }}>{project.title}</h3>
                      <p className={`font-['Outfit'] text-[13px] leading-relaxed mb-5 transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-[#6a6a6a]'
                      }`}>{project.description}</p>

                      {/* CTA */}
                      <motion.a
                      href={project.link}
                      target='_blank'
                        whileHover={{ x: 4 }}
                        className={`font-['Outfit'] text-[12px] tracking-wider uppercase flex items-center gap-2 transition-colors duration-300 ${
                          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#1a1a1a] hover:text-blue-600'
                        }`}
                        style={{ fontWeight: 600 }}
                      >
                        View Details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Section - Redesigned */}
  
  <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 pb-24" id="contact">
  <div className="max-w-[1000px] mx-auto">
    <FadeInSection>
      <div
        className={`relative rounded-[30px] sm:rounded-[40px] p-8 sm:p-12 md:p-16 overflow-hidden transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10"
            : "bg-gradient-to-br from-white/90 via-white/70 to-white/50 border border-white/60"
        }`}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-52 sm:w-80 h-52 sm:h-80 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div
              className={`inline-block px-4 sm:px-5 py-2 rounded-full backdrop-blur-sm mb-6 font-['Outfit'] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                isDark ? "bg-white/10 text-gray-300" : "bg-white/60 text-[#6a6a6a]"
              }`}
            >
              Get in Touch
            </div>

            {/* Heading */}
            <h2
              className={`font-['Cormorant_Garamond'] text-[34px] sm:text-[44px] md:text-[56px] leading-[1.2] tracking-tight mb-6 transition-colors duration-300 ${
                isDark ? "text-white" : "text-[#1a1a1a]"
              }`}
              style={{ fontWeight: 500 }}
            >
              Let's Build Something
              <br />
              Amazing Together
            </h2>

            {/* Contact Cards */}
          
          
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 justify-center mb-10 sm:mb-12">
  {[
    {
      icon: Mail,
      label: "Email",
      value: "guravana22@gmail.com",
      link: "mailto:guravana22@gmail.com",
      external: false, // 👈 important
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Rajam, Andhra Pradesh, India",
      link: null,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/santosh-guravana-8a8a5828b",
      link: "https://www.linkedin.com/in/santosh-guravana-8a8a5828b/",
      external: true,
    },
  ].map((contact) => {
    const Icon = contact.icon;
    const isClickable = !!contact.link;

    const content = (
      <div
        className={`group w-full sm:w-auto px-5 sm:px-6 py-3 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
          isClickable ? "cursor-pointer" : "cursor-default"
        } ${
          isDark
            ? "bg-white/5 border border-white/10 hover:bg-white/10"
            : "bg-white/60 border border-white/40 hover:bg-white"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Icon (fix compression) */}
          <div className="flex-shrink-0">
            <Icon
              size={18}
              className={`transition-all duration-300 ${
                isDark
                  ? "text-gray-400 group-hover:text-blue-400"
                  : "text-[#555] group-hover:text-blue-600"
              }`}
            />
          </div>

          {/* Text */}
          <div className="text-left overflow-hidden">
            <div
              className={`font-['Outfit'] text-[10px] sm:text-[11px] uppercase tracking-wider ${
                isDark ? "text-gray-500" : "text-[#8a8a8a]"
              }`}
            >
              {contact.label}
            </div>

            <div
              className={`font-['Outfit'] text-[13px] sm:text-[14px] truncate ${
                isDark ? "text-white" : "text-[#1a1a1a]"
              }`}
              style={{ fontWeight: 500 }}
            >
              {contact.value}
            </div>
          </div>
        </div>
      </div>
    );

    // 👉 Handle click vs non-click properly
    if (contact.link) {
      return (
        <a
          key={contact.label}
          href={contact.link}
          {...(contact.external
            ? { target: "_blank", rel: "noopener noreferrer" } // LinkedIn only
            : {})}
        >
          {content}
        </a>
      );
    }

    return <div key={contact.label}>{content}</div>;
  })}
</div>

            {/* Social Links */}
            {/* <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mt-10 sm:mt-12">
              {[
                { name: "GitHub", url: "https://github.com/guravana22" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/santosh-guravana-8a8a5828b/" },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className={`font-['Outfit'] text-[13px] tracking-wide transition-colors duration-300 ${
                    isDark
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-[#6a6a6a] hover:text-[#1a1a1a]"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div> */}
          </motion.div>
        </div>
      </div>
    </FadeInSection>
  </div>
</section>

      {/* Footer */}
      <footer className={`px-8 pb-5 border-t transition-colors duration-500 ${
        isDark ? 'border-white/5' : 'border-black/5'
      }`}>
        <div className={`max-w-[1400px] mx-auto flex justify-center items-center font-['Outfit'] text-[12px] tracking-wide flex-wrap gap-4 pt-5 transition-colors duration-300 ${
          isDark ? 'text-gray-500' : 'text-[#8a8a8a]'
        }`}>
            <div className="text-center flex items-center gap-1">
      ©{new Date().getFullYear()} All Rights Reserved. Made with
      <span className="text-red-500 animate-pulse">❤️</span>
      by Santosh Guravana
    </div>
          <div className="flex gap-8">
            {/* <a href="https://github.com/guravana22" className={`transition-colors duration-300 ${
              isDark ? 'hover:text-blue-400' : 'hover:text-[#1a1a1a]'
            }`}>GitHub</a> */}
            {/* <a href="https://www.linkedin.com/in/santosh-guravana-8a8a5828b/" className={`transition-colors duration-300 ${
              isDark ? 'hover:text-blue-400' : 'hover:text-[#1a1a1a]'
            }`}>LinkedIn</a> */}
            {/* <a href="#" className={`transition-colors duration-300 ${
              isDark ? 'hover:text-blue-400' : 'hover:text-[#1a1a1a]'
            }`}>Twitter</a> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

// Tech Stack Marquee Component
function TechStackMarquee({ isDark }: { isDark: boolean }) {
  const technologies = [
    "React Js", "TypeScript", "JavaScript", "Tailwind CSS", "Next.js" ,"Bootstrap/React Bootstrap",
    "Node.js", "Figma", "Git", "HTML", "CSS", "Motion", "Vite" , "Canva" , "SEO" ,"Webflow", "Strapi", "Responsive Design"
  ];

  // Duplicate the array for seamless loop
  const duplicatedTech = [...technologies, ...technologies];

  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-10 px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Optional Section Title */}
        <div className="text-center mb-6">
          <div className={`inline-block px-6 py-2 rounded-full backdrop-blur-sm font-['Outfit'] text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
            isDark ? 'bg-white/5 text-gray-400' : 'bg-white/40 text-[#6a6a6a]'
          }`} style={{ fontWeight: 500 }}>
            Tech Stack
          </div>
        </div>

        <div
          className={`backdrop-blur-sm rounded-[28px] py-7 overflow-hidden relative transition-all duration-500 ${
            isDark
              ? 'bg-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] border border-white/10'
              : 'bg-white/40 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06)] border border-white/60'
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Marquee Container */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6 items-center will-change-transform"
              animate={isPaused ? {} : {
                x: ['0%', '-50%']
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear"
                }
              }}
              style={{
                width: 'fit-content'
              }}
            >
              {duplicatedTech.map((tech, index) => (
                <motion.div
                  key={`${tech}-${index}`}
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-shrink-0 px-6 py-3 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer ${
                    isDark
                      ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:border-blue-500/50'
                      : 'bg-gradient-to-br from-white/80 to-white/40 border border-white/60 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.12)]'
                  }`}
                >
                  <span className={`font-['Outfit'] text-[13px] tracking-wide whitespace-nowrap select-none transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-[#3a3a3a]'
                  }`} style={{ fontWeight: 500 }}>
                    {tech}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Gradient Fade Edges */}
            <div className={`absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10 transition-colors duration-500 ${
              isDark
                ? 'bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent'
                : 'bg-gradient-to-r from-white/40 via-white/20 to-transparent'
            }`}></div>
            <div className={`absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10 transition-colors duration-500 ${
              isDark
                ? 'bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent'
                : 'bg-gradient-to-l from-white/40 via-white/20 to-transparent'
            }`}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Fade-in wrapper component
function FadeInSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}


function ServiceCard({
  icon,
  title,
  description,
  isDark
}: {
  icon: string;
  title: string;
  description: string;
  isDark: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group backdrop-blur-sm rounded-[24px] p-8 transition-all duration-500 h-full flex flex-col ${
        isDark
          ? 'bg-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] border border-white/10 hover:border-blue-500/50 hover:bg-white/10'
          : 'bg-white/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15)] border border-white/60 hover:bg-white/70'
      }`}
    >
      {/* Icon */}
      <div className="text-[32px] mb-5">
        <img
          src={icon}
          alt="icon"
          className="w-[50px] h-auto object-contain"
        />
      </div>

      {/* Title */}
      <h3
        className={`font-['Cormorant_Garamond'] text-[26px] mb-3 tracking-tight ${
          isDark ? 'text-white' : 'text-[#1a1a1a]'
        }`}
        style={{ fontWeight: 500 }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`font-['Outfit'] text-[13px] leading-relaxed tracking-wide flex-grow ${
          isDark ? 'text-gray-400' : 'text-[#6a6a6a]'
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
}

function InfoCard({ icon, label, value, isDark }: { icon: string; label: string; value: string; isDark: boolean }) {
  return (
    <div className={`backdrop-blur-sm rounded-[20px] p-6 transition-all duration-500 ${
      isDark
        ? 'bg-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] border border-white/10 hover:shadow-[0_12px_40px_-10px_rgba(99,102,241,0.2)] hover:border-blue-500/30'
        : 'bg-white/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] border border-white/60 hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)]'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`text-[22px] opacity-40 transition-colors duration-300 ${
          isDark ? 'text-gray-300' : 'text-[#3a3a3a]'
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className={`font-['Outfit'] text-[11px] tracking-[0.15em] uppercase mb-1 transition-colors duration-300 ${
            isDark ? 'text-gray-500' : 'text-[#8a8a8a]'
          }`} style={{ fontWeight: 500 }}>
            {label}
          </div>
          <div className={`font-['Outfit'] text-[15px] tracking-wide transition-colors duration-300 ${
            isDark ? 'text-gray-200' : 'text-[#2a2a2a]'
          }`}>
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function QualificationCard({ degree, institution, year, current, isDark }: { degree: string; institution: string; year: string; current: boolean; isDark: boolean }) {
  return (
    <div className={`backdrop-blur-sm rounded-[24px] p-8 transition-all duration-500 ${
      isDark
        ? 'bg-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] border border-white/10 hover:shadow-[0_12px_40px_-10px_rgba(99,102,241,0.2)] hover:border-blue-500/30'
        : 'bg-white/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] border border-white/60 hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)]'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex-1">
          <h3 className={`font-['Cormorant_Garamond'] text-[24px] mb-2 tracking-tight transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-[#1a1a1a]'
          }`} style={{ fontWeight: 500 }}>
            {degree}
          </h3>
          <p className={`font-['Outfit'] text-[14px] tracking-wide transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-[#6a6a6a]'
          }`}>
            {institution}
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className={`inline-block px-5 py-2 rounded-full backdrop-blur-sm font-['Outfit'] text-[12px] tracking-wide transition-all duration-300 ${
            isDark
              ? 'bg-white/10 text-gray-300 border border-white/20'
              : 'bg-white/60 text-[#5a5a5a] border border-white/40'
          }`}>
            {year}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ role, company, duration, description, current, isDark }: { role: string; company: string; duration: string; description: string; current: boolean; isDark: boolean }) {
  return (
    <div className={`backdrop-blur-sm rounded-[24px] p-8 transition-all duration-500 relative overflow-hidden ${
      isDark
        ? 'bg-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] border border-white/10 hover:shadow-[0_12px_40px_-10px_rgba(99,102,241,0.2)] hover:border-blue-500/30'
        : 'bg-white/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] border border-white/60 hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)]'
    }`}>
      {current && (
        <div className="absolute top-0 right-0 mt-5 mr-5">
          <div className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-['Outfit'] text-[10px] tracking-widest uppercase" style={{ fontWeight: 500 }}>
            Current
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
        <div className="flex-1">
          <h3 className={`font-['Cormorant_Garamond'] text-[26px] mb-2 tracking-tight transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-[#1a1a1a]'
          }`} style={{ fontWeight: 500 }}>
            {role}
          </h3>
          <p className={`font-['Outfit'] text-[15px] tracking-wide transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-[#4a4a4a]'
          }`} style={{ fontWeight: 500 }}>
            {company}
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className={`inline-block px-5 py-2 rounded-full backdrop-blur-sm font-['Outfit'] text-[12px] tracking-wide transition-all duration-300 ${
            isDark
              ? 'bg-white/10 text-gray-300 border border-white/20'
              : 'bg-white/60 text-[#5a5a5a] border border-white/40'
          }`}>
            {duration}
          </div>
        </div>
      </div>
      <p className={`font-['Outfit'] text-[13px] leading-relaxed tracking-wide transition-colors duration-300 ${
        isDark ? 'text-gray-400' : 'text-[#6a6a6a]'
      }`}>
        {description}
      </p>
    </div>
  );
}

function ProjectCard({ image, title, description, isDark }: { image: string; title: string; description: string; isDark: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group backdrop-blur-sm rounded-[24px] overflow-hidden transition-all duration-500 ${
        isDark
          ? 'bg-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] border border-white/10 hover:border-blue-500/50'
          : 'bg-white/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] border border-white/60'
      }`}
    >
      <div className={`aspect-[4/3] overflow-hidden ${
        isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-[#e8e8ea] to-[#f0f0f2]'
      }`}>
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ImageWithFallback
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isDark ? 'opacity-90 group-hover:opacity-100' : 'opacity-100'
            }`}
          />
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className={`font-['Cormorant_Garamond'] text-[24px] mb-2 tracking-tight transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-[#1a1a1a]'
        }`} style={{ fontWeight: 500 }}>
          {title}
        </h3>
        <p className={`font-['Outfit'] text-[13px] leading-relaxed tracking-wide mb-5 transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-[#6a6a6a]'
        }`}>
          {description}
        </p>
        <button className={`font-['Outfit'] text-[12px] tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 group/btn ${
          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#1a1a1a] hover:text-[#000]'
        }`} style={{ fontWeight: 500 }}>
          View Project
          <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </div>
    </motion.div>
  );
}


// Lamp Toggle Component
function LampToggle({ isDark, onToggle, scrollYProgress }: { isDark: boolean; onToggle: () => void; scrollYProgress: any }) {
  const [isHovered, setIsHovered] = useState(false);

  // Parallax effect on scroll
  const lampY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <motion.div
      style={{ y: lampY }}
      className="absolute top-20 right-[8%] hidden lg:block z-20"
    >
      <motion.button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ rotate: [0, -8, 8, -5, 5, 0] }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative cursor-pointer focus:outline-none"
        aria-label="Toggle theme"
      >
      
      <motion.div
  animate={{
    rotate: [-1.5, 1.5, -1.5],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="flex flex-col items-center origin-top"
>
  {/* Hanging Wire */}
  <div
    className={`w-[2px] h-24 transition-colors duration-500 ${
      isDark
        ? "bg-gradient-to-b from-white/30 to-white/20"
        : "bg-gradient-to-b from-gray-400/50 to-gray-500/40"
    }`}
  ></div>

  {/* Lamp Socket */}
  <div
    className={`w-8 h-6 rounded-t-lg transition-all duration-500 ${
      isDark
        ? "bg-gradient-to-b from-gray-700 to-gray-800 border border-white/10"
        : "bg-gradient-to-b from-gray-300 to-gray-400 border border-gray-500/20"
    }`}
  ></div>

  {/* Light Bulb Container */}
  <div className="relative" style={{ transform: "rotate(180deg)" }}>
    {/* Outer Glow */}
    <motion.div
      animate={{
        opacity: isDark ? 0 : isHovered ? 0.9 : 0.7,
        scale: isDark ? 0.8 : isHovered ? 1.15 : 1,
      }}
      transition={{ duration: 0.5 }}
      className="absolute -inset-8 rounded-full bg-gradient-to-br from-yellow-300/40 via-orange-200/30 to-yellow-100/20 blur-2xl"
    />

    {/* Mid Glow */}
    <motion.div
      animate={{
        opacity: isDark ? 0 : isHovered ? 0.8 : 0.5,
        scale: isDark ? 0.7 : isHovered ? 1.2 : 1,
      }}
      transition={{ duration: 0.5 }}
      className="absolute -inset-4 rounded-full bg-gradient-to-br from-yellow-400/50 via-orange-300/40 to-yellow-200/30 blur-xl"
    />

    {/* Light Bulb */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* SVG Bulb */}
      <svg
        width="56"
        height="72"
        viewBox="0 0 56 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Bulb Shape */}
        <motion.path
          d="M28 4C17.5066 4 9 12.5066 9 23C9 29.5 12 34.5 15 39C17 42 18.5 44.5 18.5 48V52H37.5V48C37.5 44.5 39 42 41 39C44 34.5 47 29.5 47 23C47 12.5066 38.4934 4 28 4Z"
          fill={isDark ? "url(#bulbGradientOff)" : "url(#bulbGradientOn)"}
          stroke={isDark ? "#4a5568" : "#fbbf24"}
          strokeWidth="1.5"
          transition={{ duration: 0.5 }}
        />

        {/* Filament */}
        <motion.path
          d="M28 18 L28 38 M24 26 L32 26 M24 30 L32 30"
          stroke={isDark ? "#4a5568" : "#ff9800"}
          strokeWidth={isDark ? 1 : 2}
          strokeLinecap="round"
          animate={{ opacity: isDark ? 0.2 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Base */}
        <rect x="18.5" y="52" width="19" height="3" rx="1" fill={isDark ? "#374151" : "#78716c"} />
        <rect x="18.5" y="56" width="19" height="3" rx="1" fill={isDark ? "#374151" : "#78716c"} />
        <rect x="18.5" y="60" width="19" height="3" rx="1" fill={isDark ? "#374151" : "#78716c"} />
        <rect x="20" y="64" width="16" height="5" rx="1.5" fill={isDark ? "#1f2937" : "#57534e"} />

        {/* Gradients */}
        <defs>
          <radialGradient id="bulbGradientOn" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#fde68a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.85" />
          </radialGradient>

          <radialGradient id="bulbGradientOff" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#374151" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#1f2937" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0.8" />
          </radialGradient>
        </defs>
      </svg>

      {/* Inner Glow */}
      <motion.div
        animate={{
          opacity: isDark ? 0 : isHovered ? 0.7 : 0.5,
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-200 rounded-full blur-md"
      />
    </motion.div>
  </div>

  {/* Light Rays */}
  <motion.div
    animate={{
      opacity: isDark ? 0 : isHovered ? 0.4 : 0.25,
      scale: isDark ? 0 : isHovered ? 1.1 : 1,
    }}
    transition={{ duration: 0.5 }}
    className="absolute top-32 left-1/2 -translate-x-1/2 pointer-events-none"
  >
    <div
      className="w-24 h-32 bg-gradient-to-b from-yellow-200/30 via-yellow-100/10 to-transparent blur-sm"
      style={{
        clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
      }}
    />
  </motion.div>
</motion.div>

        {/* Hint Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
          className={`absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-['Outfit'] text-[11px] tracking-wider uppercase ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {isDark ? 'Turn On' : 'Turn Off'}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}