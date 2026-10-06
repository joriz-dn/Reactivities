import {Group} from "@mui/icons-material";
import {AppBar, Box, Button, Container, MenuItem, MenuList, Toolbar, Typography} from "@mui/material";

type Props = {
    openForm: () => void;
}

export default function NavBar({openForm} : Props) {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container maxWidth='xl'>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box>
                            <MenuList>
                                <MenuItem sx={{display: 'flex', gap: 2}}>
                                    <Group fontSize='large'/>
                                    <Typography variant="h4" sx={{fontWeight:'bold'}}>Reactivities</Typography>
                                </MenuItem>
                            </MenuList>
                        </Box>
                        <MenuList sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <MenuItem sx={{
                                fontSize: '1.2rem',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }}>
                                Activities
                            </MenuItem>
                            <MenuItem sx={{
                                fontSize: '1.2rem',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }}>
                                About
                            </MenuItem>
                            <MenuItem sx={{
                                fontSize: '1.2rem',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }}>
                                Contact
                            </MenuItem>
                        </MenuList>
                        <Button size='large' variant="contained" color="warning" onClick={openForm}> Create Activity </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}