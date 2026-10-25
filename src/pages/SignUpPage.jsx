import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/Input';
import { User, Mail, Lock, Loader, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import HorizontalCarousel from '../components/HorizontalCarousel';
import Footer from '../components/Footer';

const StyledDiv = styled.div`
  height: 100vh;
  width: 100vw;
`;

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  //destructuring from the auth store
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   //tryand catch block to handle errors
  //   try {
  //     await signup(email, password, name);
  //     navigate('/verify-email');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const user = await signup(email, password, name);

      //checking if user is already verified from backend for our example email else move to otp page
      if (user.isVerified) {
        navigate('/dashboard');
      } else {
        navigate('/verify-email');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <StyledDiv className="background-signup">
        <div className="content  ">
          <div className="min-h-screen  flex items-center justify-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className=" max-w-md center w-full bg-transparent  
   rounded-2xl shadow-xl overflow-hidden signup-div
   "
            >
              <div className="p-8">
                <h2
                  className="text-3xl font-bold mb-6 text-center bg-gradient-to-r
        from-green-400 to-emerald-500 text-transparent bg-clip-text"
                >
                  Create Account
                </h2>
                <form onSubmit={handleSignUp}>
                  <Input
                    icon={User}
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

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
                  {/*showing error */}
                  {error && (
                    <p className="text-red-500 font-semiBold mt-2">{error} </p>
                  )}

                  {/* Password strength meter */}

                  <PasswordStrengthMeter password={password} />

                  <motion.button
                    className="mt-5 w-full py-3 px-4 
          bg-gradient-to-r  from-green-500 to-emerald-600 text-white font-bold 
          rounded-lg  shadow-lg hover:from-green-600 hover:to-emerald-700
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          focus:ring-offset-gray-900 transition duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader className="animate-spin mx-auto" size={24} />
                    ) : (
                      'Sign Up'
                    )}
                  </motion.button>
                </form>
              </div>
              <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link
                    to={'/login'}
                    className="text-green-400 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </StyledDiv>
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
    </>
  );
};

export default SignUpPage;
