import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Container, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { usersAPI } from 'api/usersApi';
import { authUser } from 'store/slices/userSlice';
import { showNotification } from 'store/slices/notificationSlice';
import { CreateUserType } from 'types/types';
import { BackdropLoader } from 'components';

import './SignUp.scss';
import { useHandlingError } from 'hooks/useHandlingError';
import { pageAnimation } from 'constants/animation';
import { motion } from 'framer-motion';

export const SignUp: React.FC = () => {
  const { status } = useAppSelector(authUser);
  const [createUser] = usersAPI.useCreateUserMutation();
  const [loginUser] = usersAPI.useLoginUserMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { catchError } = useHandlingError();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: { name: '', login: '', password: '' } });

  const onSubmitForm = async (data: CreateUserType) => {
    const newUser = await createUser({ ...data });

    if ('data' in newUser) {
      const authUser = await loginUser({ login: data.login, password: data.password });

      if ('data' in authUser) {
        dispatch(
          showNotification({
            isShow: true,
            text: `${t('Welcome')}, ${data.login}!`,
            severity: 'success',
          })
        );
      } else {
        catchError(authUser.error);
        reset({ name: '', login: '', password: '' });
      }
    } else {
      catchError(newUser.error);
    }
  };

  return (
    <Container
      component={motion.main}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageAnimation}
      className="registr"
    >
      <BackdropLoader open={status === 'loading'} />

      <h2 className="registr__title">{t('Create new account')}</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="registr__form">
        <TextField
          label={t('Name')}
          {...register('name', {
            required: { value: true, message: t('Required field') },
            minLength: { value: 3, message: t('Minimum 3 characters') },
          })}
          size="small"
          error={!!errors.name}
          helperText={errors?.name ? errors.name.message : null}
          className={errors.name ? 'registr__error-input' : 'registr__input'}
        />
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
          className={errors.login ? 'registr__error-input' : 'registr__input'}
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
          className={errors.password ? 'registr__error-input' : 'registr__input'}
        />
        <Button type="submit" variant="contained" className="registr__button">
          {t('Save')}
        </Button>
      </form>
      <p className="registr__text">
        {t('I have an account')},{' '}
        <Link className="registr__link" to="/signin">
          {t('Sign In')}
        </Link>
      </p>
    </Container>
  );
};
