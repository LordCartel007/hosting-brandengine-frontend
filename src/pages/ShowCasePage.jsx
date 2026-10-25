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

import '../components/Cards.css';

const cards = [
  {
    title: 'Brand God',
    image: 'https://assets2.lordcartel.com/brandgod.webp',

    link: '/lordcartelgold',
  },
  {
    title: 'Brand Slayer',
    image: 'https://assets2.lordcartel.com/brandslayer.webp',

    link: '/lordcartelblue',
  },

  {
    title: 'Brand Reaper',
    image: 'https://assets2.lordcartel.com/brandreaper.webp',

    link: '/reaperengine',
  },

  {
    title: 'Brand OverLord',
    image: 'https://assets2.lordcartel.com/brandoverlord.webp',

    link: '/overlordengine',
  },
];

export default function ShowCasePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <section className="cards-section">
        <div className="showcase-heading">
          <h1>
            Click to view some of the infinite possibilities of the brand engine
          </h1>
        </div>
        <div className="cards-grid">
          {cards.map((card) => (
            <div
              className="image-card"
              key={card.title}
              onClick={() => {
                window.location.href = card.link;
              }}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(card.link);
                }
              }}
            >
              <div className="image-card-image">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>

              <h3 className="image-card-title">{card.title}</h3>
            </div>
          ))}
        </div>
      </section>
      <div className="seperation-div"></div>
      <div className="banner-container">
        <img
          src="https://assets2.lordcartel.com/banner-3.webp"
          alt="Lord Cartel banner"
          className="banner-image"
        />
      </div>
      <HorizontalCarousel />

      <Footer />
    </div>
  );
}
