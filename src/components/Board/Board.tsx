import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoardProps } from './Board.props';
import styled from './Board.module.scss';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import { BoarderMenu } from './Menu/BoarderMenu';
import { useTranslation } from 'react-i18next';
import { getUserFromId } from 'utils/getUserFromId';
import { AnimatePresence, motion } from 'framer-motion';

export const Board: React.FC<BoardProps> = ({ data, allUsers }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { _id, title, owner, users } = data;

  const user = getUserFromId(owner, allUsers);
  const userList = users.map((user) => getUserFromId(user, allUsers));

  return (
    <Card variant="outlined" className={styled.card}>
      <div className={styled.header}>
        <div className={styled.owner}>
          <OwnerIcon />
          {user && user.login}
        </div>
        <BoarderMenu data={data} className={styled.menu} />
      </div>
      <div className={styled.body} onClick={() => navigate(`/main/${_id}`)}>
        <h2>{title}</h2>
        <ul className={styled.users}>
          {userList && userList.length !== 0 ? (
            userList.map((user) => <li key={user?._id}>{user?.login}</li>)
          ) : (
            <li>{t('NoUsers')}</li>
          )}
        </ul>
      </div>
    </Card>
  );
};
