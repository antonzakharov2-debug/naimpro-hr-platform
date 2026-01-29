import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { resetAuthState } from '../slice/auth.slice';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isRegistered } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isRegistered) {
      dispatch(resetAuthState());
      navigate('/login');
    }
  }, [isRegistered, navigate, dispatch]);

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
