import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { setToken } from '../slice/auth.slice';

const OAuthSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      dispatch(setToken(token));
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [searchParams, dispatch, navigate]);

  return <p>Signing in with Google...</p>;
};

export default OAuthSuccessPage;
