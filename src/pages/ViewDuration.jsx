import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HorizontalCarousel from '../components/HorizontalCarousel';

const StyledDiv = styled.div`
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

const DurationText = styled.span`
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
const InfoValue = styled.h3`
  margin: 0;
  font-size: 1.5rem;
`;
// =========================================================
// FORMAT SECONDS
// =========================================================

const formatDuration = (seconds) => {
  const totalSeconds = Math.max(0, Math.floor(Number(seconds) || 0));

  const SECONDS_PER_MINUTE = 60;
  const SECONDS_PER_HOUR = 60 * 60;
  const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;
  const SECONDS_PER_YEAR = 365 * SECONDS_PER_DAY;

  const years = Math.floor(totalSeconds / SECONDS_PER_YEAR);

  const days = Math.floor((totalSeconds % SECONDS_PER_YEAR) / SECONDS_PER_DAY);

  const hours = Math.floor((totalSeconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR);

  const minutes = Math.floor(
    (totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );

  const remainingSeconds = totalSeconds % SECONDS_PER_MINUTE;

  const parts = [];

  if (years > 0) {
    parts.push(`${years}y`);
  }

  if (days > 0) {
    parts.push(`${days}d`);
  }

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }

  // Always show seconds when there are no larger units,
  // or when there are remaining seconds.
  if (remainingSeconds > 0 || parts.length === 0) {
    parts.push(`${remainingSeconds}s`);
  }

  return parts.join(' ');
};

const ViewsDuration = ({ targetUserName }) => {
  const { user } = useAuthStore();

  const [totalViewDuration, setTotalViewDuration] = useState(0);

  const [viewDurationByDay, setViewDurationByDay] = useState({});

  const [visibleDays, setVisibleDays] = useState(30);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //api upload
  const API = import.meta.env.VITE_APIUPLOAD;
  // =========================================================
  // LOAD ANALYTICS
  // =========================================================

  useEffect(() => {
    //   const loadAnalytics = async () => {
    //     try {
    //       const res = await axios.get(`${API}/carousel`, {
    //         withCredentials: true,
    //       });

    //       const settings = res.data.settings;

    //       setTotalViewDuration(settings?.totalViewDuration ?? 0);

    //       setViewDurationByDay(settings?.viewDurationByDay ?? {});
    //     } catch (error) {
    //       console.error('View duration analytics error:', error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   loadAnalytics();
    // }, []);
    const loadAnalytics = async () => {
      //     try {
      //       const cleanTargetUserName = targetUserName?.trim() || '';

      //       const res = await axios.get(`${API}/carousel`, {
      //         params: cleanTargetUserName
      //           ? { targetUserName: cleanTargetUserName }
      //           : {},
      //         withCredentials: true,
      //       });

      //       const settings = res.data.settings;

      //       setTotalViews(settings?.totalViews ?? 0);
      //       setViewsByDay(settings?.viewsByDay ?? {});
      //     } catch (error) {
      //       console.error('Analytics error:', error);
      //     } finally {
      //       setLoading(false);
      //     }
      //   };

      //   loadAnalytics();
      // }, [targetUserName]);

      try {
        const cleanTargetUserName = targetUserName?.trim() || '';

        const res = await axios.get(`${API}/carousel`, {
          params: cleanTargetUserName
            ? { targetUserName: cleanTargetUserName }
            : {},
          withCredentials: true,
        });

        const settings = res.data.settings;

        setTotalViewDuration(settings?.totalViewDuration ?? 0);
        setViewDurationByDay(settings?.viewDurationByDay ?? {});
      } catch (error) {
        console.error('View duration analytics error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [targetUserName]);
  // =========================================================
  // AUTH
  // =========================================================

  if (user && !user.isVerified) {
    return <Navigate to="/homepage" replace />;
  }

  // =========================================================
  // SORT DAYS
  // =========================================================

  const sortedDays = Object.entries(viewDurationByDay).sort(
    ([dateA], [dateB]) =>
      new Date(`${dateB}T00:00:00`) - new Date(`${dateA}T00:00:00`),
  );

  const displayedDays = sortedDays.slice(0, visibleDays);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <Page>
        <Header />

        <Container>
          <Title>View Duration</Title>

          <p>Loading...</p>
        </Container>

        <Footer />
      </Page>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <Page>
      <Header />
      <div className="duration-div">
        <Container className="duration-inner">
          <StyledDiv>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.6,
              }}
              className="mt-4 dasboard-text"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => navigate('/analyticspage')}
                className="dasboard-text button w-full py-3 px-4"
              >
                Back To Analytics Page
              </motion.button>
            </motion.div>

            <Title> Engagement Duration Analytics</Title>
            {/* User Name */}
            <InfoValue>UserName: {targetUserName || user?.userName}</InfoValue>
            <br />
            {/* =====================================================
              ALL TIME
          ===================================================== */}

            <TotalBox>
              <TotalLabel>ALL TIME VIEW DURATION</TotalLabel>

              <TotalNumber>{formatDuration(totalViewDuration)}</TotalNumber>
            </TotalBox>

            <h2>View Duration</h2>

            {/* =====================================================
              DAILY DATA
          ===================================================== */}

            {displayedDays.length === 0 ? (
              <p>No view duration data yet.</p>
            ) : (
              displayedDays.map(([date, duration]) => (
                <Day key={date}>
                  <DateText>
                    {new Date(`${date}T00:00:00`).toLocaleDateString(
                      undefined,
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </DateText>

                  <DurationText>{formatDuration(duration)}</DurationText>
                </Day>
              ))
            )}

            {/* =====================================================
              LOAD MORE
          ===================================================== */}

            {visibleDays < sortedDays.length && (
              <LoadMoreButton
                onClick={() => setVisibleDays((previous) => previous + 30)}
              >
                Load More
              </LoadMoreButton>
            )}
          </StyledDiv>
        </Container>
      </div>
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
    </Page>
  );
};

export default ViewsDuration;
