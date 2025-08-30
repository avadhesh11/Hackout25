import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Leaf, Users, Shield } from 'lucide-react';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

  // Auto-swap every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSwapped(prev => !prev);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Login successful! Welcome to Mangrove Watch.');
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const LoginForm = () => (
    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
      {/* Logo and Header */}
      <div className="text-center lg:text-left mb-8">
        <div className="flex items-center justify-center lg:justify-start mb-4">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-full mr-3">
            <Leaf className="text-white" size={32} />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
            Mangrove Watch
          </h1>
        </div>
        <p className="text-gray-600 text-lg font-light">
          Protecting coastal ecosystems together
        </p>
      </div>

      {/* Login Form */}
      <div className="space-y-6" onSubmit={submit}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
            value={data.email}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 text-base"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              required
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 text-base"
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

        <button
          type="submit"
          disabled={isLoading}
          onClick={submit}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Signing In...
            </div>
          ) : (
            'Sign In'
          )}
        </button>
      </div>

      {/* Forgot Password Link */}
      <div className="text-center mt-4">
        <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
          Forgot your password?
        </a>
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-emerald-100 p-2 rounded-full">
            <Users className="text-emerald-600" size={16} />
          </div>
          <span className="text-xs text-gray-600 font-medium">Community Driven</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-teal-100 p-2 rounded-full">
            <Leaf className="text-teal-600" size={16} />
          </div>
          <span className="text-xs text-gray-600 font-medium">Ecosystem Protection</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-green-100 p-2 rounded-full">
            <Shield className="text-green-600" size={16} />
          </div>
          <span className="text-xs text-gray-600 font-medium">Secure Platform</span>
        </div>
      </div>
    </div>
  );

  const ImageSection = () => (
    <div className="lg:w-1/2 relative overflow-hidden min-h-[600px]">
      {/* Actual mangrove image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Mangrove ecosystem with roots in water"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        {/* Fallback gradient background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600" 
          style={{ display: 'none' }}
        ></div>
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-start p-8 lg:p-12">
        <div className="text-white max-w-md">
          <div className="mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Protecting Our Coastal Guardians
            </h2>
            <p className="text-lg lg:text-xl opacity-90 leading-relaxed">
              Join thousands of conservationists monitoring and protecting vital mangrove ecosystems worldwide through community-driven science.
            </p>
          </div>
          
          {/* Statistics */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">🌱</span>
              </div>
              <span className="text-sm">500+ Protected Areas Monitored</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">🐋</span>
              </div>
              <span className="text-sm">Marine Life Conservation Impact</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">🌍</span>
              </div>
              <span className="text-sm">Global Community Network</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-8 right-8 text-white opacity-20">
        <Leaf size={48} className="animate-pulse" />
      </div>
      <div className="absolute bottom-8 left-8 text-white opacity-20">
        <Leaf size={40} className="animate-pulse" style={{animationDelay: '1s'}} />
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center p-4">
      {/* Floating leaves animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-green-300 animate-pulse opacity-20">
          <Leaf size={24} />
        </div>
        <div className="absolute top-40 right-20 text-emerald-300 animate-pulse opacity-30" style={{animationDelay: '1s'}}>
          <Leaf size={20} />
        </div>
        <div className="absolute bottom-40 left-20 text-teal-300 animate-pulse opacity-25" style={{animationDelay: '2s'}}>
          <Leaf size={28} />
        </div>
        <div className="absolute top-1/2 right-1/4 text-teal-200 animate-pulse opacity-15" style={{animationDelay: '3s'}}>
          <Leaf size={32} />
        </div>
      </div>

      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row relative">
        {/* Swap indicator */}
        <div className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2">
          <div className={`w-2 h-2 rounded-full transition-colors duration-1000 ${isSwapped ? 'bg-emerald-400' : 'bg-teal-400'}`}></div>
        </div>

        {/* Content - No animation container needed, just conditional rendering */}
        <div className="flex w-full flex-col lg:flex-row">
          {isSwapped ? (
            <>
              <ImageSection />
              <LoginForm />
            </>
          ) : (
            <>
              <LoginForm />
              <ImageSection />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;