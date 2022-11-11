import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Container, TextField, CircularProgress } from '@mui/material';
import { useAppSelector } from 'hooks/hooks';
import { authUser } from 'store/slices/userSlice';
import { usersAPI } from 'api/usersApi';
import { Link, useNavigate } from 'react-router-dom';

import './SignIn.scss';

export const SignIn: React.FC = () => {
  const { isAuth, status } = useAppSelector(authUser);
  const [loginUser] = usersAPI.useLoginUserMutation();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { login: '', password: '' } });

  useEffect(() => {
    if (isAuth) navigate('/main');
  }, [isAuth, navigate]);

  const onSubmitForm = async (data: FieldValues) => {
    const authUser = await loginUser({ login: data.login, password: data.password });
  };

  return (
    <Container component="main" className="auth">
      {status === 'loading' && <CircularProgress color="secondary" />}
      <h2 className="auth__title">Sign in</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="auth__form">
        <TextField
          label="Login"
          {...register('login', {
            required: 'Required field',
            minLength: { value: 3, message: 'Minimum 3 characters' },
            pattern: {
              value: /^^[a-zA-Z0-9]+$/,
              message: 'Only english letters and numbers',
            },
          })}
          size="small"
          error={!!errors.login}
          helperText={errors?.login ? errors.login.message : null}
          className={errors.login ? 'auth__error-input' : 'auth__input'}
        />
        <TextField
          label="Password"
          type="password"
          {...register('password', {
            required: 'Required field',
            minLength: { value: 8, message: 'Minimum 8 characters' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*[0-9])/,
              message: 'Password must contain letters and numbers',
            },
          })}
          size="small"
          error={!!errors.password}
          helperText={errors?.password ? errors.password.message : null}
          className={errors.password ? 'auth__error-input' : 'auth__input'}
        />
        <Button type="submit" variant="contained" className="auth__button">
          Save
        </Button>
      </form>
      <p className="auth__text">
        I don’t have an account,{' '}
        <Link className="auth__link" to="/signup">
          Sign Up
        </Link>
      </p>
    </Container>
  );
};
