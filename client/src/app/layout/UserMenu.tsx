import Button from '@mui/material/Button';
import {Avatar, Box, Typography} from "@mui/material";
import {useAccount} from "../../lib/hooks/useAccount.ts";
import {Link} from "react-router";

export default function UserMenu() {
    const {currentUser} = useAccount();
    return (
        <>
            <Button
                sx={{fontSize:'1.1rem'}}
                component={Link}
                to={`/profile/${currentUser?.id}`}
            >
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <Avatar src={currentUser?.imageUrl} sx={{width: 30, height: 30}}/>
                    {currentUser && (
                        <Typography sx={{ fontWeight:"bold", fontSize:20, color:'white'}}>{currentUser?.displayName}</Typography>
                    )}
                </Box>
            </Button>
        </>
    );
}