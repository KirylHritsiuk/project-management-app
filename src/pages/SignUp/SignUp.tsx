import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Container, TextField, CircularProgress } from '@mui/material';
import { useAppSelector } from 'hooks/hooks';
import { usersAPI } from 'api/usersApi';
import { CreateUserType } from 'types/types';
import { authUser } from 'store/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';

import './SignUp.scss';

export const SignUp: React.FC = () => {
  const { isAuth, status } = useAppSelector(authUser);
  const [createUser] = usersAPI.useCreateUserMutation();
  const [loginUser] = usersAPI.useLoginUserMutation();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { name: '', login: '', password: '' } });

  useEffect(() => {
    if (isAuth) navigate('/main');
  }, [isAuth, navigate]);

  const onSubmitForm = async (data: FieldValues) => {
    const newUser = await createUser({ ...(data as CreateUserType) });
    if ('data' in newUser) {
      const authUser = await loginUser({ login: data.login, password: data.password });
    }
  };

  return (
    <Container component="main" className="registr">
      {status === 'loading' && <CircularProgress color="secondary" />}
      <h2 className="registr__title">Create new account</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="registr__form">
        <TextField
          label="Name"
          {...register('name', {
            required: 'Required field',
            minLength: { value: 3, message: 'Minimum 3 characters' },
          })}
          size="small"
          error={!!errors.name}
          helperText={errors?.name ? errors.name.message : null}
          className={errors.name ? 'registr__error-input' : 'registr__input'}
        />
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
          className={errors.login ? 'registr__error-input' : 'registr__input'}
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
          className={errors.password ? 'registr__error-input' : 'registr__input'}
        />
        <Button type="submit" variant="contained" className="registr__button">
          Save
        </Button>
      </form>
      <p className="registr__text">
        I have an account,{' '}
        <Link className="registr__link" to="/signin">
          Sign In
        </Link>
      </p>
    </Container>
  );
};
