import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoardProps } from './Board.props';
import styled from './Board.module.scss';
import { ReactComponent as OwnerIcon } from './Owner.svg';
import { BoarderMenu } from './Menu/BoarderMenu';
import { useTranslation } from 'react-i18next';
import { useGetUserFromId } from 'hooks/useGetUserFromId';
import { AnimatePresence, motion } from 'framer-motion';

const text = {
  init: { opacity: 0, scale: 0.5 },
  anim: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};
const card = {
  init: { opacity: 0, scale: 0.5 },
  anim: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 1 } },
  hover: { scale: 1.03 },
  tab: { scale: 1.03 },
};

export const Board: React.FC<BoardProps> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { _id, title, owner, users } = data;

  const { user, userList } = useGetUserFromId(owner, users);

  return (
    <AnimatePresence>
      <Card
        variant="outlined"
        component={motion.div}
        variants={card}
        whileHover="hover"
        whileTap="tab"
        initial="init"
        animate="anim"
        exit="exit"
        className={styled.card}
      >
        <div className={styled.header}>
          <motion.div
            className={styled.owner}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4 }}
          >
            <OwnerIcon />
            {user && user.login}
          </motion.div>
          <BoarderMenu data={data} className={styled.menu} />
        </div>
        <div className={styled.body} onClick={() => navigate(`/main/${_id}`)}>
          <motion.h2 variants={text} initial="init" animate="anim">
            {title}
          </motion.h2>

          <ul className={styled.users}>
            {userList && userList.length !== 0 ? (
              userList.map((user) => (
                <motion.li variants={text} initial="init" animate="anim" key={user?._id}>
                  {user?.login}
                </motion.li>
              ))
            ) : (
              <motion.li variants={text} initial="init" animate="anim" key={'NoUsers'}>
                {t('NoUsers')}
              </motion.li>
            )}
          </ul>
        </div>
      </Card>
    </AnimatePresence>
  );
};
