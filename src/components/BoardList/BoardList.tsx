import { Board, InfoTitle } from 'components';
import { useTranslation } from 'react-i18next';
import styled from './BoardList.module.scss';
import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GetBoardType } from 'types/types';

interface BoardListProps {
  boards?: GetBoardType[];
  id: string;
  user: string;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

export const BoardList: FC<BoardListProps> = ({ boards, id, user, isLoading }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence mode="wait">
      <motion.div className={styled.list}>
        {boards && boards.map((user) => <Board key={user._id} data={user} />)}
        {boards && boards.length == 0 && !isLoading && (
          <InfoTitle title={user == id ? t('Empty') : t('EmptyAll')} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
