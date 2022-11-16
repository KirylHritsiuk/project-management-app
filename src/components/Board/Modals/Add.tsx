import { Autocomplete, Button, Checkbox, InputAdornment, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import styled from './Edit.module.scss';
import { useAppSelector } from '../../../Hooks/hooks';
import { usersAPI } from '../../../api/usersApi';
import { boardsAPI } from '../../../api/boardsApi';
import { CreateBoardType } from '../../../types/types';
import { Modal } from '../../UI/Modal/Modal';

interface AddProps {
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Add: FC<AddProps> = ({ visible, setModal }) => {
  const { login } = useAppSelector((state) => state.user);
  const { data: allUsers } = usersAPI.useGetUsersQuery('');
  const usersFields = allUsers?.filter((el) => el.login !== login).map((el) => el.login) ?? [];
  const [addBoard, status] = boardsAPI.useCreateBoardMutation();
  const { register, handleSubmit, control, reset } = useForm<CreateBoardType>();
  const { t } = useTranslation();
  const [users, setUsers] = useState<string[]>([]);

  // console.log(status);
  const onSubmit: SubmitHandler<CreateBoardType> = (data) => {
    if (typeof data.users === 'undefined') {
      data.users = [];
    }
    addBoard(data)
      .then(() => {
        setModal(false);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    return () => setUsers([]);
  }, []);

  return (
    <Modal visible={visible} setModal={setModal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styled.form}>
        <TextField required label={t('Title')} {...register('title', { required: true })} />
        <TextField
          label={t('Owner')}
          {...register('owner', { required: true })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <OwnerIcon />
              </InputAdornment>
            ),
            readOnly: true,
            value: login,
          }}
        />
        <Controller
          name="users"
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange } }) => (
            <Autocomplete
              multiple
              disableCloseOnSelect
              value={users}
              options={usersFields}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label={t('Users')} placeholder={t('Search') as string} />
              )}
              onChange={(_, data) => {
                setUsers(data);
                onChange(data);
                return data;
              }}
            />
          )}
        />
        <Button type="submit" variant="contained" color="secondary" endIcon={<SaveIcon />}>
          {t('Add')}
        </Button>
      </form>
    </Modal>
  );
};
