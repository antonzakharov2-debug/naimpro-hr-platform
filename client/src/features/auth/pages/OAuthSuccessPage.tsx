import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { setToken } from '../slice/auth.slice';

const OAuthSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const token = searchParams.get('token');

    if (token) {
      dispatch(setToken(token));
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [searchParams, dispatch, navigate]);

  return <p>Signing in with Google...</p>;
};

export default OAuthSuccessPage;
