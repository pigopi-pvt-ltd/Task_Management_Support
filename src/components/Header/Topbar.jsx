import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PigoPiLogo from '../../assets/PigoPi.png';

const Topbar = ({ handleDrawerToggle, username, branchName }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#000'}}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <img src={PigoPiLogo} alt="PigoPi Logo" style={{ height: '40px' }} />

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="h6" component="div">
          Support
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{display: 'flex'}}>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            {username}
          </Typography>
          <Typography variant="h6" noWrap component="div">
            {branchName}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
