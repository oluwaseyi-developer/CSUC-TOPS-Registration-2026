import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ArrowLeft, Shield, Church } from 'lucide-react';
import { Button } from '@/components/ui';
import { authApi } from '@/api';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to admin
  useEffect(() => {
    const token = authApi.getToken();
    if (token) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error('Please enter username and password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login(username, password);

      if (!response.token) {
        throw new Error('No token received from server');
      }

      authApi.setToken(response.token);

      // Verify token was saved
      const savedToken = authApi.getToken();
      if (!savedToken) {
        throw new Error('Failed to save authentication token');
      }

      // Clear any cached queries so they refetch with the new token
      queryClient.clear();

      toast.success('Login successful!');

      // Navigate using React Router (not window.location)
      navigate('/admin', { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.response?.data?.error || error.message || 'Login failed. Please try again.';
      toast.error(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="floating-shapes">
        <div className="floating-shape w-96 h-96 top-0 -left-48 animate-float" />
        <div className="floating-shape w-80 h-80 bottom-0 -right-40 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Registration</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-gold-400/30 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-gold-400/30 rounded-br-2xl" />

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-gold-500/30"
            >
              <Shield className="w-10 h-10 text-primary-900" />
            </motion.div>

            <h1 className="text-2xl font-display font-bold text-white mb-2">
              Admin Login
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
              <Church className="w-4 h-4 text-gold-400" />
              <span>TOPS CHAPTER Dashboard</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="input-field pl-12"
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="input-field pl-12 pr-12"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              loading={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs">
              Authorized personnel only. All access is logged.
            </p>
          </div>
        </motion.div>

        {/* Footer Info */}
        <p className="text-center text-white/40 text-xs mt-6">
          © 2026 TOPS CHAPTER • Anniversary & Covenant Service
        </p>
      </div>
    </div>
  );
}
