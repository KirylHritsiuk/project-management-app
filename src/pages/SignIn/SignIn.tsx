import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Container, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { usersAPI } from 'api/usersApi';
import { authUser } from 'store/slices/userSlice';
import { showNotification } from 'store/slices/notificationSlice';
import { LoginUserType } from 'types/types';
import { BackdropLoader } from 'components';

import './SignIn.scss';

export const SignIn: React.FC = () => {
  const { status } = useAppSelector(authUser);
  const [loginUser] = usersAPI.useLoginUserMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: { login: '', password: '' } });

  const onSubmitForm = async (data: LoginUserType) => {
    const authUser = await loginUser({ ...data });
    if ('data' in authUser)
      dispatch(
        showNotification({
          isShow: true,
          text: `${t('Welcome')}, ${data.login}!`,
          severity: 'success',
        })
      );
    if ('error' in authUser) {
      let message;
      if ('status' in authUser.error)
        message = (authUser.error.data as { message: string }).message;
      else message = authUser.error.message!;
      dispatch(showNotification({ isShow: true, text: message, severity: 'error' }));
      reset({ login: '', password: '' });
    }
  };

  return (
    <Container component="main" className="auth">
      <BackdropLoader open={status === 'loading'} />
      <h2 className="auth__title">{t('Sign In')}</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="auth__form">
        <TextField
          label={t('Login')}
          {...register('login', {
            required: { value: true, message: t('Required field') },
            minLength: { value: 3, message: t('Minimum 3 characters') },
            pattern: {
              value: /^^[a-zA-Z0-9]+$/,
              message: t('Only english letters and numbers'),
            },
          })}
          size="small"
          error={!!errors.login}
          helperText={errors?.login ? errors.login.message : null}
          className={errors.login ? 'auth__error-input' : 'auth__input'}
        />
        <TextField
          label={t('Password')}
          type="password"
          {...register('password', {
            required: { value: true, message: t('Required field') },
            minLength: { value: 8, message: t('Minimum 8 characters') },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*[0-9])/,
              message: t('Password must contain letters and numbers'),
            },
          })}
          size="small"
          error={!!errors.password}
          helperText={errors?.password ? errors.password.message : null}
          className={errors.password ? 'auth__error-input' : 'auth__input'}
        />
        <Button type="submit" variant="contained" className="auth__button">
          {t('Save')}
        </Button>
      </form>
      <p className="auth__text">
        {t('I don’t have an account')},{' '}
        <Link className="auth__link" to="/signup">
          {t('Sign Up')}
        </Link>
      </p>
    </Container>
  );
};
