// App.js
import './App.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/header/Header';
import Home from '../components/home/Home';
import About from '../components/about/About';
import Skills from '../components/skills/Skills';
import Qualification from '../components/qualification/Qualification';
import Work from '../components/work/Work';
import Contact from '../components/contact/Contact';
import Footer from '../components/footer/Footer';
import ScrollUp from '../components/scrollup/ScrollUp';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);

  const colors = {
    base: 'rgba(255, 215, 0, 0.8)', // bright gold
    accent: '#FFD700',
    glow: '0 0 10px 2px rgba(255, 223, 0, 0.6)',
    ring: '#FFED8B',
  };

  // Handle Mouse Position
  useEffect(() => {
    const mouseMove = (e) => {
      const dx = e.clientX - prevPosition.x;
      const dy = e.clientY - prevPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      setVelocity(Math.min(distance, 10));
      setPrevPosition({ x: e.clientX, y: e.clientY });
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [prevPosition]);

  // Change cursor on interactions
  useEffect(() => {
    const handleDown = () => setCursorVariant("click");
    const handleUp = () => setCursorVariant("default");

    const hoverStart = () => setCursorVariant("hover");
    const hoverEnd = () => setCursorVariant("default");

    const elements = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
    elements.forEach(el => {
      el.addEventListener("mouseenter", hoverStart);
      el.addEventListener("mouseleave", hoverEnd);
    });

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    document.body.style.cursor = 'none';
    return () => {
      elements.forEach(el => {
        el.removeEventListener("mouseenter", hoverStart);
        el.removeEventListener("mouseleave", hoverEnd);
      });
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Cursor animation styles
  const mainCursorVariants = {
    default: { scale: 1, backgroundColor: colors.base },
    hover: { scale: 1.5, backgroundColor: colors.accent },
    click: { scale: 0.8, backgroundColor: colors.accent }
  };

  const ringVariants = {
    default: { scale: 1, opacity: 0.6 },
    hover: { scale: 1.4, opacity: 0.9 },
    click: { scale: 0.6, opacity: 1 }
  };

  const transition = {
    type: "spring",
    stiffness: 500,
    damping: 25
  };

  return (
    <>
      {/* Center Glowing Cursor */}
      <motion.div
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={transition}
        style={{
          position: "fixed",
          zIndex: 10000,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)"
        }}
      >
        <motion.div
          className="main-cursor"
          variants={mainCursorVariants}
          animate={cursorVariant}
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            boxShadow: colors.glow,
            transition: "all 0.2s ease",
            transform: "rotate(45deg)"
          }}
        />
      </motion.div>

      {/* Ring Cursor */}
      <motion.div
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ ...transition, stiffness: 300 }}
        style={{
          position: "fixed",
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)"
        }}
      >
        <motion.div
          className="ring-cursor"
          variants={ringVariants}
          animate={cursorVariant}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `2px solid ${colors.ring}`,
            boxShadow: colors.glow,
            transition: "all 0.3s ease"
          }}
        />
      </motion.div>

      {/* Ripple Click Effect */}
      {cursorVariant === "click" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          style={{
            position: "fixed",
            top: mousePosition.y,
            left: mousePosition.x,
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: `2px solid ${colors.accent}`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 9998
          }}
        />
      )}

      {/* Components */}
      <Header />
      <main className="main">
        <Home />
        <Work />
        <Skills />
        <Qualification />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
}

export default App;
