import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslationChange } from 'i18nano';

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
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: '"en"',
      position: 'absolute',
      width: '100%',
      height: '100%',
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
  const { change } = useTranslationChange();
  const changeLanguage = (event: React.SyntheticEvent<Element, Event>, checked: boolean) => {
    if (checked) change('ru');
    else change('en');
  };

  return (
    <FormControlLabel
      control={<MaterialUISwitch defaultChecked />}
      label={undefined}
      onChange={changeLanguage}
      sx={{ m: 0 }}
    />
  );
};
