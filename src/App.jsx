import React, { useEffect, useState } from 'react';
import FloatingShape from './components/FloatingShape';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import LoadingSpinner from './components/LoadingSpinner';

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import HomePage from './pages/HomePage';
import PayPage from './pages/PayPage';

import ShowCasePage from './pages/ShowCasePage';

import PricingPage from './pages/PricingPage';
import AnalyticsPage from './pages/Analytics';

import ViewsPage from './pages/Views';

import ViewsDuration from './pages/ViewDuration';

import BandWidthPage from './pages/BandWidth';

import Contact from './pages/Contact';

import LordCartelBlue from '../src/brandshowcase/LordCartelBlue';
import LordCartelGold from '../src/brandshowcase/LordCartelGold';
import ReaperEngine from '../src/brandshowcase/ReaperEngine';
import OverlordEngine from '../src/brandshowcase/OverLordEngine';

import { Analytics } from '@vercel/analytics/react';

//protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/homepage" replace />;
  }
  // if (!user.isVerified) {
  //   return <Navigate to="/verify-email" replace />;
  // }
  return children;
};
//redirect authenticated users to the home page

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const [targetUserName, setTargetUserName] = useState('');

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Analytics />
      <div className="maindiv">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage
                  targetUserName={targetUserName}
                  setTargetUserName={setTargetUserName}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analyticspage"
            element={
              <ProtectedRoute>
                <AnalyticsPage targetUserName={targetUserName} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewspage"
            element={
              <ProtectedRoute>
                <ViewsPage targetUserName={targetUserName} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewsdurationpage"
            element={
              <ProtectedRoute>
                <ViewsDuration targetUserName={targetUserName} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bandwidth"
            element={
              <ProtectedRoute>
                <BandWidthPage targetUserName={targetUserName} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/homepage" element={<HomePage />} />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<Navigate to="/homepage" replace />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/showcasepage" element={<ShowCasePage />} />
          <Route path="/paypage" element={<PayPage />} />
          <Route path="/contact" element={<Contact />} />
          {/* show case */}
          <Route path="/lordcartelblue" element={<LordCartelBlue />} />
          <Route path="/lordcartelgold" element={<LordCartelGold />} />
          <Route path="/reaperengine" element={<ReaperEngine />} />
          <Route path="/overlordengine" element={<OverlordEngine />} />
        </Routes>

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#090909',
              color: '#ffffff',
              border: '1px solid #292929',
              borderRadius: '12px',
              padding: '16px 22px',
              fontSize: '16px',
              fontWeight: '500',
              boxShadow: '0 8px 30px rgba(0,0,0,0.45)',
              minWidth: '20vw',
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
