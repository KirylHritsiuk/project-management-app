import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { Modal } from 'components';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useEffect, useState } from 'react';
import { boardsAPI } from 'api/boardsApi';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';

interface DeleteProps {
  id: string;
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Delete: FC<DeleteProps> = ({ id, visible, setModal, setDelete }) => {
  const [deleteBoard] = boardsAPI.useDeleteBoardMutation();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<{ agree: boolean }>();
  const [agree, setAgree] = useState<boolean>(false);

  const onSubmit = () => {
    deleteBoard({ id });
    setDelete((prev) => !prev);
  };

  useEffect(() => {
    return () => setAgree(false);
  }, []);

  return (
    <Modal visible={visible} setModal={setModal}>
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="agree"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <FormControlLabel
              control={<Checkbox color="error" />}
              label={t('DeleteMess')}
              checked={agree}
              onChange={(_, data) => {
                setAgree(data);
                onChange(data);
                return data;
              }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!agree}
          color="error"
          startIcon={<DeleteIcon />}
        >
          {t('Delete')}
        </Button>
      </Box>
    </Modal>
  );
};
