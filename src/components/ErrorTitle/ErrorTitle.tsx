import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorTitleProps } from './ErrorTitle.props';
import styled from './ErrorTitle.module.scss';
import cn from 'classnames';
import { InfoTitle } from 'components';
import { useTranslation } from 'react-i18next';

export const ErrorTitle = ({ title, className, refetch, data }: ErrorTitleProps) => {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      <motion.div className={cn(styled.error, className)}>
        {!data && <InfoTitle title={title ?? t('WrongError')} />}
        <IconButton onClick={refetch} color="primary">
          <ReplayIcon />
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};
