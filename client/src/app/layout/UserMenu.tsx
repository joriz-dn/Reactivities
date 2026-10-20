import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useId, useState} from "react";
import {Avatar, Box, Divider, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useAccount} from "../../lib/hooks/useAccount.ts";
import {Link} from "react-router";
import {Add, Logout, Person} from "@mui/icons-material";

export default function UserMenu() {
    const id = useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {currentUser, logoutUser} = useAccount();
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleClick}
                sx={{fontSize:'1.1rem'}}
            >
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <Avatar src={currentUser?.imageUrl} sx={{width: 30, height: 30}}/>
                    {currentUser && (
                        <Typography sx={{ fontWeight:"bold", fontSize:20, color:'white'}}>{currentUser?.displayName}</Typography>
                    )}
                </Box>
            </Button>
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': buttonId,
                    },
                }}
            >
                <MenuItem component={Link} to={`/profile/${currentUser?.id}`} onClick={handleClose}>
                    <ListItemIcon>
                        <Person></Person>
                    </ListItemIcon>
                    <ListItemText>My Profile</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to='/create' onClick={handleClose}>
                    <ListItemIcon>
                        <Add></Add>
                    </ListItemIcon>
                    <ListItemText>Create Activity</ListItemText>
                </MenuItem>
                <Divider></Divider>
                <MenuItem onClick={() => {
                    logoutUser.mutate();
                    handleClose();
                }}>
                    <ListItemIcon>
                        <Logout></Logout>
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
