import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'store/slices/notificationSlice';
import { NotificationType } from 'types/types';

const initial: NotificationType = {
  isShow: false,
  text: '',
  severity: undefined,
};

export const useNotification = () => {
  const dispatch = useDispatch();
  const [isShow, setShow] = useState<NotificationType>(initial);

  useEffect(() => {
    if (isShow.isShow) {
      dispatch(showNotification(isShow));
    }
  }, [isShow]);

  return { setShow };
};
