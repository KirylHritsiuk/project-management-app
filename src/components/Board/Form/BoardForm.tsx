import { Autocomplete, Button, Checkbox, InputAdornment, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { usersAPI } from 'api/usersApi';
import { boardsAPI } from 'api/boardsApi';
import { CreateBoardType } from 'types/types';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import styled from './Edit.module.scss';
import { useAppSelector } from '../../../hooks/hooks';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function BoardForm() {
  const { login } = useAppSelector((state) => state.user);
  const { data: allUsers } = usersAPI.useGetUsersQuery('');
  const usersFields = allUsers?.filter((el) => el.login !== login).map((el) => el.name) ?? [];
  const [addBoard, status] = boardsAPI.useCreateBoardMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateBoardType>();

  // console.log(status);
  const onSubmit: SubmitHandler<CreateBoardType> = (data) => {
    console.log('submit');
    addBoard(data)
      .then(() => {
        // setModal(false);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styled.form}>
      <TextField required label="Title" {...register('title', { required: true })} />
      <TextField
        label="Owner"
        defaultValue={login}
        disabled
        {...register('owner', { required: true })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <OwnerIcon />
            </InputAdornment>
          ),
        }}
      />
      <Controller
        name="users"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={usersFields}
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
              onChange(data);
              return data;
            }}
          />
        )}
      />
      <Button
        onClick={() => console.log('click')}
        type="submit"
        variant="contained"
        color="secondary"
        endIcon={<SaveIcon />}
      >
        Save
      </Button>
    </form>
  );
}

export default BoardForm;
