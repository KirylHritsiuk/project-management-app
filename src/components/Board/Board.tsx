import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoardProps } from './Board.props';
import styled from './Board.module.scss';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import { BoarderMenu } from './Menu/BoarderMenu';
import { useTranslation } from 'react-i18next';
import { useGetUserFromId } from 'hooks/useGetUserFromId';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from 'hooks/hooks';
import { text } from 'components';

const card = {
  init: { opacity: 0, scale: 0.5 },
  anim: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 1 } },
  hover: { scale: 1.07 },
  tab: { scale: 1.07 },
};

export const Board: React.FC<BoardProps> = ({ data }) => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { _id, title, owner, users } = data;

  const { user, userList } = useGetUserFromId(owner, users);

  return (
    <AnimatePresence>
      <Card
        variant="outlined"
        component={motion.div}
        // variants={card}
        // whileHover="hover"
        // whileTap="tab"
        // initial="init"
        // animate="anim"
        // exit="exit"
        className={styled.card}
      >
        <div className={styled.header}>
          <motion.div
            className={styled.owner}
            variants={text}
            initial="init"
            animate="anim"
            exit="exit"
          >
            <OwnerIcon />
            {user ? user.login : t('NoUserError')}
          </motion.div>
          {user?._id === id && <BoarderMenu data={data} className={styled.menu} />}
        </div>
        <motion.div
          className={styled.body}
          onClick={() => navigate(`/main/${_id}`)}
          variants={card}
          whileHover="hover"
          whileTap="tab"
          initial="init"
          animate="anim"
          exit="exit"
        >
          <motion.h2 variants={text} initial="init" animate="anim" exit="exit">
            {title}
          </motion.h2>
          <ul className={styled.users}>
            {userList && userList.length !== 0 ? (
              userList.map((user) => (
                <motion.li
                  variants={text}
                  initial="init"
                  animate="anim"
                  exit="exit"
                  key={user?._id}
                >
                  {user?.login}
                </motion.li>
              ))
            ) : (
              <motion.li variants={text} initial="init" animate="anim" exit="exit" key={'NoUsers'}>
                {t('NoUsers')}
              </motion.li>
            )}
          </ul>
        </motion.div>
      </Card>
    </AnimatePresence>
  );
};
