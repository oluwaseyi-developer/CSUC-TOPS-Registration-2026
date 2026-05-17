import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authApi } from '@/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const [authState, setAuthState] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');

  useEffect(() => {
    const checkAuth = () => {
      const token = authApi.getToken();

      if (!token) {
        setAuthState('unauthenticated');
        return;
      }

      // Token exists - consider authenticated
      // If token is invalid, API calls will fail with 401 and the interceptor will redirect
      setAuthState('authenticated');
    };

    checkAuth();
  }, []);

  if (authState === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (authState === 'unauthenticated') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
