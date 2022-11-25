import { Modal } from 'components';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType } from 'types/types';
import { idType, useDelete } from 'hooks/useDelete';
import { useAppDispatch } from 'hooks/hooks';
import { showNotification } from 'store/slices/notificationSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Typography } from '@mui/material';
import { updateUser } from 'store/slices/mainSlice';

interface DeleteProps {
  category: CategoryType;
  id: idType;
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Delete: FC<DeleteProps> = ({ category, id, visible, setModal }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { deleteItem, error } = useDelete(category, id);

  useEffect(() => {
    if ('error' in error && error.error && 'status' in error.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: `${t(error.error.status as string)} ${t(category)} ${t('delFailed')}`,
          severity: 'error',
        })
      );
    }
  }, [error.isError]);

  const onDelete = async () => {
    const result = await deleteItem();

    if ('error' in result && 'status' in result.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: `${t(result.error.status as string)} ${t(category)} ${t('delFailed')}`,
          severity: 'error',
        })
      );
    }
    if ('data' in result) {
      setModal((prev) => !prev);
      dispatch(
        showNotification({
          isShow: true,
          text: `${t(category)} ${t('delSuccess')}`,
          severity: 'success',
        })
      );
      if (category === 'user') {
        dispatch(updateUser({ user: undefined }));
      }
    }
  };

  return (
    <Modal visible={visible} setModal={setModal}>
      <Box
        sx={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: 'center',
        }}
      >
        <Typography component="h4">{t('DeleteMess')}</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => setModal(false)}
            disabled={error.isLoading}
          >
            {t('Cancel')}
          </Button>
          <LoadingButton
            variant="contained"
            color="error"
            loading={error.isLoading}
            loadingPosition="start"
            onClick={onDelete}
            startIcon={<DeleteIcon />}
          >
            {t('Delete')}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};
