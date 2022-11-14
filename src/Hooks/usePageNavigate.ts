import { useNavigate } from 'react-router-dom';

export const usePageNavigate = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const goHome = () => {
    navigate('/', { replace: true });
  };
  return { goBack, goHome };
};
