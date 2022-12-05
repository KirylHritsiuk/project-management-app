import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'store/slices/notificationSlice';
import { NotificationType } from 'types/types';
import { useAppSelector } from './hooks';

const initial: NotificationType = {
  isShow: false,
  text: '',
  severity: undefined,
};

export const useNotification = () => {
  const dispatch = useDispatch();
  const { isShow: isNotif } = useAppSelector((state) => state.notification);
  const [isShow, setShow] = useState<NotificationType>(initial);

  useEffect(() => {
    if (isShow.isShow && !isNotif) {
      dispatch(showNotification(isShow));
    }
  }, [isShow]);

  return { setShow };
};
