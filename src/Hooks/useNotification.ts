import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'store/slices/notificationSlice';
import { NotificationType } from 'types/types';

export const useNotification = () => {
  const dispatch = useDispatch();
  const [isShow, setShow] = useState<NotificationType>({
    isShow: false,
    text: '',
    severity: undefined,
  });
  useEffect(() => {
    if (isShow.isShow) {
      dispatch(showNotification(isShow));
      console.log('show');
    }
  }, [isShow]);
  return { setShow };
};
