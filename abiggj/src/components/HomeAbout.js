import React, { useEffect, useState } from 'react';
import './HomeAbout.css';
import profilePic from '../assets/profile.png';

const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Carousel ${index}`}
          className={index === currentImage ? 'active' : ''}
        />
      ))}
    </div>
  );
};

const HomeAbout = () => {
  const aboutImages = importAll(require.context('../assets/about', false, /\.(png|jpe?g|svg)$/));
  const ambitionImages = importAll(require.context('../assets/ambition', false, /\.(png|jpe?g|svg)$/));
  const achievementImages = importAll(require.context('../assets/achievements', false, /\.(png|jpe?g|svg)$/));

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const options = {
      root: null,
      threshold: 0.5,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="home-about">
      <section className="section greeting">
        <div className="content">
          <div className="image-container">
            <img src={profilePic} alt="Your Name" />
          </div>
          <div className="text">
            <h1>Hello, I am Aniket Jhariya</h1>
            <p>Hi! I'm a passionate and innovative developer with a strong background in combining technology and creativity to build impactful solutions. My expertise spans across various domains, including AI, machine learning, data analysis, and app development. I thrive on solving complex problems and continuously expanding my knowledge to stay at the forefront of technological advancements.</p>
          </div>
        </div>
      </section>

      <section className="section about">
        <div className="content">
          <div className="image-container">
            <Carousel images={aboutImages} />
          </div>
          <div className="text">
            <h2>About Me</h2>
            <p>[Your description here. Talk about your background, interests, and passion for AIML.]</p>
          </div>
        </div>
      </section>

      <section className="section ambitions">
        <div className="content">
          <div className="image-container">
            <Carousel images={ambitionImages} />
          </div>
          <div className="text">
            <h2>My Ambitions</h2>
            <p>[Describe your career goals, philosophies, and what you want to achieve in the field of AIML.]</p>
          </div>
        </div>
      </section>

      <section className="section achievements">
        <div className="content">
          <div className="image-container">
            <Carousel images={achievementImages} />
          </div>
          <div className="text">
            <h2>Achievements</h2>
            <ul>
              <li>[Achievement 1]</li>
              <li>[Achievement 2]</li>
              <li>[Achievement 3]</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

function importAll(r) {
  return r.keys().map(r);
}

export default HomeAbout;