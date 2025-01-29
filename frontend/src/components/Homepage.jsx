import Slider from './slider';
import React, { useEffect, useRef } from 'react';
import './Homepage.css';
import Earphonetransition from './transitions/Earphone';
import Speaker from './transitions/Speaker';
import Gamingtransition from './transitions/gamingheadphones';

const Homepage = () => {
  const fadeInRef1 = useRef(null);
  const fadeInRef2 = useRef(null);
  const fadeInRef3 = useRef(null);
  
  useEffect(() => {
    const fadeInElements = [fadeInRef1.current, fadeInRef2.current, fadeInRef3.current];
    fadeInElements.forEach((element, index) => {
      if (element) {
        element.style.animation = `fadeIn 1s ease-in-out ${index * 0.5}s forwards`;
      }
    });
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
                <p className="fade-in-text" ref={fadeInRef1}>best selling earphones</p>
                <br />
                <Earphonetransition />
                <br/>
                <p className="fade-in-text" ref={fadeInRef2}>best selling Speakers</p>
                <br/>
                <Speaker/>
                <br/>
                <p className="fade-in-text" ref={fadeInRef3}>best selling Gaming Headphones</p>
                <br/>
                <Gamingtransition/>
                <br/>
            </div>
        </>
    )
}

export default Homepage;