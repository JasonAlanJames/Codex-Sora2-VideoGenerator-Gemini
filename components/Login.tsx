import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import GoogleIcon from './icons/GoogleIcon';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import LoadingSpinner from './LoadingSpinner';

type Provider = 'google' | 'facebook' | 'instagram';

const Login: React.FC = () => {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);
  const { addToast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (provider: Provider) => {
    setLoadingProvider(provider);
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 500));
      login(provider);
      addToast('Successfully signed in!', 'success');
    } catch (error: any) {
      console.error("Failed to sign in:", error);
      addToast('Sign-in failed. Please try again.', 'error');
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialButtons: { provider: Provider; label: string; icon: React.ReactElement; }[] = [
    { provider: 'google', label: 'Continue with Google', icon: <GoogleIcon className="w-5 h-5" /> },
    { provider: 'facebook', label: 'Continue with Facebook', icon: <FacebookIcon className="w-5 h-5" /> },
    { provider: 'instagram', label: 'Continue with Instagram', icon: <InstagramIcon className="w-5 h-5" /> },
  ];

  const buttonClasses = "flex items-center justify-center w-full px-4 py-3 border border-dark-600 rounded-md shadow-sm text-sm font-medium text-white bg-dark-700 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 focus:ring-brand-primary transition-all duration-200 disabled:opacity-50";

  return (
    <div className="w-full max-w-sm space-y-4">
      {socialButtons.map(({ provider, label, icon }) => (
        <button
          key={provider}
          onClick={() => handleLogin(provider)}
          className={buttonClasses}
          disabled={loadingProvider !== null}
          aria-label={label}
        >
          {loadingProvider === provider ? (
            <LoadingSpinner size={5} />
          ) : (
            <>
              {icon}
              <span className="ml-3">{label}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
};

export default Login;