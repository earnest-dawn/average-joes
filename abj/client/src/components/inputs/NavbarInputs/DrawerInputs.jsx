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
import ContactsIcon from '@mui/icons-material/Contacts';
import averageLogo from '../../../assets/images/averageLogo.png';

export default function TemporaryDrawer({ state, setState, toggleDrawer }) {
    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Home', 'Contact', 'Order Online'].map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                    >
                        <ListItemButton href={`/${text.toLowerCase()}`}>
                            <ListItemIcon sx={{ color: '#d60000' }}>
                                {(() => {
                                    switch (text) {
                                        case 'Home':
                                            return <HomeIcon />;
                                        case 'Contact':
                                            return <ContactsIcon />;
                                        case 'Order Online':
                                            return <FastfoodIcon />;
                                        default:
                                            return <InboxIcon />;
                                    }
                                })()}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
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
                        onClose={toggleDrawer(anchor, false)}
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
