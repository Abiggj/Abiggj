import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight > 0) {
      const percent = (scrollTop / docHeight) * 100;
      setScrollPercent(percent);
    }
    
    // Deem "at top" if scroll position is less than 100px
    setIsAtTop(scrollTop < 100);
  };

  const handleClick = () => {
    if (isAtTop) {
      // Scroll down to next segment (by 85% of viewport height)
      window.scrollTo({
        top: window.innerHeight * 0.85,
        behavior: 'smooth'
      });
    } else {
      // Scroll back to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial run
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="scroll-indicator-widget scrolled"
      onClick={handleClick}
      title={isAtTop ? 'Scroll Down' : 'Scroll to Top'}
    >
      <svg className="progress-circle" viewBox="0 0 100 100">
        <circle className="circle-bg" cx="50" cy="50" r="45" />
        <circle 
          className="circle-progress" 
          cx="50" 
          cy="50" 
          r="45" 
          style={{ strokeDashoffset: 283 - (283 * scrollPercent) / 100 }}
        />
      </svg>
      <div className="indicator-icon">
        {isAtTop ? (
          <FaArrowDown className="arrow-down-anim" />
        ) : (
          <FaArrowUp />
        )}
      </div>
    </div>
  );
};

export default ScrollIndicator;
