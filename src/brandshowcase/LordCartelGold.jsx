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

const LordCartelGold = () => {
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
      {/* <StyledIframe className="carousel" src="http://localhost:5174/thor" /> */}
      {/* <StyledIframe
        className="carousel"
        src="http://localhost:5174/thor"
        scrolling="no"
        allowFullScreen
      /> */}
      {/* <iframe
        className="carousel"
        src="http://localhost:5174/thor"
        scrolling="no"
        allowFullScreen
        style={{
          width: '100%',
          height: '70vh',
          border: '0',
          margin: '0',
          padding: '0',
          outline: '0',
          overflow: 'hidden',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      /> */}

      <iframe
        ref={iframeRef}
        className="carousel"
        src="https://brandenginev.lordcartel.com/LordCartel"
        scrolling="no"
        allowFullScreen
        style={{
          width: '100%',
          height: iframeHeight,
          border: '0',
          margin: '0',
          padding: '0',
          outline: '0',
          overflow: 'hidden',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
      <div className="seperation-div"></div>
      <div className="BrandGod-div">
        <div className="marketing-inner">
          <p className="marketing-eyebrow">
            Now I Am Become Death , Destroyer Of Designs.
          </p>
          <p className="marketing-eyebrow">Lord Cartel Presents -</p>

          <h1 className="marketing-title">
            Brand
            <span> God</span>
          </h1>

          <p className="marketing-intro">
            The highest form of the brand engine
          </p>

          <p className="marketing-description">
            You get your flying video assets with full screen viewable videos ,
            working link buttons, music experence, any 3d model of your choice,
            cinematic 360 worlds, dashboard with 80 plus settings for you to
            play with.
          </p>
          <p className="marketing-description">
            Customise your brandengine and change the look of your brand
            experience with the click of a button
          </p>

          <p className="marketing-description">
            No need to start throwing away your old site or app. Just embed the
            brand engine through our link.
          </p>

          <p className="marketing-description">
            Brand Engine works on all screen size by auto adjusting, it was
            created to work on all device including Low end device like low
            budget phone below 4gb ram .
          </p>
          <p className="marketing-description">
            The heaviest form of brand engine run at very low ram memory of
            between 100 to 300mb ram so its lighter than running youtube .
          </p>
          <p className="marketing-description">
            Brand God is the Heaviest. It is extremely light weight , we can
            make it even more lighter at your request
          </p>

          <div className="marketing-cta">
            <h2>DON'T JUST SHOW YOUR BRAND.</h2>
            <h2>MAKE THEM EXPERIENCE IT.</h2>

            <p>The next evolution of your digital presence starts here.</p>

            <a href="/pricing" className="marketing-button">
              Release Your Brand Engine <span>↗</span>
            </a>
          </div>
        </div>
      </div>
      <div className="seperation-div"></div>
      <div className="banner-container">
        <img
          src="https://assets2.lordcartel.com/banner-3.webp "
          alt="Lord Cartel banner"
          className="banner-image"
        />
      </div>

      <Footer />
    </div>
  );
};

export default LordCartelGold;
