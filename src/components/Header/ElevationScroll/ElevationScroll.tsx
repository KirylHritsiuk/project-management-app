import React, { ReactElement } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export function ElevationScroll(props: { children: ReactElement }) {
  const { children, ...other } = { ...props };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1,
    target: undefined,
  });

  return React.cloneElement(children, {
    style: {
      padding: trigger ? '0' : '10px 0',
      transition: trigger ? '0.5s ease-in' : '0.3s ease-out',
    },
    ...other,
  });
}
