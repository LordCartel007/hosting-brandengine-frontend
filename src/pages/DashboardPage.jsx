import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { formatDate } from '@/utils/date';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { Route, Routes, Navigate } from 'react-router-dom';
import CarouselUpload from '../components/CarouselUpload';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/store/authStore';
import HorizontalCarousel from '../components/HorizontalCarousel';

const StyledDiv = styled.div`
  @media screen and (max-width: 767px) {
  }
  font-family: 'Rye', serif;
`;

const DashboardPage = ({ targetUserName, setTargetUserName }) => {
  const { user, logout } = useAuthStore();
  const [dashboardUser, setDashboardUser] = useState(user);

  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
  };

  if (user && !user.isVerified) {
    return (
      // <div className="text-center text-red-400 mt-20 text-xl font-semibold">
      //   Your email is not verified. Please check your inbox to verify.
      // </div>
      <Navigate to="/homepage" replace />
    );
  }

  return (
    <>
      <div className="background-section">
        <div className="background-content">
          <Header />
          {/* <div className="background-pic-1"> */}

          <StyledDiv className="content-div">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full mx-auto
    mt-10 p-8 
    backdrop-filter  rounded-xl
    shadow-2xl border border-gray-800  dashdiv
    "
            >
              <h2
                className="dasboard-text text-3xl font-bold mb-6 text-center 
    bg-gradient-to-r   bg-clip-text p-4"
              >
                Dashboard
              </h2>
              <div className="space-y-6 mb-6">
                <motion.div
                  className=" dasboard-text p-4 bg-gray-800 bg-opacity-50 rounded-lg
    border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-300">
                    {' '}
                    Now I am become death , Destroyer of designs .
                  </p>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  className=" dasboard-text p-4 bg-gray-800 bg-opacity-50 rounded-lg
    border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3
                    className="dasboard-text text-xl font-semibold  
    mb-3"
                  >
                    Profile Information
                  </h3>
                  {/* <p className="text-gray-300"> Name: {user.name}</p>
                <p className="text-gray-300"> Email: {user.email}</p>
                <p className="text-gray-300"> UserName: {user.userName}</p>
                <p className="text-gray-300"> UserRole: {user.userRole}</p> */}
                  <p className="text-gray-300"> Name: {dashboardUser.name}</p>
                  <p className="text-gray-300"> Email: {dashboardUser.email}</p>
                  <p className="text-gray-300">
                    {' '}
                    UserName: {dashboardUser.userName}
                  </p>
                  <p className="text-gray-300">
                    {' '}
                    UserRole: {dashboardUser.userRole}
                  </p>
                </motion.div>
                <motion.div
                  className="p-4 bg-gray-800 bg-opacity-50
        rounded-lg border border-gray-700 dasboard-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3
                    className="dasboard-text text-xl font-semibold 
          mb-3"
                  >
                    Account Activity
                  </h3>
                  <p className="text-gray-300">
                    <span className="font-bold"> Joined: </span>
                    {new Date(dashboardUser.createdAt).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-bold"> Last Login: </span>
                    {formatDate(dashboardUser.lastLogin)}
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 dasboard-text"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/analyticspage')}
                  className="dasboard-text button w-full py-3 px-4     
               "
                >
                  View Analytics
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 dasboard-text"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="dasboard-text button w-full py-3 px-4     
             "
                >
                  Logout
                </motion.button>
              </motion.div>
            </motion.div>

            <div className="upload-div">
              <CarouselUpload
                targetUserName={targetUserName}
                setTargetUserName={setTargetUserName}
                onUserChange={async (targetUserName) => {
                  try {
                    if (!targetUserName) {
                      setDashboardUser(user);
                      return;
                    }

                    const res = await axios.get(`${API_URL}/check-auth`, {
                      params: {
                        targetUserName,
                      },
                      withCredentials: true,
                    });

                    setDashboardUser(res.data.user);
                  } catch (error) {
                    console.error('❌ DASHBOARD USER ERROR:', error);
                  }
                }}
              />
            </div>
          </StyledDiv>

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
      </div>
    </>
  );
};

export default DashboardPage;
