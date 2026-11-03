import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import {PowerSettingsNewRounded} from "@mui/icons-material";
import {Divider} from "@mui/material";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

type Props = {
    component: any,
    handleLogout: () => void,
}

export default function Drawer({ component, handleLogout } : Props) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ 
                width: 250,
                height: '100%',
                display: 'flex',
                justifyContent: 'end',
                flexDirection: 'column',
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#c62828',
            }}>
                <Divider />
                <Button sx={{height: 60, width: '100%'}} onClick={() => handleLogout()}>
                    <PowerSettingsNewRounded sx={{height: '1005', width: '100%', color: 'white'}}/>
                </Button>
            </Box>
        </Box>
    );

    return (
        <React.Fragment key={'right'}>
            <Box onClick={toggleDrawer('right', true)}>
                {component}
            </Box>
            <SwipeableDrawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >
                {list('right')}
            </SwipeableDrawer>
        </React.Fragment>
    );
}