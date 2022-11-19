import { Box, Button, Typography } from '@mui/material';
import { Modal } from 'components';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType, GetBoardType } from 'types/types';
import { idType, useDelete } from 'hooks/useDelete';
import { useAppDispatch } from 'hooks/hooks';
import { showNotification } from 'store/slices/notificationSlice';

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
    if (error.isError) {
      console.log(error);
      // let message;
      // if ('status' in authUser.error)
      //   message = (authUser.error.data as { message: string }).message;
      // else message = authUser.error.message!;
      dispatch(showNotification({ isShow: true, text: error.status, severity: 'error' }));
    } else {
      await deleteItem();
      dispatch(
        showNotification({
          isShow: true,
          text: `${category} delete success`,
          severity: 'success',
        })
      );
      // if (error.isSuccess) {
      //   );
      // }
    }
  };

  return (
    <Modal visible={visible} setModal={setModal}>
      <Box>
        {error.isLoading && <span>Loading....</span>}
        {error.isSuccess && <span>.....Success....</span>}
        <Typography component="h4">{t('DeleteMess')}</Typography>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={() => setModal(false)}
          startIcon={<SaveIcon />}
        >
          {t('Cancel')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="error"
          onClick={onDelete}
          startIcon={<DeleteIcon />}
        >
          {t('Delete')}
        </Button>
      </Box>
    </Modal>
  );
};
