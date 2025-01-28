import React from 'react';
import { Avatar, Popover, Typography, Button } from '@mui/material';
import { useAuth } from '../AuthContext.jsx';

const AvatarWithPopup = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Avatar
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ cursor: 'pointer', width: 24, height: 24 }} // Adjust size to match other icons
      >
        {user?.email.charAt(0).toUpperCase()}
      </Avatar>
      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{user?.email}</Typography>
        <Button onClick={logout} sx={{ mt: 1 }}>Logout</Button>
      </Popover>
    </div>
  );
};

export default AvatarWithPopup;