import { Typography } from '@mui/material';
import { Board, text } from 'components';
import { useTranslation } from 'react-i18next';
import styled from './BoardList.module.scss';
import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GetBoardType } from 'types/types';

interface BoardListProps {
  boards: GetBoardType[] | undefined;
  id: string;
  user: string;
  isError: boolean;
}

export const BoardList: FC<BoardListProps> = ({ boards, id, user, isError }) => {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      <motion.div className={styled.list}>
        {boards && !isError && boards.map((user) => <Board key={user._id} data={user} />)}
        <Typography
          component={motion.h2}
          variant="h2"
          variants={text}
          initial="init"
          animate="anim"
          exit="exit"
          className={styled.empty}
        >
          {(boards && boards.length == 0 && user == id && t('Empty')) ||
            (boards && boards.length == 0 && user !== id && t('EmptyAll'))}
          {isError && t('BoardListError')}
        </Typography>
      </motion.div>
    </AnimatePresence>
  );
};
