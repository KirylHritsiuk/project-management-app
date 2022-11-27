import { Box, TextField } from '@mui/material';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { showNotification } from 'store/slices/notificationSlice';
import { useAppDispatch } from 'hooks/hooks';
import { columnsAPI } from '../../api/columnsApi';
import { Modal } from 'components';

interface AddProps {
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
  order: number;
}

export const Add: FC<AddProps> = ({ visible, setModal, boardId, order }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [addColumn, status] = columnsAPI.useCreateColumnMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>({
    defaultValues: { title: '' },
  });

  useEffect(() => {
    if ('error' in status && status.error && 'status' in status.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: `${t(status.error.status as string)} ${t('column')} ${t('addFailed')}`,
          severity: 'error',
        })
      );
    }
  }, [status.isError]);

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    const result = await addColumn({ boardId, body: { title: data.title.trim(), order } });
    if ('error' in result && 'status' in result.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: `${t(result.error.status as string)} ${t('column')} ${t('addFailed')}`,
          severity: 'error',
        })
      );
    }
    if ('data' in result) {
      setModal((prev) => !prev);
      reset();
      dispatch(
        showNotification({
          isShow: true,
          text: `${t('column')} ${t('addSuccess')}`,
          severity: 'success',
        })
      );
    }
  };

  return (
    <Modal visible={visible} setModal={setModal}>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', width: '300px' }}
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
        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
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
