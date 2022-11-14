import { Button } from '@mui/material';
import { Modal } from 'components';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import { boardsAPI } from 'api/boardsApi';

interface DeleteProps {
  id: string;
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Delete: FC<DeleteProps> = ({ id, visible, setModal, setDelete }) => {
  const [deleteBoard] = boardsAPI.useDeleteBoardMutation();
  console.log(id);
  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteBoard({ id });
    setDelete((prev) => !prev);
  };
  return (
    <Modal visible={visible} setModal={setModal}>
      <Button variant="contained" onClick={onDelete} color="error" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </Modal>
  );
};
