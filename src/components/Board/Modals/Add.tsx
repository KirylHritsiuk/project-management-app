import { Autocomplete, Box, Checkbox, TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { usersAPI } from '../../../api/usersApi';
import { boardsAPI } from '../../../api/boardsApi';
import { CreateBoardType } from '../../../types/types';
import { Modal } from '../../UI/Modal/Modal';
import { LoadingButton } from '@mui/lab';
import { updateUser } from 'store/slices/mainSlice';
import { useError } from 'hooks/useError';

interface AddProps {
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Add: FC<AddProps> = ({ visible, setModal }) => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const { catchError, setShow } = useError();
  const dispatch = useAppDispatch();
  const { data: allUsers } = usersAPI.useGetUsersQuery('');
  const [addBoard, status] = boardsAPI.useCreateBoardMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateBoardType>({
    defaultValues: { title: '', owner: id, users: [] },
  });

  const onSubmit: SubmitHandler<CreateBoardType> = async (data) => {
    const result = await addBoard(data);
    if ('data' in result) {
      setModal((prev) => !prev);
      reset();
      dispatch(updateUser({ user: id }));
      setShow((prev) => ({
        ...prev,
        isShow: true,
        text: `${t('board')} ${t('addSuccess')}`,
        severity: 'success',
      }));
    } else {
      catchError(result.error, `${t('board')} ${t('addFailed')}`);
    }
  };

  return (
    <Modal visible={visible} setModal={setModal}>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label={`${t('Title')}*`}
          {...register('title', {
            required: { value: true, message: t('Required field') },
            pattern: {
              value: /^[\S]/,
              message: t('No spaces'),
            },
          })}
          error={!!errors.title}
          helperText={errors?.title ? errors.title.message : null}
          className={errors.title ? 'auth__error-input' : 'auth__input'}
        />
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
          sx={{ marginTop: '20px' }}
          disabled={!!errors.title}
          loading={status.isLoading}
          loadingPosition="center"
          startIcon={<SaveIcon />}
        >
          {t('Add')}
        </LoadingButton>
      </Box>
    </Modal>
  );
};
