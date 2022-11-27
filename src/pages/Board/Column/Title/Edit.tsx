import { Box, IconButton, Input } from '@mui/material';
import { forwardRef, RefObject, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { showNotification } from 'store/slices/notificationSlice';
import { useAppDispatch } from 'hooks/hooks';
import { columnsAPI } from 'api/columnsApi';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

interface EditProps {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
  close: () => void;
  ref: RefObject<HTMLInputElement>;
}

export const Edit = forwardRef<HTMLInputElement, EditProps>(
  ({ boardId, columnId, title, order, close }, ref) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [editColumn, status] = columnsAPI.useUpdateColumnMutation();

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isDirty },
    } = useForm<{ title: string }>({
      defaultValues: { title },
    });

    useEffect(() => {
      if ('error' in status && status.error && 'status' in status.error) {
        dispatch(
          showNotification({
            isShow: true,
            text: `${t(status.error.status as string)} ${t('column')} ${t('editFailed')}`,
            severity: 'error',
          })
        );
      }
    }, [status.isError]);

    const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
      const result = await editColumn({
        boardId,
        columnId,
        body: { title: data.title.trim(), order },
      });
      if ('error' in result && 'status' in result.error) {
        dispatch(
          showNotification({
            isShow: true,
            text: `${t(result.error.status as string)} ${t('column')} ${t('editFailed')}`,
            severity: 'error',
          })
        );
      }
      if ('data' in result) {
        close();
        reset();
        dispatch(
          showNotification({
            isShow: true,
            text: `${t('column')} ${t('editSuccess')}`,
            severity: 'success',
          })
        );
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
          placeholder={`${t('Title')}*`}
          sx={{ width: '300px', padding: '0' }}
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
      </Box>
    );
  }
);
