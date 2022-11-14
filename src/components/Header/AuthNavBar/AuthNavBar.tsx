import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { authUser, logout } from 'store/slices/userSlice';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Translation } from 'i18nano';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

// import './Header.scss';

export const AuthNavBar: React.FC = () => {
  const { login } = useAppSelector(authUser);
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

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
    <List className="header__navbar">
      {pathname === '/main' ? (
        <ListItemButton component={Link} to="/main">
          <DashboardCustomizeIcon sx={{ mr: 1 }} color="action" fontSize="large" />
          <ListItemText
            sx={{ display: { xs: 'none', sm: 'inline' } }}
            primary={<Translation path="addBoard" />}
          />
        </ListItemButton>
      ) : (
        <ListItemButton component={Link} to="/main">
          <DashboardIcon sx={{ mr: 1 }} color="action" fontSize="large" />
          <ListItemText
            sx={{ display: { xs: 'none', sm: 'inline' } }}
            primary={<Translation path="Boards" />}
          />
        </ListItemButton>
      )}
      <IconButton onClick={handleMenu}>
        <Avatar>{login[0]}</Avatar>
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={onExit}>Sign out</MenuItem>
      </Menu>
    </List>
  );
};
