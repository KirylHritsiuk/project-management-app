import { MenuItem, TextField, Typography } from '@mui/material';
import { Board, Loader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from './BoardList.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { updateUser } from 'store/slices/mainSlice';
import { useFilterBoards } from 'hooks/useFilterBoards';
import { ChangeEvent } from 'react';

export const BoardList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [{ id }, { user }] = useAppSelector((state) => [state.user, state.main]);

  const { boards, user: userFilter, users } = useFilterBoards(user, id);
  console.log(id, user, userFilter);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateUser({ user: e.target.value }));
  };

  return (
    <>
      {boards.data && (
        <div className={styled.block}>
          <TextField
            select
            label={t('Users')}
            value={userFilter}
            onChange={onChange}
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
            {users.data?.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.login}
              </MenuItem>
            ))}
          </TextField>
          {boards.isLoading && <Loader />}
          <div className={styled.list}>
            {boards.data.map((user) => (
              <Board key={user._id} data={user} allUsers={users.data} />
            ))}
          </div>
        </div>
      )}
      {boards.data?.length == 0 && userFilter == id && (
        <Typography variant="h2" component="h2" className={styled.empty}>
          {t('Empty')}
        </Typography>
      )}
      {boards.data?.length == 0 && userFilter !== id && (
        <Typography variant="h2" component="h2" className={styled.empty}>
          {t('EmptyAll')}
        </Typography>
      )}
      {users.error && (
        <Typography variant="h2" component="h2" className={styled.empty}>
          error
        </Typography>
      )}
    </>
  );
};
