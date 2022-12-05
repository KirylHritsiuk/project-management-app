import { Box, TextField } from '@mui/material';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { columnsAPI } from '../../api/columnsApi';
import { Modal } from 'components';
import { useHandlingError } from 'hooks/useHandlingError';

interface AddProps {
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
  order: number;
}

export const Add: FC<AddProps> = ({ visible, setModal, boardId, order }) => {
  const { t } = useTranslation();
  const [addColumn, status] = columnsAPI.useCreateColumnMutation();
  const { catchError, setShow } = useHandlingError();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>({
    defaultValues: { title: '' },
  });

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    const result = await addColumn({ boardId, body: { title: data.title.trim(), order } });
    if ('data' in result) {
      setShow({
        isShow: true,
        text: `${t('column')} ${t('addSuccess')}`,
        severity: 'success',
      });
      setModal((prev) => !prev);
      reset();
    } else {
      catchError(result.error, `${t('column')} ${t('addFailed')}`);
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
