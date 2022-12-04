import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        content: '"ру"',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: 'var(--hoverLinkColor)',
    width: 32,
    height: 32,
    '&:before': {
      content: '"en"',
      position: 'absolute',
      width: '100%',
      height: '85%',
      left: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export const LangBtn: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event: React.SyntheticEvent<Element, Event>, checked: boolean) => {
    if (checked) {
      i18n.changeLanguage('ru');
      localStorage.setItem('lang', 'ru');
    } else {
      i18n.changeLanguage('en');
      localStorage.setItem('lang', 'en');
    }
  };

  return (
    <FormControlLabel
      control={<MaterialUISwitch checked={localStorage.getItem('lang') !== 'en'} />}
      label={undefined}
      onChange={changeLanguage}
      sx={{ m: 0 }}
    />
  );
};
