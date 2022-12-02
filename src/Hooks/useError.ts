import { useTranslation } from 'react-i18next';
import { isFetchBaseQueryError } from 'utils/isFetchBaseQueryError';
import { isSerializedError } from 'utils/isSerializedError';
import { useNotification } from './useNotification';

export const useError = () => {
  const { t } = useTranslation();
  const { setShow } = useNotification();

  const catchError = (error: unknown, text?: string) => {
    if (isFetchBaseQueryError(error)) {
      const message = error.status as string;
      console.log('catch fetch', message, text, error);
      setShow((prev) => ({
        ...prev,
        isShow: true,
        text: `${t(message)} ${text ?? ''}`,
        severity: 'error',
      }));
    } else if (isSerializedError(error)) {
      const message = error.message as string;
      console.log('catch ser', message, error);
      setShow((prev) => ({
        ...prev,
        isShow: true,
        text: message,
        severity: 'error',
      }));
    } else {
      console.log('catch else', error);
    }
  };

  return { catchError, setShow };
};
