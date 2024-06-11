import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Loader from './components/Loader';
import { useStore } from './stores';

interface ProtectedProps {
  children: JSX.Element;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    setIsLoggedIn(!!authToken);
  }, []);

  if (isLoggedIn === null) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    window.location.href = '/sign-in';
    Cookies.remove('authToken');
    useStore.getState().clearState();
    return;
  }

  return children;
};

export default Protected;
