import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Userfront from '@userfront/toolkit/react';

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.substring(1);

  useEffect(() => {
    if (!Userfront.user.userUuid && currentPath !== '' && currentPath !== 'login') {
      navigate('/');
    }
  }, [navigate, currentPath]);

  return Userfront.user.userUuid;
};

export default useAuth;
