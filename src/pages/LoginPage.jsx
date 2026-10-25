import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '@/components/Input.jsx';
import { useAuthStore } from '@/store/authStore.js';
import Header from '../components/Header.jsx';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import HorizontalCarousel from '../components/HorizontalCarousel';

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result?.redirectToVerify) {
      navigate('/verify-email');
    } else if (result?.success) {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <Header />
      <div className="background-login">
        <div className="content">
          {/*login*/}
          <div className="min-h-screen  flex items-center justify-center   relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full 
    backdrop-filter  rounded-2xl shadow-xl
    overflow-hidden login-div"
            >
              <div className="p-8">
                <h2
                  className="text-3xl font-bold mb-6 text-center
        bg-gradient-to-r from-green-400 to-emerald-500
        text-transparent bg-clip-text"
                >
                  Log Into Brand Engine
                </h2>

                <form onSubmit={handleLogin}>
                  <Input
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="relative">
                    <Input
                      icon={Lock}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div className="flex items-center mb-6">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-green-400
            hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  {error && (
                    <p className="text-red-500 font-semibold mb-2">{error}</p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-500
          to-emerald-600 text-white font-bold rounded-lg shadow-lg
          hover:from-green-600 hover:to-emerald-700 focus:outline-none 
          focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
          focus:ring-offset-gray-900 transition duration duration-200"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader
                        className="w-6 h-6 animate-spin
            mx-auto"
                      />
                    ) : (
                      'Login'
                    )}
                  </motion.button>
                </form>
              </div>
              <div
                className="px-8 py-4 bg-gray-900 bg-opacity-50
      flex justify-center"
              >
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-green-400 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
              <></>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="seperation-div"></div>
      <div className="banner-container">
        <img
          src="https://assets2.lordcartel.com/banner-1.webp"
          alt="Lord Cartel banner"
          className="banner-image"
        />
      </div>
      <HorizontalCarousel />
      <Footer />
    </>
  );
};

export default LoginPage;
