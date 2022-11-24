import { Typography } from '@mui/material';
import { Board } from 'components';
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
        {boards && boards.map((user) => <Board key={user._id} data={user} />)}

        {boards && boards.length == 0 && user == id && (
          <Typography variant="h2" component="h2" className={styled.empty}>
            {t('Empty')}
          </Typography>
        )}
        {boards && boards.length == 0 && user !== id && (
          <Typography variant="h2" component="h2" className={styled.empty}>
            {t('EmptyAll')}
          </Typography>
        )}
        {/* {isError && (
          <Typography variant="h2" component="h2" className={styled.empty}>
            {t('BoardListError')}
          </Typography>
        )} */}
      </motion.div>
    </AnimatePresence>
  );
};
