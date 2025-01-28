import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import bg1 from '/images/jblearphone.png';
import './earphonetransition.css';

const Earphonetransition = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Trigger animation every time it comes into view
    threshold: 0.1, // Percentage of the element's visibility to trigger the animation
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const imageVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: '0%', opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  const textVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: '0%', opacity: 1, transition: { duration: 1, ease: 'easeOut', delay: 0.5 } },
  };

  return (
    <div className="overall-container" ref={ref}>
      <motion.img
        src={bg1}
        alt="Transitioning Content"
        className="image"
        initial="hidden"
        animate={controls}
        variants={imageVariants}
      />
      <motion.div
        className="text-container"
        initial="hidden"
        animate={controls}
        variants={textVariants}
      >
        <h1>Top selling earbuds</h1>
        <Link to="/earphones">
          <button className="cta-button">See Products</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Earphonetransition;
