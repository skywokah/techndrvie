import Slider from './slider';
import React, { useEffect, useRef } from 'react';
import './Homepage.css';
import Earphonetransition from './transitions/Earphone';
import Speaker from './transitions/Speaker';
import Gamingtransition from './transitions/gamingheadphones';
const Homepage = () => {
    const fadeInRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        },
        {
          threshold: 0.1, // Adjust the threshold as needed
        }
      );
  
      if (fadeInRef.current) {
        observer.observe(fadeInRef.current);
      }
  
      return () => {
        if (fadeInRef.current) {
          observer.unobserve(fadeInRef.current);
        }
      };
    }, []);

    return(
        <>
        <div className="video-background">
                <video 
                    src="/background.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                ></video>
            </div>
            <div className="content">
                <Slider />
                <br/>
                <p className="fade-in-text" ref={fadeInRef}>best selling earphones</p>
                <br />
                <Earphonetransition />
                <br/>
                <p className="fade-in-text" ref={fadeInRef}>best selling Gaming Headphones</p>
                <br/>
                <Speaker/>
                <br/>
                <p className="fade-in-text" ref={fadeInRef}>best selling Gaming Headphones</p>
                <br/>
                <Gamingtransition/>
                <br/>
            </div>
        </>
    )
}

export default Homepage;