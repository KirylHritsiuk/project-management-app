import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Avatar,
  MenuItem,
  Popover,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { authUser, logout } from '../../../store/slices/userSlice';
import { Add } from '../../Board/Modals/Add';

export const AuthNavBar: React.FC = () => {
  const { login } = useAppSelector(authUser);
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onExit = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  return (
    <>
      <List className="header__navbar">
        {pathname === '/main' ? (
          <ListItemButton component={Link} to="/main" onClick={() => setVisible(true)}>
            <DashboardCustomizeIcon sx={{ mr: 1 }} color="action" fontSize="large" />
            <ListItemText sx={{ display: { xs: 'none', sm: 'inline' } }} primary={t('Add Board')} />
          </ListItemButton>
        ) : (
          <ListItemButton component={Link} to="/main">
            <DashboardIcon sx={{ mr: 1 }} color="action" fontSize="large" />
            <ListItemText sx={{ display: { xs: 'none', sm: 'inline' } }} primary={t('Boards')} />
          </ListItemButton>
        )}
        <IconButton onClick={handleMenu}>
          <Avatar>{login[0]}</Avatar>
        </IconButton>
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          disableScrollLock
        >
          <MenuItem onClick={handleClose} component={Link} to="/profile">
            {t('Profile')}
          </MenuItem>
          <MenuItem onClick={onExit}>{t('Sign Out')}</MenuItem>
        </Popover>
      </List>
      <Add visible={visible} setModal={setVisible} />
    </>
  );
};
