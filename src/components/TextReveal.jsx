import React from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({ 
  text, 
  children,
  delay = 0, 
  duration = 0.5, 
  stagger = 0.05, 
  className = "", 
  style = {} 
}) {
  const content = text || children;
  
  if (typeof content !== 'string') {
    return <span className={className} style={style}>{content}</span>;
  }

  // Split text into words for animation
  const words = content.split(' ');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      style={{ display: "inline-block", ...style }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={item}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
