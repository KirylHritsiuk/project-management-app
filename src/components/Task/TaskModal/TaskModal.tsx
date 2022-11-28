import React, { useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, Autocomplete, Checkbox, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { tasksAPI } from 'api/tasksApi';
import { authUser } from 'store/slices/userSlice';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import { BackdropLoader } from 'components';
import { showNotification } from 'store/slices/notificationSlice';
import { selectBoard } from 'store/slices/boardSlice';
import { GetUserType, TaskType } from 'types/types';

import './TaskModal.scss';

type Props = {
  columnId: string;
  task: TaskType;
};

const editValuesInitial: { [key: string]: boolean } = {
  title: false,
  description: false,
  users: false,
  column: false,
};

export const TaskModal: React.FC<Props> = ({ columnId, task }) => {
  const { users: allUsers } = useAppSelector(authUser);
  const { board, columns } = useAppSelector(selectBoard);
  const [updateTask, status] = tasksAPI.useUpdateTaskMutation();
  const [editValues, setEditValues] = useState({ ...editValuesInitial });
  const [users, setUsers] = useState<GetUserType[]>(
    allUsers?.filter((item) => task.users.includes(item._id)) as GetUserType[]
  );
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
    control,
    setValue,
  } = useForm();

  const onEditClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const { name: btnName } = ev.currentTarget;
    setEditValues({ ...editValues, [btnName]: !editValues[btnName] });
    setValue(btnName, (task as { [key: string]: string | number | string[] })[btnName]);
  };

  const onSubmit = async (data: FieldValues) => {
    const body = {
      title: data.title || task.title,
      description: data.description || task.description,
      users: data.users || task.users,
      order: task.order,
      userId: task.userId,
      columnId: task.columnId,
    };
    const result = await updateTask({ boardId: board!._id, columnId, taskId: task._id, body });
    if ('error' in result && 'status' in result.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: `${t(result.error.status as string)} ${t('Task')} ${t('editFailed')}`,
          severity: 'error',
        })
      );
    }
    if ('data' in result) {
      setEditValues({ ...editValuesInitial });
      dispatch(
        showNotification({
          isShow: true,
          text: `${t('Task')} ${t('editSuccess')}`,
          severity: 'success',
        })
      );
    }
  };

  return (
    <form className="task-modal__form" onSubmit={handleSubmit(onSubmit)}>
      <p className="task-modal__field-title">{t('Title')}:</p>
      <div className="task-modal__field">
        {editValues.title ? (
          <TextField
            className="task-modal__input"
            required
            size="small"
            {...register('title', { required: true })}
          />
        ) : (
          <h2>{task.title}</h2>
        )}
        <IconButton
          name="title"
          onClick={onEditClick}
          color="primary"
          className="task-modal__field-btn"
        >
          {editValues.title ? <ReplayIcon /> : <EditIcon />}
        </IconButton>
      </div>

      <p className="task-modal__field-title">{t('Description')}:</p>
      <div className="task-modal__field">
        {editValues.description ? (
          <TextField
            required
            className="task-modal__input"
            multiline
            rows={3}
            size="small"
            {...register('description', { required: true })}
          />
        ) : (
          <p className="task-modal__desc">{task.description}</p>
        )}{' '}
        <IconButton
          name="description"
          onClick={onEditClick}
          color="primary"
          className="task-modal__field-btn"
        >
          {editValues.description ? <ReplayIcon /> : <EditIcon />}
        </IconButton>
      </div>

      <p className="task-modal__field-title">{t('Users')}:</p>
      <div className="task-modal__field">
        {editValues.users ? (
          <Controller
            name="users"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Autocomplete
                multiple
                disableCloseOnSelect
                size="small"
                className="task-modal__input"
                value={users}
                options={allUsers || []}
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
                  <TextField {...params} placeholder={t('Search') as string} />
                )}
                onChange={(_, data) => {
                  setUsers(data);
                  onChange(data.map((u) => u!._id));
                  return data;
                }}
              />
            )}
          />
        ) : (
          <p>
            {allUsers
              ?.filter((item) => task.users.includes(item._id))
              .map((it) => it.login)
              .join(', ')}
          </p>
        )}{' '}
        <IconButton
          name="users"
          onClick={onEditClick}
          color="primary"
          className="task-modal__field-btn"
        >
          {editValues.users ? <ReplayIcon /> : <EditIcon />}
        </IconButton>
      </div>

      <p className="task-modal__field-title">
        {`${t('Creator')}: ${allUsers?.find((item) => item._id === task.userId)?.login}`}
      </p>
      <p className="task-modal__field-title">{`${t('board')}: ${board?.title}`}</p>
      <p className="task-modal__field-title">
        {`${t('column')}: ${columns?.find((item) => item._id === task.columnId)?.title}`}
      </p>

      {Object.values(editValues).some((item) => item) ? (
        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
          disabled={!isValid || !isDirty}
          loading={status.isLoading}
          className="task-modal__btn"
          loadingPosition="center"
          startIcon={<SaveIcon />}
        >
          {t('Save')}
        </LoadingButton>
      ) : (
        <div className="false-button"></div>
      )}
      <BackdropLoader open={status.isLoading} />
    </form>
  );
};
