import { Typography } from '@mui/material';
import { Board, Loader, text } from 'components';
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
  isLoading: boolean;
  isFetching: boolean;
}

export const BoardList: FC<BoardListProps> = ({
  boards,
  id,
  user,
  isError,
  isLoading,
  isFetching,
}) => {
  const { t } = useTranslation();

  if ((boards && boards.length == 0 && !isError && !isFetching) || (isError && isLoading)) {
    return (
      <Typography
        component={motion.h2}
        variant="h2"
        variants={text}
        initial="init"
        animate="anim"
        exit="exit"
        className={styled.empty}
      >
        {(user == id && t('Empty')) || (user !== id && t('EmptyAll'))}
        {isError && t('BoardListError')}
      </Typography>
    );
  }

  return (
    <AnimatePresence>
      <motion.div className={styled.list}>
        {boards && !isError && !isFetching ? (
          boards.map((user) => <Board key={user._id} data={user} />)
        ) : (
          <Loader />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
