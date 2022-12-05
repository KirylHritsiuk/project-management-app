import { Box, IconButton, Input } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { columnsAPI } from 'api/columnsApi';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import { BackdropLoader } from 'components';
import { useHandlingError } from 'hooks/useHandlingError';

interface EditProps {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
  close: () => void;
}

export const Edit = ({ boardId, columnId, title, order, close }: EditProps) => {
  const { t } = useTranslation();
  const [editColumn, status] = columnsAPI.useUpdateColumnMutation();
  const { catchError, setShow } = useHandlingError();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<{ title: string }>({
    defaultValues: { title },
  });

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    const result = await editColumn({
      boardId,
      columnId,
      body: { title: data.title.trim(), order },
    });
    if ('data' in result) {
      setShow({
        isShow: true,
        text: `${t('column')} ${t('editSuccess')}`,
        severity: 'success',
      });
      close();
      reset();
    } else {
      catchError(result.error, `${t('column')} ${t('editFailed')}`);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        position: 'relative',
        minWidth: '300px',
        height: '35px',
        border: 'none',
        color: 'white',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        autoFocus={true}
        placeholder={`${t('Title')}*`}
        sx={{ width: '300px', p: 2 }}
        {...register('title', {
          required: { value: true, message: t('Required field') },
          pattern: {
            value: /^[\S]/,
            message: t('No spaces'),
          },
        })}
        error={!!errors.title}
        className={errors.title && 'auth__error-input'}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={!!errors.title || !isDirty}
          loading={status.isLoading}
          loadingPosition="center"
          endIcon={<DoneIcon fontSize="small" />}
          size="small"
          sx={{
            minWidth: '23px',
            width: '23px',
            height: '23px',
            borderRadius: '50%',
            span: {
              margin: '0',
            },
          }}
        />
        <IconButton aria-label="cancel" onClick={close} size="medium">
          <CancelIcon fontSize="medium" sx={{ path: { fill: 'white' } }} />
        </IconButton>
      </Box>
      <BackdropLoader open={status.isLoading} />
    </Box>
  );
};
