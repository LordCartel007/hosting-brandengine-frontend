import React from 'react';
import Header from '../components/Header';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import HorizontalCarousel from '../components/HorizontalCarousel';

const Title = styled.h1`
  font-weight: bolder;

  margin-top: 20px;
  color: #ffffff;
  text-decoration: none;
  font-family: 'Rye', serif;
  font-weight: 400;
  font-style: normal;
  flex: 1; /* Makes title fill available space */
  justify-content: center;

  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }

  @media screen and (min-width: 767px) {
    font-size: 3rem;
  }

  /* nest hub tv screen */
  @media screen and (min-width: 1023px) {
    font-size: 4rem;
  }
`;

const Pwords = styled.p`
  font-weight: bolder;

  margin: 0;
  color: #ffc107;
  text-decoration: none;
  font-family: 'Rye', serif;
  font-weight: 400;
  font-style: normal;
  flex: 1; /* Makes title fill available space */
  justify-content: center;

  @media screen and (max-width: 767px) {
    font-size: 0%.9;
  }

  @media screen and (min-width: 767px) {
    font-size: 1.2rem;
  }

  /* nest hub tv screen */
  @media screen and (min-width: 1023px) {
    font-size: 1.3rem;
  }
`;
const PathButton = styled.button`
  background-color: #ffc107;
  color: #0e0e10; /* Text color */
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px; /* Optional: Rounded corners */
  font-family: 'Rye', serif;
  margin-top: 25px;
  padding: 10px;
  width: 200px;
  height: 50px;
  font-style: normal;

  @media screen and (max-width: 768px) {
    font-size: 10px;
    height: 40px;
    width: 90px;
  }
`;

const StyledDiv = styled.div`
  height: 50vh;
  width: 100vw;
  @media screen and (max-width: 767px) {
    height: 30vh;
    width: 100vw;
  }
`;

const StyledVideo = styled.video`
  height: 100vh;
  width: 100vw;
  @media screen and (max-width: 767px) {
    height: 100vh;
    width: 100vw;
  }
`;

const StyledTitleDiv = styled.div`
  justify-content: center;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
`;

const StyledVideotwo = styled.video`
  height: 100vh;
  width: 100vw;
  @media screen and (max-width: 767px) {
    height: 70vh;
    width: 100vw;
  }
`;

// const StyledIframe = styled.iframe`
//   width: 100%;
//   height: 70vh;
//   border: none;
//   margin: 0;
//   padding: 0;
//   border: 0;
//   outline: 0;
//   overflow: hidden;
//   display: block;
//   max-width: 100%;
//   max-height: 100%;
//    allowFullScreen

// `;

import '../components/pricing-card.css';

const engines = [
  {
    title: 'Brand Reaper',
    description:
      'Eliminate ordinary. Give your brand a dark, immersive presence that refuses to blend in. Brand engine for pics without 3d model',
    price: '3,220',
    level: '01',
    image: 'https://assets2.lordcartel.com/brandreaper.webp',
    alt: 'Brand Reaper',
    link: '/paypage',
    viewengine: '/reaperengine',
    sub: '200',
  },
  {
    title: 'Brand Slayer',
    description:
      'Make your products impossible to ignore with a dynamic and distinctive interactive experience.  Brand engine for pics with 3d model',
    price: '5,250',
    level: '02',
    image: 'https://assets2.lordcartel.com/brandslayer.webp',
    alt: 'Brand Slayer',
    link: '/paypage',
    viewengine: '/lordcartelblue',
    sub: '200',
  },
  {
    title: 'Brand Overlord',
    description:
      'Command attention with a premium brand experience built to stand apart from conventional websites. Brand engine for videos without 3d model',
    price: '10,470',
    level: '03',
    image: 'https://assets2.lordcartel.com/brandoverlord.webp',
    alt: 'Brand Overlord',
    link: '/paypage',
    viewengine: '/overlordengine',
    sub: '400',
  },
  {
    title: 'Brand God',
    description:
      'The ultimate expression of your brand. Create a commanding, high-impact experience with no ordinary limits. Brand engine for videos with 3d model',
    price: '12,480',
    level: '04',
    image: 'https://assets2.lordcartel.com/brandgod.webp',
    alt: 'Brand God',
    link: '/paypage',
    viewengine: '/lordcartelgold',
    sub: '400',
  },
];

const PricingPage = () => {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState('');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type !== 'brand-engine-view-display-height') {
        return;
      }

      const height = event.data.height;

      if (typeof height !== 'number') {
        return;
      }

      setIframeHeight(`${height}vh`);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="pricing-div">
        <div className="content-pricing">
          <section className="pricing-section">
            <div className="pricing-heading">
              <h2 className="pricing-grid-title">Release Your Brand Engine.</h2>
              <h3 className="pricing-grid-title">
                A Fine Brand Is It's Own Reward.
              </h3>
              <h5 className="pricing-grid-title">
                Payment should only be made on our website with a verified
                domain
              </h5>
              <p>
                2 Engines, 4 Levels, 4 Modes. One new standard for brand
                experiences.
              </p>
              <p>Using the brand engine you accept our terms and conditions.</p>
            </div>

            <div className="pricing-grid">
              {engines.map((engine) => (
                <article className="pricing-card" key={engine.level}>
                  <div className="pricing-image">
                    <img src={engine.image} alt={engine.alt} loading="lazy" />
                  </div>

                  <h3 className="pricing-grid-title">{engine.title}</h3>

                  <p className="pricing-description">{engine.description}</p>

                  <div className="pricing-divider" />

                  <div className="pricing-price">
                    <span className="pricing-dollar">$</span>
                    <span className="pricing-amount">{engine.price}</span>
                  </div>

                  <span className="pricing-period">Setup price</span>
                  <div className="custom-360-price">
                    <span className="custom-360-amount">+$3,120</span>
                    <span className="custom-360-description">
                      Custom 360° World
                    </span>
                  </div>
                  <div className="custom-360-price">
                    <span className="custom-360-amount">
                      <span className="">$</span>
                      <span className="">{engine.sub}</span>
                    </span>
                    <span className="custom-360-description">
                      Monthly Subscription Bandwidth
                    </span>
                    <span className="custom-360-description">
                      Cost per million unit
                    </span>
                  </div>
                  <div className="pricing-label">
                    Engine Level {engine.level}
                  </div>
                  <a href={engine.viewengine} className="pricing-buy-btn">
                    View Engine <span>↗</span>
                  </a>
                  <a href={engine.link} className="pricing-buy-btn">
                    Buy Now <span>↗</span>
                  </a>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="seperation-div"></div>
      <div className="banner-container">
        <img
          src="https://assets2.lordcartel.com/banner-2.webp"
          alt="Lord Cartel banner"
          className="banner-image"
        />
      </div>
      <HorizontalCarousel />

      <Footer />
    </div>
  );
};

export default PricingPage;
