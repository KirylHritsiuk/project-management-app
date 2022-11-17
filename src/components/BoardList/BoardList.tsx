import { LinearProgress, MenuItem, TextField, Typography } from '@mui/material';
import { Board } from 'components';
import { useTranslation } from 'react-i18next';
import styled from './BoardList.module.scss';
import { usersAPI } from 'api/usersApi';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { updateUser } from 'store/slices/mainSlice';
import { getFilterBoards } from 'hooks/useGetFilterBoards';

function BoardList() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [{ id, login }, { user }] = useAppSelector((state) => [state.user, state.main]);
  const { data: users, error: usersError } = usersAPI.useGetUsersQuery('');
  // const { data: set } = boardsAPI.useGetBoardsSetQuery({
  //     boardsId: ['6373e91cb298cb95dbb65138', '6373eac9b298cb95dbb6513b'],
  //   });
  const { data: boards, isLoading, error, user: userFilter } = getFilterBoards(user);

  return (
    <>
      {boards?.length == 0 && userFilter == id && (
        <Typography variant="h2" component="h2" className={styled.empty}>
          {t('Empty')}
        </Typography>
      )}
      {boards?.length == 0 && userFilter !== id && (
        <Typography variant="h2" component="h2" className={styled.empty}>
          {t('EmptyAll')}
        </Typography>
      )}
      {error && (
        <Typography variant="h2" component="h2" className={styled.empty}>
          error
        </Typography>
      )}
      <TextField
        select
        label={t('Users')}
        value={user}
        onChange={(e) => dispatch(updateUser({ user: e.target.value }))}
        fullWidth
      >
        <MenuItem value={'all'} key={'all'}>
          {t('All')}
        </MenuItem>
        {users?.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {user.login}
          </MenuItem>
        ))}
      </TextField>
      <div className={styled.list}>
        {isLoading && <LinearProgress />}
        {boards && boards.map((user) => <Board key={user._id} data={user} allUsers={users} />)}
      </div>
    </>
  );
}

export default BoardList;
