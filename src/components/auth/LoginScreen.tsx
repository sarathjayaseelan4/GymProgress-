import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { User } from '../../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

// Mock Google OAuth (in real app, use Google OAuth library)
const mockGoogleAuth = (): Promise<User> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: "John Doe",
        email: "john.doe@gmail.com",
        picture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2"
      });
    }, 1500);
  });
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await mockGoogleAuth();
      onLogin(user);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <Dumbbell className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">GymProgress</h1>
          <p className="text-gray-400 text-lg">Track your strength gains with precision</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-black py-4 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign in with Google'
            )}
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            Secure authentication • Data synced across devices
          </p>
        </div>
      </div>
    </div>
  );
}