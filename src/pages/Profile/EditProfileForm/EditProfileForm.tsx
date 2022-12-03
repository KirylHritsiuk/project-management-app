import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, IconButton, Button } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { usersAPI } from 'api/usersApi';
import { authUser, editUser } from 'store/slices/userSlice';
import { CreateUserType } from 'types/types';
import { BackdropLoader } from 'components';

import './EditProfileForm.scss';
import { useError } from 'hooks/useError';

const editValuesInitial: { [key: string]: boolean } = {
  name: false,
  login: false,
  password: false,
};

type Props = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditProfileForm: React.FC<Props> = ({ setModal }) => {
  const { id, login, name } = useAppSelector(authUser);
  const [updateUser, { isLoading }] = usersAPI.useUpdateUserMutation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [editValues, setEditValues] = useState({ ...editValuesInitial });
  const { catchError, setShow } = useError();

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
    const newUser = await updateUser({ id, body: data });
    if ('data' in newUser) {
      setShow({ isShow: true, text: `${t('Saved')}!`, severity: 'success' });
      dispatch(editUser({ name: data.name, login: data.login }));
      setEditValues({ ...editValuesInitial });
      setModal(false);
    } else {
      catchError(newUser.error);
      reset({ name: data?.name, login: data?.login, password: '' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)} className="profile__form">
        <h2 className="profile-form__title">{t('Edit profile')}</h2>
        <div className="profile-form__field">
          <TextField
            label={t('Name')}
            disabled={!editValues.name}
            {...register('name', {
              minLength: { value: 3, message: t('Minimum 3 characters') },
            })}
            size="small"
            error={!!errors.name}
            helperText={errors?.name ? errors.name.message : null}
            className={errors.name ? 'profile__error-input' : 'profile__input'}
          />
          <IconButton
            name="name"
            onClick={onEditClick}
            color="primary"
            className="profile__field-btn"
          >
            {editValues.name ? <ReplayIcon /> : <EditIcon />}
          </IconButton>
        </div>
        <div className="profile-form__field">
          <TextField
            label={t('Login')}
            disabled={!editValues.login}
            {...register('login', {
              minLength: { value: 3, message: t('Minimum 3 characters') },
              pattern: {
                value: /^^[a-zA-Z0-9]+$/,
                message: t('Only english letters and numbers'),
              },
            })}
            size="small"
            error={!!errors.login}
            helperText={errors?.login ? errors.login.message : null}
            className={errors.login ? 'profile__error-input' : 'profile__input'}
          />
          <IconButton
            name="login"
            onClick={onEditClick}
            color="primary"
            className="profile__field-btn"
          >
            {editValues.login ? <ReplayIcon /> : <EditIcon />}
          </IconButton>
        </div>
        <div className="profile-form__field">
          <TextField
            required
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
            className={errors.password ? 'profile__error-input' : 'profile__input'}
          />
          <div style={{ width: '40px', height: '40px' }}></div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className="profile__button"
          disabled={!isDirty || !isValid}
        >
          {t('Save')}
        </Button>
      </form>
      <BackdropLoader open={isLoading} />
    </>
  );
};
