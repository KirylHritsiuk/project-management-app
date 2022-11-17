import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Container, TextField, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './SignUp.scss';
import { authUser } from '../../store/slices/userSlice';
import { usersAPI } from '../../api/usersApi';
import { CreateUserType } from '../../types/types';
import { showNotification } from '../../store/slices/notificationSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

export const SignUp: React.FC = () => {
  const { isAuth, status } = useAppSelector(authUser);
  const [createUser] = usersAPI.useCreateUserMutation();
  const [loginUser] = usersAPI.useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: { name: '', login: '', password: '' } });

  useEffect(() => {
    if (isAuth) navigate('/main');
  }, [isAuth, navigate]);

  const onSubmitForm = async (data: CreateUserType) => {
    const newUser = await createUser({ ...data });

    if ('data' in newUser) {
      const authUser = await loginUser({ login: data.login, password: data.password });

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
        reset({ name: '', login: '', password: '' });
      }
    }

    if ('error' in newUser) {
      let message;
      if ('status' in newUser.error) message = (newUser.error.data as { message: string }).message;
      else message = newUser.error.message!;
      dispatch(showNotification({ isShow: true, text: message, severity: 'error' }));
      reset({ name: '', login: '', password: '' });
    }
  };

  return (
    <Container component="main" className="registr">
      {status === 'loading' && <CircularProgress color="secondary" />}
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
