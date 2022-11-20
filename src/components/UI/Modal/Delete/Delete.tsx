import { Modal } from 'components';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType } from 'types/types';
import { idType, useDelete } from 'hooks/useDelete';
import { useAppDispatch } from 'hooks/hooks';
import { showNotification } from 'store/slices/notificationSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

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

  const onDelete = async () => {
    const result = await deleteItem();
    if (error.isError && 'status' in error.error) {
      if ('status' in error.error) {
        dispatch(
          showNotification({
            isShow: true,
            text: `${error.error.status} ${t(`${category}`)} ${t('delFailed')}`,
            severity: 'error',
          })
        );
      }
    } else if ('error' in result && 'status' in result.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: `${result.error.status} ${t(`${category}`)} ${t('delFailed')}`,
          severity: 'error',
        })
      );
    } else {
      dispatch(
        showNotification({
          isShow: true,
          text: `${t(`${category}`)} ${t('delSuccess')}`,
          severity: 'success',
        })
      );
      setModal((prev) => !prev);
    }
  };

  return (
    <Modal visible={visible} setModal={setModal}>
      <Box
        sx={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'flex-end',
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
