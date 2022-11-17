import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  const [elementHTML] = useState<HTMLDivElement>(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(elementHTML);

    return () => {
      document.body.removeChild(elementHTML);
    };
  }, []);

  return createPortal(children, elementHTML);
};
