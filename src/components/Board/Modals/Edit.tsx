import { Autocomplete, Button, Checkbox, InputAdornment, MenuItem, TextField } from '@mui/material';
import { Modal } from 'components';
import { FC, useState, useEffect } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { usersAPI } from 'api/usersApi';
import { boardsAPI } from 'api/boardsApi';
import { CreateBoardType, GetBoardType } from 'types/types';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styled from './Edit.module.scss';
import { useAppSelector } from 'hooks/hooks';
import SaveIcon from '@mui/icons-material/Save';

interface EditProps {
  data: GetBoardType;
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Edit: FC<EditProps> = ({ data, visible, setModal }) => {
  const { data: allUsers } = usersAPI.useGetUsersQuery('');
  const { login } = useAppSelector((state) => state.user);
  const [editBoard] = boardsAPI.useUpdateBoardMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, errors },
    reset,
  } = useForm<CreateBoardType>();

  const usersFields = allUsers?.filter((el) => el.login !== login).map((el) => el.login) ?? [];
  const [owner, setOwner] = useState<string>(data.owner);
  const [users, setUsers] = useState<string[]>(data.users);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOwner(event.target.value);
  };

  const onSubmit = (formData: CreateBoardType) => {
    // console.log(formData);
    editBoard({ id: data._id, body: { ...formData, users } })
      .then(() => {
        setModal(false);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal visible={visible} setModal={setModal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styled.form}>
        <TextField
          required
          label="Title"
          defaultValue={data.title}
          {...register('title', { required: true })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        <TextField
          select
          label="Owner"
          value={owner}
          {...register('owner', { onChange: (e) => handleChange(e) })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <OwnerIcon />
              </InputAdornment>
            ),
          }}
        >
          {allUsers?.map((user) => (
            <MenuItem key={user._id} value={user.login}>
              {user.login}
            </MenuItem>
          ))}
        </TextField>
        <Controller
          name="users"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <Autocomplete
              multiple
              disableCloseOnSelect
              defaultValue={[...data.users]}
              options={[...usersFields]}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Users" placeholder="Search" />}
              onChange={(_, data) => {
                console.log(data);
                setUsers(data);
                onChange(data);
                return data;
              }}
            />
          )}
        />
        <Button
          type="submit"
          disabled={!isDirty}
          variant="contained"
          color="secondary"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>
      </form>
    </Modal>
  );
};
