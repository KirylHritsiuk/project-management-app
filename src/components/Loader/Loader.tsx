import React from 'react';
import { LoaderProps } from './Loader.props';
import cn from 'classnames';
import styled from './Loader.module.scss';

export const Loader: React.FC<LoaderProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styled.loader_wrapper)}>
      <div className={cn(styled.loader, className)} {...props}></div>
    </div>
  );
};
