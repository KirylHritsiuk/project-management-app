import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemText } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useTranslation } from 'react-i18next';

export const NavBar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <List className="header__navbar">
      <ListItemButton component={Link} to="/signin">
        <LoginIcon sx={{ mr: 1 }} color="action" fontSize="large" />
        <ListItemText sx={{ display: { xs: 'none', sm: 'inline' } }} primary={t('Sign In')} />
      </ListItemButton>
      <ListItemButton component={Link} to="/signup">
        <PersonAddAltIcon sx={{ mr: 1 }} color="action" fontSize="large" />
        <ListItemText sx={{ display: { xs: 'none', sm: 'inline' } }} primary={t('Sign Up')} />
      </ListItemButton>
    </List>
  );
};
