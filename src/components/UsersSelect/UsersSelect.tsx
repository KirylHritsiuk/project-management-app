import { CircularProgress, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/hooks';
import { ChangeEvent, FC } from 'react';
import { updateUser } from 'store/slices/mainSlice';
import { GetUserType } from 'types/types';
import { ReactComponent as OwnerIcon } from '../Board/Owner.svg';

interface UsersSelectProps {
  users: GetUserType[] | undefined;
  user: string;
  isLoading: boolean;
  isError: boolean;
  id: string;
}
export const UsersSelect: FC<UsersSelectProps> = ({ users, user, id, isLoading, isError }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (user !== e.target.value) {
      dispatch(updateUser({ user: e.target.value }));
      localStorage.setItem('userFilter', e.target.value);
    }
  };

  // if (isError && isLoading) return null;

  return (
    <TextField
      select
      label={t('Users')}
      value={isLoading ? '' : user}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {isLoading && <CircularProgress size={20} />}
          </InputAdornment>
        ),
      }}
      sx={[
        {
          width: 3 / 4,
          alignSelf: 'center',
          '& label': {
            zIndex: 0,
          },
        },
      ]}
    >
      {users && (
        <MenuItem value={'all'} key={'All'}>
          {t('All')}
        </MenuItem>
      )}
      {users &&
        users.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {id === user._id ? (
              <span>
                <OwnerIcon /> {user.login}
              </span>
            ) : (
              user.login
            )}
          </MenuItem>
        ))}
    </TextField>
  );
};
