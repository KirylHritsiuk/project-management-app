import { MODAL_ANIMATE_TIME } from 'constants/constants';
import { useEffect, useState } from 'react';

export const useMount = (opened: boolean) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, MODAL_ANIMATE_TIME);
    }
  }, [opened]);

  return { mounted };
};
