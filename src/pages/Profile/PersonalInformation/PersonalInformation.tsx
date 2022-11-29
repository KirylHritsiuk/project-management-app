import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useAppSelector } from 'hooks/hooks';
import { authUser } from 'store/slices/userSlice';
import { Delete, Modal } from 'components';
import { EditProfileForm } from '../EditProfileForm/EditProfileForm';

import './PersonalInformation.scss';

export const PersonalInformation: React.FC = () => {
  const { id, login, name } = useAppSelector(authUser);
  const [isDelete, setDelete] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <div className="profile__info">
      <h3 className="info__title">{t('Personal information')}</h3>
      <p className="info__label">
        {t('Name')}: <span className="info__value">{name}</span>
      </p>
      <p className="info__label">
        {t('Login')}: <span className="info__value">{login}</span>
      </p>
      <p className="info__label">
        {t('Id')}: <span className="info__value">{id}</span>
      </p>
      <div className="info__btns">
        <Button variant="contained" onClick={() => setEdit(true)} className="profile__del-button">
          {t('Edit')}
        </Button>
        <Button variant="outlined" onClick={() => setDelete(true)} className="profile__del-button">
          {t('Delete')}
        </Button>
      </div>
      <Modal visible={isEdit} setModal={setEdit}>
        <EditProfileForm setModal={setEdit} />
      </Modal>
      <Delete category="user" visible={isDelete} setModal={setDelete} id={{ id }} />
    </div>
  );
};
