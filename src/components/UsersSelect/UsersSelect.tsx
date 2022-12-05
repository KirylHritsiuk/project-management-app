import { CircularProgress, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/hooks';
import { ChangeEvent, FC } from 'react';
import { updateUser } from 'store/slices/mainSlice';
import { GetUserType } from 'types/types';
import ReplayIcon from '@mui/icons-material/Replay';
import { ReactComponent as OwnerIcon } from '../Board/Owner.svg';

interface UsersSelectProps {
  users: GetUserType[] | undefined;
  user: string;
  isLoading: boolean;
  isError: boolean;
  id: string;
  refetch: () => void;
}

export const UsersSelect: FC<UsersSelectProps> = ({
  users,
  user,
  id,
  isLoading,
  isError,
  refetch,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const hasError = users === undefined && !isLoading;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (user && user !== e.target.value) {
      dispatch(updateUser({ user: e.target.value }));
    }
  };

  return (
    <TextField
      select={!hasError}
      error={hasError}
      label={isLoading ? '' : users ? t('Users') : t('NoUsersError')}
      value={isLoading || hasError ? '' : user}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {isLoading && <CircularProgress size={20} />}
            {hasError && (
              <IconButton onClick={refetch} color="primary">
                <ReplayIcon />
              </IconButton>
            )}
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
