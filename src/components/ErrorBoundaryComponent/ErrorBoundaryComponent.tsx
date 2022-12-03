import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { AnimatePresence, motion } from 'framer-motion';
import styled from './ErrorBoundaryComponent.module.scss';
import { InfoTitle } from 'components';
import { useTranslation } from 'react-i18next';
import { FallbackProps } from 'react-error-boundary';

export const ErrorBoundaryComponent = ({ ...props }: FallbackProps) => {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      <motion.div className={styled.error}>
        <InfoTitle title={t('BoundaryError')} />
        {/* <IconButton onClick={refetch} color="primary">
          <ReplayIcon />
        </IconButton> */}
      </motion.div>
    </AnimatePresence>
  );
};
