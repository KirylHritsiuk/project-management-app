import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material';
import { Modal } from 'components';
import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { usersAPI } from 'api/usersApi';
import { boardsAPI } from 'api/boardsApi';
import { GetBoardType } from 'types/types';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import styled from './Edit.module.scss';

interface EditProps {
  data: GetBoardType;
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Edit: FC<EditProps> = ({ data, visible, setModal }) => {
  const { data: allUsers } = usersAPI.useGetUsersQuery('');
  const [editBoard] = boardsAPI.useUpdateBoardMutation();
  console.log(data.users);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    // editBoard({ id: _id, body: { ...(data as CreateBoardType), users: [] } })
    //   .then(() => {
    //     setEdit(false);
    //     reset();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    console.log(data);
  };

  return (
    <Modal visible={visible} setModal={setModal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styled.form}>
        <TextField
          required
          label="Title"
          defaultValue={data.title}
          helperText="Please, enter title."
          {...register('title', { required: true })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        <TextField
          id="input-with-icon-textfield"
          label="Owner"
          defaultValue={data.owner}
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
          limitTags={3}
          id="multiple-limit-tags"
          options={allUsers?.map((el) => el.name) ?? ['']}
          getOptionLabel={(option) => option}
          defaultValue={data.users}
          renderInput={(params) => <TextField {...params} label="Users" placeholder="Users" />}
          {...register('users')}
          sx={{ width: '300px' }}
        />
        <input type="submit" />
      </form>
    </Modal>
  );
};
