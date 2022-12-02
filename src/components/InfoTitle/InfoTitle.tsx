import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { InfoTitleProps } from './InfoTitle.props';
import styled from './InfoTitle.module.scss';
import cn from 'classnames';

export const text = {
  init: { opacity: 0, scale: 0.5 },
  anim: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } },
};

export const InfoTitle = ({ title, className }: InfoTitleProps) => {
  return (
    <Typography
      component={motion.h2}
      variant="h2"
      variants={text}
      initial="init"
      animate="anim"
      exit="exit"
      className={cn(styled.empty, className)}
    >
      {title}
    </Typography>
  );
};
