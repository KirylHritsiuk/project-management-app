import { Autocomplete, Checkbox, InputAdornment, MenuItem, TextField, Box } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import { boardsAPI } from '../../../api/boardsApi';
import { CreateBoardType, GetBoardType, GetUserType } from '../../../types/types';
import { Modal } from '../../UI/Modal/Modal';
import { useGetUserFromId } from 'hooks/useGetUserFromId';
import { LoadingButton } from '@mui/lab';
import { useHandlingError } from 'hooks/useHandlingError';

interface EditProps {
  data: GetBoardType;
  visible: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Edit: FC<EditProps> = ({ data, visible, setModal }) => {
  const { t } = useTranslation();
  const { catchError, setShow } = useHandlingError();

  const [editBoard, status] = boardsAPI.useUpdateBoardMutation();

  const { users: allUsers, userList } = useGetUserFromId(data.owner, data.users);

  const [owner, setOwner] = useState<string>(data.owner);
  const [users, setUsers] = useState<GetUserType[]>(userList);
  const ids = users.map((u) => u._id);
  const idsInit = userList.map((u) => u._id);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateBoardType>({
    defaultValues: { title: data.title, owner, users: idsInit },
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOwner(event.target.value);
  };

  useEffect(() => {
    if (!visible) {
      reset();
      setUsers(userList);
    }
  }, [visible]);

  const onSubmit = async (formData: CreateBoardType) => {
    const result = await editBoard({ boardId: data._id, body: { ...formData, users: ids } });
    if ('data' in result) {
      setModal((prev) => !prev);
      setShow({
        isShow: true,
        text: `${t('board')} ${t('editSuccess')}`,
        severity: 'success',
      });
    } else {
      catchError(result.error, `${t('board')} ${t('editFailed')}`);
    }
  };

  return (
    <Modal visible={visible} setModal={setModal}>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label={`${t('Title')}*`}
          defaultValue={data.title}
          {...register('title', {
            required: { value: true, message: t('Required field') },
            pattern: {
              value: /^[\S]/,
              message: t('No spaces'),
            },
          })}
          error={!!errors.title}
          helperText={errors?.title ? errors.title.message : null}
          className={errors.title ? 'auth__error-input' : 'auth__input'}
        />
        <TextField
          select
          sx={{ marginBottom: '20px' }}
          label={t('Owner')}
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
            <MenuItem key={user._id} value={user._id}>
              {user.login}
            </MenuItem>
          ))}
        </TextField>
        <Controller
          name="users"
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange } }) => (
            <Autocomplete
              multiple
              disableCloseOnSelect
              value={!visible ? userList : users}
              options={allUsers || []}
              getOptionLabel={(option) => option!.login}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option!.login}
                </li>
              )}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label={t('Users')} placeholder={`${t('Search')}`} />
              )}
              onChange={(_, data) => {
                setUsers(data);
                onChange(data.map((u) => u!._id));
                return data;
              }}
            />
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
          disabled={!!errors.title}
          loading={status.isLoading}
          sx={{ marginTop: '20px' }}
          loadingPosition="center"
          startIcon={<SaveIcon />}
        >
          {t('Save')}
        </LoadingButton>
      </Box>
    </Modal>
  );
};
