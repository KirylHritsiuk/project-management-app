import { IconButton, CircularProgress } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorTitleProps } from './ErrorTitle.props';
import styled from './ErrorTitle.module.scss';
import cn from 'classnames';
import { InfoTitle } from 'components';
import { text } from 'constants/animation';
import { useTranslation } from 'react-i18next';

export const ErrorTitle = ({ title, className, refetch, data, isFetching }: ErrorTitleProps) => {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      <motion.div
        variants={text}
        initial="init"
        animate="anim"
        className={cn(styled.error, className)}
      >
        {!data && <InfoTitle title={title ?? t('WrongError')} />}
        <IconButton onClick={refetch} disabled={isFetching} color="primary">
          {isFetching ? <CircularProgress size={20} /> : <ReplayIcon />}
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};
