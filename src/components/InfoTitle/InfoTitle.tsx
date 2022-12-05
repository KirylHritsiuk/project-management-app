import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { InfoTitleProps } from './InfoTitle.props';
import styled from './InfoTitle.module.scss';
import cn from 'classnames';
import { text } from 'constants/animation';

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
