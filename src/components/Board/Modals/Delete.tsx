import { Button } from '@mui/material';
import { Modal } from 'components';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import { boardsAPI } from 'api/boardsApi';
import { useTranslation } from 'react-i18next';

interface DeleteProps {
  id: string;
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Delete: FC<DeleteProps> = ({ id, visible, setModal, setDelete }) => {
  const [deleteBoard] = boardsAPI.useDeleteBoardMutation();
  const { t } = useTranslation();

  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteBoard({ id });
    setDelete((prev) => !prev);
  };
  return (
    <Modal visible={visible} setModal={setModal}>
      <Button variant="contained" onClick={onDelete} color="error" startIcon={<DeleteIcon />}>
        {t('Delete')}
      </Button>
    </Modal>
  );
};
