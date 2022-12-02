import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorTitleProps } from './ErrorTitle.props';
import styled from './ErrorTitle.module.scss';
import cn from 'classnames';
import { InfoTitle } from 'components';

export const ErrorTitle = ({ title, className, refetch }: ErrorTitleProps) => {
  return (
    <AnimatePresence>
      <motion.div className={cn(styled.error, className)}>
        <InfoTitle title={title} />
        <IconButton onClick={refetch} color="primary">
          <ReplayIcon />
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};
