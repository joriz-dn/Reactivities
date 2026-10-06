import {Group} from "@mui/icons-material";
import {AppBar, Box, Container, MenuItem, MenuList, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink.tsx";

export default function NavBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container maxWidth='xl'>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box>
                            <MenuList>
                                <MenuItem component={NavLink} to="/" sx={{display: 'flex', gap: 2}}>
                                    <Group fontSize='large'/>
                                    <Typography variant="h4" sx={{fontWeight:'bold'}}>Reactivities</Typography>
                                </MenuItem>
                            </MenuList>
                        </Box>
                        <MenuList sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <MenuItemLink to="/activities">
                                Activities
                            </MenuItemLink>
                            <MenuItemLink to="/create">
                                Create Activity
                            </MenuItemLink>
                        </MenuList>
                       <MenuList sx={{display: 'flex', justifyContent: 'space-between'}}>
                           <MenuItem sx={{}}>
                               User Menu
                           </MenuItem>
                       </MenuList>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}