import { LinearProgress } from '@mui/material';
import { usersAPI } from 'api/usersApi';
import BoardList from 'components/BoardList/BoardList';
import { useAppSelector } from 'hooks/hooks';
import { lazy, Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import styled from './Main.module.scss';

// const List = lazy(() => import('../../components/BoardList/BoardList'));

export function Main() {
  const { isAuth, id } = useAppSelector((state) => state.user);
  const { data: usersData } = usersAPI.useGetUsersQuery('');
  const [name, setName] = useState<string>();

  const { register, handleSubmit } = useForm<{ user: string }>({ defaultValues: { user: name } });
  const onSubmit = (data: { user: string }) => console.log(data);

  return isAuth ? (
    <main className={styled.main}>
      {/* <Suspense fallback={<LinearProgress />}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register('user')}>
          <option value={undefined}>All</option>
          {usersData?.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
        <input type="submit" />
      </form>
      <BoardList />
      {/* </Suspense> */}
    </main>
  ) : (
    <Navigate to={'/'} />
  );
}
