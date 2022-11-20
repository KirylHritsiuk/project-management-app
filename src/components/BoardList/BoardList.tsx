import { MenuItem, TextField, Typography } from '@mui/material';
import { Board, Loader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from './BoardList.module.scss';
import { usersAPI } from 'api/usersApi';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { updateUser } from 'store/slices/mainSlice';
import { useFilterBoards } from 'hooks/useFilterBoards';

export const BoardList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [{ id }, { user }] = useAppSelector((state) => [state.user, state.main]);
  const { data: users, error: usersError } = usersAPI.useGetUsersQuery('');

  const { data: boards, isLoading, error, user: userFilter } = useFilterBoards(user);

  return (
    <>
      {boards && (
        <div className={styled.block}>
          <TextField
            select
            label={t('Users')}
            value={userFilter}
            onChange={(e) => dispatch(updateUser({ user: e.target.value }))}
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
            <MenuItem value={'all'} key={'All'}>
              {t('All')}
            </MenuItem>
            {users?.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.login}
              </MenuItem>
            ))}
          </TextField>
          {isLoading && <Loader />}
          <div className={styled.list}>
            {boards.map((user) => (
              <Board key={user._id} data={user} allUsers={users} />
            ))}
          </div>
        </div>
      )}
      {boards?.length == 0 && userFilter == id && (
        <Typography variant="h1" component="h2" className={styled.empty}>
          {t('Empty')}
        </Typography>
      )}
      {boards?.length == 0 && userFilter !== id && (
        <Typography variant="h1" component="h2" className={styled.empty}>
          {t('EmptyAll')}
        </Typography>
      )}
      {error && (
        <Typography variant="h1" component="h2" className={styled.empty}>
          error
        </Typography>
      )}
    </>
  );
};
