import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { boardsAPI } from 'api/boardsApi';
import { useTranslation } from 'react-i18next';
import { updateUser } from 'store/slices/mainSlice';
import { logout } from 'store/slices/userSlice';
import { isFetchBaseQueryError } from 'utils/isFetchBaseQueryError';
import { isSerializedError } from 'utils/isSerializedError';
import { useAppDispatch } from './hooks';
import { useNotification } from './useNotification';

export const useHandlingError = () => {
  const { t } = useTranslation();
  const { setShow } = useNotification();
  const dispatch = useAppDispatch();

  const ErrorLogout = (message: string | number) => {
    switch (message) {
      case '403':
      case 403:
        setTimeout(() => {
          dispatch(logout());
          dispatch(updateUser({ user: undefined }));
          dispatch(boardsAPI.util.resetApiState());
        }, 1000);
        break;
    }
  };

  const catchError = (error: unknown, text?: string) => {
    if (isFetchBaseQueryError(error)) {
      const message = error.status as string;
      console.log('catch fetch', 'mes:', message, 'text:', text, 'err', error);
      setShow((prev) => ({
        ...prev,
        isShow: true,
        text: `${t(message)} ${text ?? ''}`,
        severity: 'error',
      }));
      ErrorLogout(message);
    } else if (isSerializedError(error)) {
      const message = error.message as string;
      const code = error.code as string;
      console.log('catch ser', message, error.code);
      setShow((prev) => ({
        ...prev,
        isShow: true,
        text: message,
        severity: 'error',
      }));
      ErrorLogout(code);
    } else {
      console.log('catch else', error);
      //   const message = (error as FetchBaseQueryError).status as string;
      //   console.log('catch fetch', 'mes:', message, 'text:', text, 'err', error);
      //   setShow((prev) => ({
      //     ...prev,
      //     isShow: true,
      //     text: `${t(message)} ${text ?? ''}`,
      //     severity: 'error',
      //   }));
      //   ErrorLogout(message);
    }
    // throw new Error('Ooops!');
  };

  return { catchError, setShow };
};
