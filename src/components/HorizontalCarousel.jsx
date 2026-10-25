import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import React from 'react';

const CarouselContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;
  height: 165px;

  background-color: #000000;

  @media screen and (max-width: 767px) {
    height: 115px;
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  will-change: transform;
  padding: 7px;
`;

const Image = styled.img`
  height: 150px;
  width: auto; /* Ensure all images have the same width */
  object-fit: cover; /* Prevent stretching */
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: 767px) {
    height: 100px;
    width: auto;
  }
`;

const FullScreenOverlay = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FullScreenImage = styled.img`
  max-width: 99vw;
  max-height: 99vh;
  border-radius: 5px;
`;

export default function HorizontalCarousel() {
  const [scrollAmount, setScrollAmount] = useState(0);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const wrapperRef = useRef(null);

  const images = [
    ' https://assets2.lordcartel.com/landscape-1.webp',
    ' https://assets2.lordcartel.com/landscape-2.webp',
    ' https://assets2.lordcartel.com/landscape-3.webp',
    ' https://assets2.lordcartel.com/landscape-4.webp',
    ' https://assets2.lordcartel.com/landscape-5.webp',
    ' https://assets2.lordcartel.com/landscape-6.webp',
    ' https://assets2.lordcartel.com/landscape-7.webp',
  ];
  useEffect(() => {
    const scrollSpeed = 1;

    const interval = setInterval(() => {
      setScrollAmount((prev) => {
        if (!wrapperRef.current) return prev;

        const halfWidth = wrapperRef.current.scrollWidth / 2;

        return prev >= halfWidth ? 0 : prev + scrollSpeed;
      });
    }, 18);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CarouselContainer>
        <CarouselWrapper
          ref={wrapperRef}
          style={{ transform: `translateX(-${scrollAmount}px)` }}
        >
          {[...images, ...images].map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Image ${(index % images.length) + 1}`}
              onClick={() => setFullScreenImage(image)}
            />
          ))}
        </CarouselWrapper>
      </CarouselContainer>

      {/* Full Screen Image Viewer */}
      <FullScreenOverlay
        show={fullScreenImage}
        onClick={() => setFullScreenImage(null)}
      >
        {fullScreenImage && <FullScreenImage src={fullScreenImage} />}
      </FullScreenOverlay>
    </>
  );
}
