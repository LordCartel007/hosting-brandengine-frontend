import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HorizontalCarousel from '../components/HorizontalCarousel';

const StyledDiv = styled.div`
  @media screen and (max-width: 767px) {
  }
  font-family: 'Rye', serif;
`;

const Page = styled.div`
  min-height: 100vh;
  background: #0e0e10;
  color: white;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  margin-top: 20px;
`;

const Title = styled.h1`
  font-family: 'Rye', serif;
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const TotalBox = styled.div`
  background: #18181c;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
`;

const TotalLabel = styled.p`
  margin: 0 0 10px;
  font-size: 1rem;
  opacity: 0.7;
`;

const TotalNumber = styled.h2`
  margin: 0;
  font-size: 3rem;
`;

const Day = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #18181c;
  border-radius: 10px;
  padding: 18px 20px;
  margin-bottom: 10px;
`;

const DateText = styled.span`
  font-size: 1rem;
`;

const ViewsText = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Rye', serif;
  font-size: 1rem;
`;

const AnalyticsPage = () => {
  const { user } = useAuthStore();

  const [totalViews, setTotalViews] = useState(0);
  const [viewsByDay, setViewsByDay] = useState({});
  const [visibleDays, setVisibleDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //api upload
  const API = import.meta.env.VITE_APIUPLOAD;

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await axios.get(`${API}/carousel`, {
          withCredentials: true,
        });

        const settings = res.data.settings;

        setTotalViews(settings?.totalViews ?? 0);

        setViewsByDay(settings?.viewsByDay ?? {});
      } catch (error) {
        console.error('Analytics error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (user && !user.isVerified) {
    return <Navigate to="/homepage" replace />;
  }

  const sortedDays = Object.entries(viewsByDay).sort(
    ([dateA], [dateB]) =>
      new Date(`${dateB}T00:00:00`) - new Date(`${dateA}T00:00:00`),
  );

  const displayedDays = sortedDays.slice(0, visibleDays);

  if (loading) {
    return (
      <Page>
        <Header />

        <Container>
          <Title>Analytics</Title>
          <p>Loading...</p>
        </Container>

        <Footer />
      </Page>
    );
  }

  return (
    <Page>
      <div className="background-section">
        <div className="background-content">
          <Header />

          <Container className="analytic-div">
            <Title>Analytics</Title>
            <StyledDiv>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 dasboard-text"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="dasboard-text button w-full py-3 px-4     
             "
                >
                  Back To DashBoard
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
                  onClick={() => navigate('/viewspage')}
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
                  onClick={() => navigate('/viewsdurationpage')}
                  className="dasboard-text button w-full py-3 px-4     
             "
                >
                  Engagement Duration
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
                  onClick={() => navigate('/bandwidth')}
                  className="dasboard-text button w-full py-3 px-4     
             "
                >
                  Bandwidth Analytics
                </motion.button>
              </motion.div>
            </StyledDiv>
          </Container>
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
    </Page>
  );
};

export default AnalyticsPage;
