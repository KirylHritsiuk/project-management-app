import { Modal } from 'components';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType } from 'types/types';
import { idType, useDelete } from 'hooks/useDelete';
import { useAppDispatch } from 'hooks/hooks';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Typography } from '@mui/material';
import { updateUser } from 'store/slices/mainSlice';
import { useError } from 'hooks/useError';

interface DeleteProps {
  category: CategoryType;
  id: idType;
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Delete: FC<DeleteProps> = ({ category, id, visible, setModal }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { catchError, setShow } = useError();
  const { deleteItem, error } = useDelete(category, id);

  const onDelete = async () => {
    const result = await deleteItem();
    if ('data' in result) {
      setModal((prev) => !prev);
      setShow((prev) => ({
        ...prev,
        isShow: true,
        text: `${t(category)} ${t('delSuccess')}`,
        severity: 'success',
      }));
      if (category === 'user') {
        dispatch(updateUser({ user: undefined }));
      }
    } else {
      catchError(result.error, `${t(category)} ${t('delFailed')}`);
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
