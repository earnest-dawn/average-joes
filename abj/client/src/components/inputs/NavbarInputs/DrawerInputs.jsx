import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import averageLogo from '../../../assets/images/averageLogo.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function TemporaryDrawer({ state = { left: false }, toggleDrawer }) {
    const MENU_ITEMS = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Admin', icon: <WorkOutlineIcon />, path: '/admin' },
  { text: 'Order Online', icon: <FastfoodIcon />, path: '/orderOnline' },
];
const list = (anchor) => (
        <Box
            sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={() => toggleDrawer(anchor, false)}
        >
            <List>
                {MENU_ITEMS.map((item) => (
    <ListItem key={item.text} disablePadding>
      <ListItemButton href={item.path}>
        <ListItemIcon sx={{ color: '#d60000' }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
    
    
  ))}
  <ListItem disablePadding>
    <ListItemButton 
      onClick={toggleDrawer('left', false)} 
      sx={{ justifyContent: 'flex-end', color: 'white' }}
    >
      <ListItemIcon sx={{ color: 'white', minWidth: 'auto', mr: 1 }}>
        <ChevronLeftIcon />
      </ListItemIcon>
      <ListItemText primary="Close Menu" sx={{ textAlign: 'right' }} />
    </ListItemButton>
  </ListItem>
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={() => toggleDrawer(anchor, false)}
                        PaperProps={{
                            sx: {
                                backgroundColor: '#005c5c',
                                color: 'white',
                            },
                        }}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    backgroundImage: `url(${averageLogo})`,
                                    backgroundSize: '800px',
                                    backgroundPosition: 'center',
                                },
                            },
                        }}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
