import React from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, Autocomplete, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { tasksAPI } from 'api/tasksApi';
import { authUser } from 'store/slices/userSlice';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import { BackdropLoader } from 'components';
import { showNotification } from 'store/slices/notificationSlice';

import './AddTask.scss';

type Props = {
  boardId: string;
  columnId: string;
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddTask: React.FC<Props> = ({ boardId, columnId, setShowTaskModal }) => {
  const { id: userId, users } = useAppSelector(authUser);
  const [createTask, status] = tasksAPI.useCreateTaskMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    control,
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const body = {
      title: data.title,
      order: 0,
      description: data.description,
      userId: userId,
      users: data.users,
    };
    const result = await createTask({ boardId, columnId, body });

    if ('error' in result && 'status' in result.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: `${t(result.error.status as string)} ${t('Task')} ${t('addFailed')}`,
          severity: 'error',
        })
      );
    }
    if ('data' in result) {
      setShowTaskModal((prev) => !prev);
      reset();
      dispatch(
        showNotification({
          isShow: true,
          text: `${t('Task')} ${t('addSuccess')}`,
          severity: 'success',
        })
      );
    }
  };

  return (
    <form className="add-task__form" onSubmit={handleSubmit(onSubmit)}>
      <h2>{t('Add task')}</h2>
      <TextField required label={t('Title')} {...register('title', { required: true })} />
      <TextField
        required
        multiline
        rows={3}
        label={t('Description')}
        {...register('description', { required: true })}
      />
      <Controller
        name="users"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={users || []}
            getOptionLabel={(option) => option.login}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.login}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`${t('Users')} *`}
                placeholder={t('Search') as string}
              />
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
      <BackdropLoader open={status.isLoading} />
    </form>
  );
};
