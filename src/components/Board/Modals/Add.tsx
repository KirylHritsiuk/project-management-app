import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material';
import { Modal } from 'components';
import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { usersAPI } from 'api/usersApi';
import { boardsAPI } from 'api/boardsApi';
import { CreateBoardType, GetBoardType } from 'types/types';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import styled from './Edit.module.scss';

interface AddProps {
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Add: FC<AddProps> = ({ visible, setModal }) => {
  const { data: allUsers } = usersAPI.useGetUsersQuery('');
  const [addBoard] = boardsAPI.useCreateBoardMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    // addBoard({ ...(data as CreateBoardType), users: [] })
    //   .then(() => {
    //     setModal(false);
    //     reset();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <Modal visible={visible} setModal={setModal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styled.form}>
        <TextField
          required
          label="Title"
          helperText="Please, enter title."
          {...register('title', { required: true })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        <TextField
          id="input-with-icon-textfield"
          label="Owner"
          //**TODO change username */
          defaultValue={'IMask'}
          {...register('owner', { required: true })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <OwnerIcon />
              </InputAdornment>
            ),
          }}
        />
        <Autocomplete
          multiple
          limitTags={2}
          options={allUsers?.map((el) => el.name) ?? ['']}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label="Users" placeholder="Users" {...register('users')} />
          )}
          sx={{ width: '300px' }}
        />
        <input type="submit" />
      </form>
    </Modal>
  );
};
