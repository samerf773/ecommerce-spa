import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

const drawerWidth = 220;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    { label: 'Welcome', path: '/welcome', icon: <span style={{ fontSize: 22 }}>🏠</span> },
    { label: 'Products', path: '/products', icon: <span style={{ fontSize: 22 }}>📦</span> },
  ];

  const getTitle = () => {
    const match = routes.find(r => location.pathname.includes(r.path));
    return match ? match.label : 'Dashboard';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: 'primary.main',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {getTitle()}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#f5f5f5',
            borderRight: '1px solid #ddd',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {routes.map(route => (
              <ListItem
                key={route.path}
                disablePadding
                onClick={() => navigate(route.path)}
              >
                <ListItemButton selected={location.pathname === route.path}>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#fafafa', p: 3, minHeight: '100vh' }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
