// The imports

import styled from 'styled-components';
import Center from '../components/Center';
import { Route, Routes, Navigate, NavLink } from 'react-router-dom';
import BarsIcon from './icons/Bars';
import React, { useState } from 'react';

const StyledHeader = styled.header`
  background-color: #0e0e10;
  width: 100%;
  z-index: 100;
  font-size: 2vh;
  font-style: Bold;
`;

const Logo = styled(NavLink)`
  color: #f7f7f7;
  text-decoration: none;
  font-family: 'Rye', serif;
  position: relative;
  z-index: 3;
  &:hover {
    color: #ffc400;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  ${(props) => (props.$mobileNavActive ? 'display: block;' : 'display: none;')}

  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #000000; /* Slight transparency */
  z-index: 1000;
  transition: transform 0.3s ease-in-out;

  transform: ${(props) =>
    props.$mobileNavActive ? 'translateX(0)' : 'translateX(100%)'};

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;

    background-color: transparent;
    transform: none;
  }
`;

const ExternalLink = styled(NavLink)`
  color: #eaecee;
  text-decoration: none;
  display: block;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavLink2 = styled(NavLink)`
  color: #e7e7e7;
  text-decoration: none;
  display: block;
  padding: 10px 0;
  font-family: 'Rye', serif;
  &:hover {
    color: #ffc400;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const NavOverlay = styled.div`
  display: ${(props) => (props.$mobileNavActive ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000; /* Dark overlay */
  z-index: 999;
`;
export default function Header() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo to={'/homepage'}>Lord Cartel</Logo>

          <NavOverlay
            $mobileNavActive={mobileNavActive}
            onClick={() => setMobileNavActive(false)}
          />

          <StyledNav $mobileNavActive={mobileNavActive}>
            <NavLink2 to="/homepage" onClick={() => setMobileNavActive(false)}>
              Home
            </NavLink2>
            <NavLink2 to={'/login'} onClick={() => setMobileNavActive(false)}>
              Login
            </NavLink2>
            <NavLink2 to={'/signup'} onClick={() => setMobileNavActive(false)}>
              Sign Up
            </NavLink2>
            <NavLink2 to={'/pricing'} onClick={() => setMobileNavActive(false)}>
              Pricing
            </NavLink2>
            <NavLink2
              to={'/showcasepage'}
              onClick={() => setMobileNavActive(false)}
            >
              Showcase
            </NavLink2>
            <NavLink2 to={'/contact'} onClick={() => setMobileNavActive(false)}>
              Contact
            </NavLink2>
            {/* Link to chat web app */}
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
