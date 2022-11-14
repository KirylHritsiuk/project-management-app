import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoardProps } from './Board.props';
import styled from './Board.module.scss';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import { BoarderMenu } from './Menu/BoarderMenu';

export const Board: React.FC<BoardProps> = ({ data }) => {
  const { _id, title, owner, users } = data;
  const navigate = useNavigate();

  return (
    <Card variant="outlined" className={styled.card}>
      <div className={styled.header}>
        <div className={styled.owner}>
          <OwnerIcon />
          {owner}
        </div>
        <BoarderMenu data={data} className={styled.menu} />
      </div>
      <div className={styled.body} onClick={() => navigate(`/main/${_id}`)}>
        <h2>{title}</h2>
        <ul className={styled.users}>
          {users.length === 0 ? (
            <li>No selected users</li>
          ) : (
            users.map((u, index) => <li key={u + index.toString()}>{u}</li>)
          )}
        </ul>
      </div>
    </Card>
  );
};
