import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, IconButton, Button } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { usersAPI } from 'api/usersApi';
import { authUser, editUser } from 'store/slices/userSlice';
import { showNotification } from 'store/slices/notificationSlice';
import { CreateUserType } from 'types/types';
import { BackdropLoader } from 'components';

import './EditProfileForm.scss';

const editValuesInitial: { [key: string]: boolean } = {
  name: false,
  login: false,
  password: false,
};

export const EditProfileForm: React.FC = () => {
  const { id, login, name } = useAppSelector(authUser);
  const [updateUser, { isLoading }] = usersAPI.useUpdateUserMutation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [editValues, setEditValues] = useState({ ...editValuesInitial });

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ mode: 'onChange', defaultValues: { name: '', login: '', password: '' } });

  useEffect(() => {
    reset({ name: name, login: login, password: '' });
  }, [login, name, reset]);

  const onEditClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const { name: btnName } = ev.currentTarget;
    setEditValues({ ...editValues, [btnName]: !editValues[btnName] });
    if (btnName === 'password') setValue('password', '');
    if (btnName === 'login') setValue('login', login);
    if (btnName === 'name') setValue('name', name);
  };

  const onSubmitForm = async (data: CreateUserType) => {
    const user: Partial<CreateUserType> = { login: data.login, name: data.name };
    if (data.password === '') user.password = data.password;

    const newUser = await updateUser({ id, body: user });
    if ('data' in newUser) {
      dispatch(showNotification({ isShow: true, text: `${t('Saved')}!`, severity: 'success' }));
      dispatch(editUser({ name: data.name, login: data.login }));
      setEditValues({ ...editValuesInitial });
    }
    if ('error' in newUser) {
      let message;
      if ('status' in newUser.error) message = (newUser.error.data as { message: string }).message;
      else message = newUser.error.message!;
      dispatch(showNotification({ isShow: true, text: message, severity: 'error' }));
      reset({ name: user?.name, login: user?.login, password: '' });
    }
  };

  return (
    <>
      <BackdropLoader open={isLoading} />
      <form onSubmit={handleSubmit(onSubmitForm)} className="profile__form">
        <div className="profile__field">
          <p className="profile__field-label">{t('Name')}: </p>
          {editValues.name ? (
            <TextField
              {...register('name', {
                required: { value: true, message: t('Required field') },
                minLength: { value: 3, message: t('Minimum 3 characters') },
              })}
              size="small"
              error={!!errors.name}
              helperText={errors?.name ? errors.name.message : null}
              className={errors.name ? 'profile__field-error-input' : 'profile__field-input'}
            />
          ) : (
            <p className="profile__field-value">{name}</p>
          )}
          <IconButton
            name="name"
            onClick={onEditClick}
            color="primary"
            className="profile__field-btn"
          >
            {editValues.name ? <ReplayIcon /> : <EditIcon />}
          </IconButton>
        </div>

        <div className="profile__field">
          <p className="profile__field-label">{t('Login')}: </p>
          {editValues.login ? (
            <TextField
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
              className={errors.login ? 'profile__field-error-input' : 'profile__field-input'}
            />
          ) : (
            <p className="profile__field-value">{login}</p>
          )}
          <IconButton
            name="login"
            onClick={onEditClick}
            color="primary"
            className="profile__field-btn"
          >
            {editValues.login ? <ReplayIcon /> : <EditIcon />}
          </IconButton>
        </div>

        <div className="profile__field">
          <p className="profile__field-label">{t('Password')}: </p>
          {editValues.password ? (
            <TextField
              {...register('password', {
                required: { value: true, message: t('Required field') },
                minLength: { value: 8, message: t('Minimum 8 characters') },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*[0-9])/,
                  message: t('Password must contain letters and numbers'),
                },
              })}
              type="password"
              size="small"
              error={!!errors.password}
              helperText={errors?.password ? errors.password.message : null}
              className={errors.password ? 'profile__field-error-input' : 'profile__field-input'}
            />
          ) : (
            <p className="profile__field-value">********</p>
          )}
          <IconButton
            name="password"
            onClick={onEditClick}
            color="primary"
            className="profile__field-btn"
          >
            {editValues.password ? <ReplayIcon /> : <EditIcon />}
          </IconButton>
        </div>

        {Object.values(editValues).some((item) => item) && (
          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid}
            className="profile__form-button"
          >
            {t('Save')}
          </Button>
        )}
      </form>
    </>
  );
};
