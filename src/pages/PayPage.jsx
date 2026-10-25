import React from 'react';
import Header from '../components/Header';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import HorizontalCarousel from '../components/HorizontalCarousel';
import { Copy } from 'lucide-react';

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

const PayPage = () => {
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

  const walletAddress = '0xb4ee693ff5c651ab03d4cdb58e7c54f62bb98d78';

  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <div className="brand-engine-marketing-6">
        <div className="marketing-inner">
          <h1 className="marketing-title">
            PAY FOR
            <span> BRAND ENGINE</span>
          </h1>
          <p className="marketing-eyebrow">
            Hope you have contacted us before payment to finalise everything.
          </p>

          <p className="marketing-description">
            We accept Usd Bank Transfer And Crypto Usdt.
          </p>
          <p className="marketing-eyebrow">Usd Bank Account</p>
          <p className="marketing-description">
            Account holder: KENECHUKWU EMMANUEL EJIKE
          </p>
          <p className="marketing-description">Account number: 211834499515</p>
          <p className="marketing-description">Wire Routing: 101019644</p>
          <p className="marketing-description">ACH Routing: 101019644</p>
          <p className="marketing-description">Account type: Checking</p>
          <p className="marketing-description">Bank name : Lead</p>
          <p className="marketing-description">
            Deposits from individuals cannot exceed $4,000 Per transfer.
            Deposits from businesses have no limit.
          </p>
          <p className="marketing-eyebrow">Usdt Wallet</p>
          <p className="marketing-description">
            Network : BSC BNB Smart chain (BEP20)
          </p>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            className="marketing-description"
          >
            <span
              style={{
                overflowWrap: 'anywhere',
                whiteSpace: 'normal',
                minWidth: 0,
                flex: 1,
              }}
            >
              {walletAddress}
            </span>

            <button
              onClick={() => navigator.clipboard.writeText(walletAddress)}
              title="Copy wallet address"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                maxWidth: '70vw',
              }}
            >
              <Copy size={16} />
            </button>
          </div>
          <p className="marketing-description">
            Pls cross check details and use the exact network, or do small
            testing. Contact us if you need different network.
          </p>
          <p className="marketing-eyebrow">About Refund</p>
          <p className="marketing-description">
            We Only offer full refund if we failed to deliver your brand engine
            on delivery date.
          </p>
          <a href="/contact" className="marketing-button">
            Contact Us <span>↗</span>
          </a>
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

export default PayPage;
