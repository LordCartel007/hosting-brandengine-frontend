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
  margin-bottom: 20px;
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

const SecondaryNumber = styled.p`
  margin: 10px 0 0;
  font-size: 1rem;
  opacity: 0.6;
`;

const InfoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: #18181c;
  border-radius: 15px;
  padding: 20px;
  @media screen and (max-width: 600px) {
    max-width: 60vw;
  }
`;

const InfoLabel = styled.p`
  margin: 0 0 8px;
  font-size: 0.9rem;
  opacity: 0.6;
`;

const InfoValue = styled.h3`
  margin: 0;
  font-size: 1.5rem;
`;

const Day = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #18181c;
  border-radius: 10px;
  padding: 18px 20px;
  margin-bottom: 10px;
  gap: 20px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
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

const BandWidthPage = ({ targetUserName }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [bandwidthCount, setBandwidthCount] = useState(0);
  const [bandwidthUsed, setBandwidthUsed] = useState(0);
  const [bandwidthUsedByDay, setBandwidthUsedByDay] = useState({});
  const [bandwidthExpiresAt, setBandwidthExpiresAt] = useState(null);
  const [appType, setAppType] = useState(null);

  const [visibleDays, setVisibleDays] = useState(30);
  const [loading, setLoading] = useState(true);

  //api upload
  const API = import.meta.env.VITE_APIUPLOAD;

  // ==========================================
  // BANDWIDTH PER UNIT
  // ==========================================

  const getBandwidthMultiplier = (type) => {
    switch (type) {
      case 'BrandEnginePicNoModel':
        return 17;

      case 'BrandEnginePicModel':
        return 27;

      case 'BrandEngineVideoNoModel':
        return 95;

      case 'BrandEngineVideoModel':
        return 105;

      default:
        return 0;
    }
  };

  // ==========================================
  // FORMAT BANDWIDTH
  // Input is MB
  // ==========================================

  const formatBandwidth = (mb) => {
    const value = Number(mb) || 0;

    if (value <= 0) {
      return '0 MB';
    }

    if (value < 1024) {
      return `${Math.round(value)} MB`;
    }

    const gb = value / 1024;

    if (gb < 1024) {
      return `${gb.toFixed(gb < 10 ? 2 : 0)} GB`;
    }

    const tb = gb / 1024;

    if (tb < 1024) {
      return `${tb.toFixed(tb < 10 ? 2 : 0)} TB`;
    }

    const pb = tb / 1024;

    return `${pb.toFixed(pb < 10 ? 2 : 0)} PB`;
  };

  // ==========================================
  // LOAD ANALYTICS
  // ==========================================

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const cleanTargetUserName = targetUserName?.trim() || '';

        const res = await axios.get(`${API}/carousel`, {
          params: cleanTargetUserName
            ? { targetUserName: cleanTargetUserName }
            : {},
          withCredentials: true,
        });

        const settings = res.data.settings;

        setBandwidthCount(Number(settings?.bandwidthCount ?? 0));
        setBandwidthUsed(Number(settings?.bandwidthUsed ?? 0));
        setBandwidthUsedByDay(settings?.bandwidthUsedByDay ?? {});
        setBandwidthExpiresAt(settings?.bandwidthExpiresAt ?? null);
        setAppType(settings?.appType ?? null);
      } catch (error) {
        console.error('Bandwidth analytics error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [targetUserName]);

  // ==========================================
  // BANDWIDTH CALCULATIONS
  // ==========================================

  const bandwidthMultiplier = getBandwidthMultiplier(appType);

  const remainingBandwidthMB = bandwidthCount * bandwidthMultiplier;

  const usedBandwidthMB = bandwidthUsed * bandwidthMultiplier;

  // ==========================================
  // DAILY BANDWIDTH
  // ==========================================

  const sortedDays = Object.entries(bandwidthUsedByDay).sort(
    ([dateA], [dateB]) =>
      new Date(`${dateB}T00:00:00`) - new Date(`${dateA}T00:00:00`),
  );

  const displayedDays = sortedDays.slice(0, visibleDays);

  // ==========================================
  // EXPIRY DATE
  // ==========================================

  const formattedExpiry = bandwidthExpiresAt
    ? (() => {
        const expiryDate = new Date(bandwidthExpiresAt);

        const startDate = new Date(expiryDate);
        startDate.setDate(startDate.getDate() - 30);

        const formatDate = (date) =>
          date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

        return `${formatDate(startDate)} → ${formatDate(expiryDate)}`;
      })()
    : 'No expiry set';

  // ==========================================
  // AUTH
  // ==========================================

  if (user && !user.isVerified) {
    return <Navigate to="/homepage" replace />;
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Page>
        <Header />

        <Container>
          <Title>Bandwidth Analytics</Title>

          <p>Loading...</p>
        </Container>

        <Footer />
      </Page>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <Page>
      <Header />
      <div className="bandwidth-div">
        <Container className="bandwidth-inner">
          <StyledDiv>
            {/* BACK BUTTON */}
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
                className="dasboard-text button w-full py-3 px-4"
              >
                Back To Analytics Page
              </motion.button>
            </motion.div>
            <Title>Bandwidth Analytics</Title>
            {/* User Name */}
            <InfoValue>UserName: {targetUserName || user?.userName}</InfoValue>
            <br />
            {/* ==========================================
              REMAINING BANDWIDTH
          ========================================== */}
            <TotalBox>
              <TotalLabel>BANDWIDTH REMAINING</TotalLabel>

              <TotalNumber>{formatBandwidth(remainingBandwidthMB)}</TotalNumber>

              <SecondaryNumber>
                {remainingBandwidthMB.toLocaleString()} MB
                {'  = '}
                {bandwidthCount.toLocaleString()} units of api requests.
                {' × '}
                {bandwidthMultiplier} MB
              </SecondaryNumber>
            </TotalBox>
            {/* ==========================================
              USED + EXPIRY
          ========================================== */}

            <InfoBox>
              <InfoCard>
                <InfoLabel>ALL TIME BANDWIDTH USED</InfoLabel>

                <InfoValue>{formatBandwidth(usedBandwidthMB)}</InfoValue>

                <SecondaryNumber>
                  {bandwidthUsed.toLocaleString()} units
                </SecondaryNumber>
              </InfoCard>

              <InfoCard>
                <InfoLabel>BANDWIDTH EXPIRES</InfoLabel>

                <InfoValue>{formattedExpiry}</InfoValue>

                <label>Bandwidth Expiry</label>

                <div>
                  {bandwidthExpiresAt
                    ? new Date(bandwidthExpiresAt).toLocaleString()
                    : 'No expiry set'}
                </div>
              </InfoCard>

              <InfoCard>
                <InfoLabel>BRAND ENGINE TYPE</InfoLabel>

                <InfoValue>{appType || 'Unknown'}</InfoValue>
              </InfoCard>

              <InfoCard>
                <InfoLabel>BANDWIDTH PER UNIT</InfoLabel>

                <InfoValue>{bandwidthMultiplier} MB</InfoValue>
              </InfoCard>
            </InfoBox>
            {/* ==========================================
              DAILY USAGE
          ========================================== */}
            <h2>Bandwidth Used By Day</h2>
            {displayedDays.length === 0 ? (
              <p>No bandwidth usage data yet.</p>
            ) : (
              displayedDays.map(([date, units]) => {
                const dailyUnits = Number(units) || 0;

                const dailyBandwidthMB = dailyUnits * bandwidthMultiplier;

                return (
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

                    <ViewsText>
                      {formatBandwidth(dailyBandwidthMB)}
                      {'  =  '}
                      {dailyUnits.toLocaleString()} units
                    </ViewsText>
                  </Day>
                );
              })
            )}
            {/* ==========================================
              LOAD MORE
          ========================================== */}
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

export default BandWidthPage;
