import { Autocomplete, Checkbox, InputAdornment, MenuItem, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styled from './Edit.module.scss';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import { usersAPI } from '../../../api/usersApi';
import { boardsAPI } from '../../../api/boardsApi';
import { CreateBoardType, GetBoardType, GetUserType } from '../../../types/types';
import { Modal } from '../../UI/Modal/Modal';
import { getUserFromId } from 'utils/getUserFromId';
import { LoadingButton } from '@mui/lab';
import { showNotification } from 'store/slices/notificationSlice';
import { useAppDispatch } from 'hooks/hooks';

interface EditProps {
  data: GetBoardType;
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Edit: FC<EditProps> = ({ data, visible, setModal }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: allUsers, error } = usersAPI.useGetUsersQuery('');

  const [editBoard, status] = boardsAPI.useUpdateBoardMutation();

  const usersLogins = data.users.map((user) => getUserFromId(user, allUsers));
  const [owner, setOwner] = useState<string>(data.owner);
  const [users, setUsers] = useState<GetUserType[]>(usersLogins);
  const ids = users.map((u) => u._id);

  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, errors },
    reset,
  } = useForm<CreateBoardType>({
    defaultValues: { title: data.title, owner, users: ids },
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOwner(event.target.value);
  };

  const onSubmit = async (formData: CreateBoardType) => {
    const result = await editBoard({ id: data._id, body: { ...formData, users: ids } });
    if (error && status.isError && 'status' in status.error) {
      if ('status' in status.error) {
        dispatch(
          showNotification({
            isShow: true,
            text: `${status.error.status} error`,
            severity: 'error',
          })
        );
      }
    } else if ('error' in result && 'status' in result.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: `${result.error.status} error`,
          severity: 'error',
        })
      );
    } else {
      dispatch(
        showNotification({
          isShow: true,
          text: 'Board update',
          severity: 'success',
        })
      );
      setModal(false);
      reset();
    }
  };

  return (
    <Modal visible={visible} setModal={setModal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styled.form}>
        <TextField
          required
          label={t('Title')}
          defaultValue={data.title}
          {...register('title', { required: true })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        <TextField
          select
          label={t('Owner')}
          value={owner}
          {...register('owner', { onChange: (e) => handleChange(e) })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <OwnerIcon />
              </InputAdornment>
            ),
          }}
        >
          {allUsers?.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.login}
            </MenuItem>
          ))}
        </TextField>
        <Controller
          name="users"
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange } }) => (
            <Autocomplete
              multiple
              disableCloseOnSelect
              // defaultValue={usersLogins || null}
              value={users}
              options={allUsers || usersLogins}
              getOptionLabel={(option) => option.login}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.login}
                </li>
              )}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label={t('Users')} placeholder={t('Search') as string} />
              )}
              onChange={(_, data) => {
                setUsers(data);
                onChange(data.map((u) => u._id));
                return data;
              }}
            />
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
          disabled={!isDirty}
          loading={status.isLoading}
          loadingPosition="center"
          startIcon={<SaveIcon />}
        >
          {t('Save')}
        </LoadingButton>
      </form>
    </Modal>
  );
};
