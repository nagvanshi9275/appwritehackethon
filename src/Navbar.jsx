import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Button,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { Search, Notifications, Add, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import your AuthContext

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const { user, loading, login, logout } = useAuth(); // Access auth context

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/wardrobe">
          <ListItemText primary="Wardrobe" />
        </ListItem>
        <ListItem button component={Link} to="/yourpics">
          <ListItemText primary="Outfits" />
        </ListItem>
        <ListItem button component={Link} to="/events">
          <ListItemText primary="Events/Planner" />
        </ListItem>
        <ListItem button component={Link} to="/analytics">
          <ListItemText primary="Analytics/Trends" />
        </ListItem>
      </List>
      <Divider />
      <Button
        variant="contained"
        sx={{
          margin: 2,
          width: '90%',
          padding: '10px 16px',
          fontSize: '1rem',
          backgroundColor: '#ff4081',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#ff4081',
          },
        }}
        startIcon={<Add />}
        component={Link}
        to="/create-outfit"
      >
        Create New Outfit
      </Button>
      <Divider />
      {!user ? (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{
            margin: 2,
            width: '90%',
            padding: '10px 16px',
            fontSize: '1rem',
          }}
        >
          Login
        </Button>
      ) : null}
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fafafa', color: '#333', boxShadow: 'none', borderBottom: '1px solid #fafafa' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          component={Link}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img
            src="https://i.postimg.cc/632jV0KW/Untitled-design-8.png" // Display the logo
            alt="FashionSathi Logo"
            style={{ height: '90px', width: 'auto' }} // Adjust the height as needed
          />
        </IconButton>

        {isSmallScreen ? (
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f3f4', borderRadius: '8px', padding: '0 10px', width: '400px' }}>
              <Search />
              <InputBase
                placeholder="Search your wardrobe…"
                sx={{ marginLeft: 1, flex: 1 }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
              <Button color="inherit" component={Link} to="/wardrobe">Wardrobe</Button>
              <Button color="inherit" component={Link} to="/yourpics">Outfits</Button>
              <Button color="inherit" component={Link} to="/events">Events/Planner</Button>
              <Button color="inherit" component={Link} to="/analytics">Analytics/Trends</Button>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ff4081',
                color: '#fff',
                '&:hover': { backgroundColor: '#ff4081' },
                marginLeft: 2,
              }}
              startIcon={<Add />}
              component={Link}
              to="/create-outfit"
            >
              New Outfit
            </Button>

            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>

            {loading ? (
              <p>Loading...</p> // You can replace this with a loading spinner or skeleton
            ) : user ? (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/profile"
                sx={{ marginLeft: 2 }}
              >
                Profile
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                sx={{ marginLeft: 2 }}
              >
                Login
              </Button>
            )}
          </>
        )}
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
