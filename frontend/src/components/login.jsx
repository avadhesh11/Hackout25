import { useState } from 'react';
import { Eye, EyeOff, Leaf, Users, Shield } from 'lucide-react';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Login successful! Welcome to Mangrove Watch.');
        // Navigate to dashboard
      } else {
        alert(result.error || 'Login failed. Please try again.');
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
      </div>

      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left side - Login Form */}
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
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                required
                value={data.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

          {/* Additional Links */}
          <div className="mt-8 text-center space-y-3">
            <a
              href="#forgot"
              className="text-emerald-600 hover:text-emerald-800 text-sm font-medium transition-colors"
            >
              Forgot your password?
            </a>
            <p className="text-gray-600 text-sm">
              New to Mangrove Watch?{' '}
              <a
                href="#signup"
                className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors"
              >
                Join our community
              </a>
            </p>
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

        {/* Right side - Image */}
        <div className="lg:w-1/2 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600"></div>
          
          {/* Mangrove illustration */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center text-white">
              <div className="mb-8">
                {/* Artistic mangrove representation */}
                <div className="relative w-64 h-64 mx-auto">
                  {/* Water base */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-400 to-blue-300 rounded-full opacity-60"></div>
                  
                  {/* Mangrove roots */}
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-24 bg-gradient-to-t from-amber-800 to-amber-700 rounded-full transform rotate-12"></div>
                    <div className="absolute -left-8 top-8 w-3 h-20 bg-gradient-to-t from-amber-800 to-amber-700 rounded-full transform -rotate-12"></div>
                    <div className="absolute -right-8 top-8 w-3 h-20 bg-gradient-to-t from-amber-800 to-amber-700 rounded-full transform rotate-12"></div>
                    <div className="absolute -left-12 top-16 w-2 h-16 bg-gradient-to-t from-amber-800 to-amber-700 rounded-full transform -rotate-24"></div>
                    <div className="absolute -right-12 top-16 w-2 h-16 bg-gradient-to-t from-amber-800 to-amber-700 rounded-full transform rotate-24"></div>
                  </div>
                  
                  {/* Mangrove canopy */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-80"></div>
                    <div className="absolute -left-6 top-4 w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full opacity-70"></div>
                    <div className="absolute -right-6 top-4 w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full opacity-70"></div>
                    <div className="absolute left-2 -top-4 w-20 h-20 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full opacity-60"></div>
                  </div>
                  
                  {/* Birds */}
                  <div className="absolute top-4 right-8 text-white opacity-40">
                    <div className="text-xs">◆</div>
                  </div>
                  <div className="absolute top-8 right-16 text-white opacity-30">
                    <div className="text-xs">◆</div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Join the Movement
              </h2>
              <p className="text-lg lg:text-xl opacity-90 leading-relaxed">
                Help us monitor and protect vital mangrove ecosystems around the world through community-driven conservation efforts.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-8 left-8 text-white opacity-20">
            <Leaf size={48} />
          </div>
          <div className="absolute bottom-8 right-8 text-white opacity-20">
            <Leaf size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;