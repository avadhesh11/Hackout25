import { useState } from 'react';
import { Eye, EyeOff, Leaf, Users, Shield, Mail, User, Lock } from 'lucide-react';

function Signup() {
  const [data, setData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setData({
      ...data,
      [id]: newValue,
    });

    // Check password match in real-time
    if (id === 'confirmPassword' || id === 'password') {
      const password = id === 'password' ? value : data.password;
      const confirmPassword = id === 'confirmPassword' ? value : data.confirmPassword;
      setPasswordMatch(password === confirmPassword || confirmPassword === '');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!data.agreeToTerms) {
      alert('Please agree to the terms and conditions.');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Account created successfully! Welcome to Mangrove Watch.');
        // Navigate to dashboard or login
      } else {
        alert(result.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center p-4">
      {/* Floating leaves animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-green-300 animate-pulse opacity-20">
          <Leaf size={24} />
        </div>
        <div className="absolute top-40 right-20 text-emerald-300 animate-pulse opacity-30 animation-delay-1000">
          <Leaf size={20} />
        </div>
        <div className="absolute bottom-40 left-20 text-teal-300 animate-pulse opacity-25 animation-delay-2000">
          <Leaf size={28} />
        </div>
        <div className="absolute top-60 right-40 text-green-400 animate-pulse opacity-15 animation-delay-3000">
          <Leaf size={22} />
        </div>
      </div>

      <div className="w-full max-w-7xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left side - Signup Form */}
        <div className="lg:w-3/5 p-6 lg:p-10 flex flex-col justify-center max-h-screen overflow-y-auto">
          {/* Logo and Header */}
          <div className="text-center lg:text-left mb-6">
            <div className="flex items-center justify-center lg:justify-start mb-3">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-full mr-3">
                <Leaf className="text-white" size={28} />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                Join Mangrove Watch
              </h1>
            </div>
            <p className="text-gray-600 text-base font-light">
              Become part of our global conservation community
            </p>
          </div>

          {/* Signup Form */}
          <div className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 block flex items-center">
                <User size={16} className="mr-2 text-emerald-600" />
                Full Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your full name"
                required
                value={data.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block flex items-center">
                <Mail size={16} className="mr-2 text-emerald-600" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                required
                value={data.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 block flex items-center">
                  <Lock size={16} className="mr-2 text-emerald-600" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Create password"
                    required
                    value={data.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block flex items-center">
                  <Lock size={16} className="mr-2 text-emerald-600" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm password"
                    required
                    value={data.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 rounded-xl border-2 ${
                      passwordMatch ? 'border-gray-200 focus:border-emerald-500' : 'border-red-300 focus:border-red-500'
                    } focus:ring-4 ${
                      passwordMatch ? 'focus:ring-emerald-100' : 'focus:ring-red-100'
                    } transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {!passwordMatch && data.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={data.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700 leading-relaxed">
                I agree to the{' '}
                <a href="#terms" className="text-emerald-600 hover:text-emerald-800 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-emerald-600 hover:text-emerald-800 font-medium">
                  Privacy Policy
                </a>
                , and I understand that my data will be used to support mangrove conservation efforts.
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={submit}
              disabled={isLoading || !passwordMatch || !data.agreeToTerms}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <a
                href="#login"
                className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Right side - Illustration */}
        <div className="lg:w-2/5 relative overflow-hidden min-h-[500px] lg:min-h-full">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-emerald-500 to-green-600"></div>
          
          {/* Community illustration */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-center text-white max-w-sm">
              <div className="mb-6">
                {/* Community of mangrove watchers illustration */}
                <div className="relative w-56 h-56 mx-auto">
                  {/* Globe/Earth base */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-80"></div>
                  
                  {/* Multiple mangrove sites around the globe */}
                  <div className="absolute top-4 left-8 w-8 h-8 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full flex items-center justify-center">
                    <Leaf size={12} className="text-white" />
                  </div>
                  <div className="absolute top-12 right-12 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Leaf size={12} className="text-white" />
                  </div>
                  <div className="absolute bottom-16 left-4 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <Leaf size={12} className="text-white" />
                  </div>
                  <div className="absolute bottom-12 right-8 w-8 h-8 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center">
                    <Leaf size={12} className="text-white" />
                  </div>
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                      </linearGradient>
                    </defs>
                    <path d="M 50 20 Q 120 60 200 50" stroke="url(#lineGradient)" strokeWidth="2" fill="none" opacity="0.6" />
                    <path d="M 40 50 Q 80 120 150 180" stroke="url(#lineGradient)" strokeWidth="2" fill="none" opacity="0.6" />
                    <path d="M 200 80 Q 160 140 100 200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" opacity="0.6" />
                  </svg>
                  
                  {/* Community members icons */}
                  <div className="absolute top-0 right-4 text-white opacity-60">
                    <Users size={16} />
                  </div>
                  <div className="absolute top-8 left-0 text-white opacity-60">
                    <Users size={14} />
                  </div>
                  <div className="absolute bottom-0 right-0 text-white opacity-60">
                    <Users size={16} />
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Global Conservation Network
              </h2>
              <p className="text-base lg:text-lg opacity-90 leading-relaxed">
                Connect with researchers, conservationists, and communities worldwide to monitor and protect critical mangrove ecosystems through collaborative science.
              </p>
              
              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold">150+</div>
                  <div className="text-xs opacity-80">Sites Monitored</div>
                </div>
                <div>
                  <div className="text-xl font-bold">45</div>
                  <div className="text-xs opacity-80">Countries</div>
                </div>
                <div>
                  <div className="text-xl font-bold">2.3K</div>
                  <div className="text-xs opacity-80">Contributors</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-white opacity-20">
            <Shield size={32} />
          </div>
          <div className="absolute bottom-4 right-4 text-white opacity-20">
            <Leaf size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;