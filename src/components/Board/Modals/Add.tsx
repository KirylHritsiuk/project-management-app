import { Autocomplete, Checkbox, InputAdornment, MenuItem, TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import styled from './Edit.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { usersAPI } from '../../../api/usersApi';
import { boardsAPI } from '../../../api/boardsApi';
import { CreateBoardType } from '../../../types/types';
import { Modal } from '../../UI/Modal/Modal';
import { LoadingButton } from '@mui/lab';
import { showNotification } from 'store/slices/notificationSlice';

interface AddProps {
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Add: FC<AddProps> = ({ visible, setModal }) => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { data: allUsers, isLoading, error } = usersAPI.useGetUsersQuery('');
  const [addBoard, status] = boardsAPI.useCreateBoardMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<CreateBoardType>({
    defaultValues: { title: '', owner: id, users: [] },
  });

  const onSubmit: SubmitHandler<CreateBoardType> = async (data) => {
    const result = await addBoard(data);
    if (error && status.isError && 'status' in status.error) {
      if ('status' in status.error) {
        dispatch(
          showNotification({
            isShow: true,
            text: `${status.error.status}! ${t(['board', 'addFailed'])}`,
            severity: 'error',
          })
        );
      }
    } else if ('error' in result && 'status' in result.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: `${result.error.status}! ${t(['board', 'addFailed'])}`,
          severity: 'error',
        })
      );
    } else {
      dispatch(
        showNotification({
          isShow: true,
          text: `${t('board')} ${t('addSuccess')}`,
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
        <TextField required label={t('Title')} {...register('title', { required: true })} />
        <TextField
          select
          label={t('Owner')}
          defaultValue={id}
          {...register('owner')}
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
              options={allUsers || []}
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
          disabled={!isValid}
          loading={status.isLoading}
          loadingPosition="center"
          startIcon={<SaveIcon />}
        >
          {t('Add')}
        </LoadingButton>
      </form>
    </Modal>
  );
};
