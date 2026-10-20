import {Box, Button, Paper, Typography} from "@mui/material";
import {Link} from "react-router";

export default function HomePage() {
    return (
        <Paper sx={{
            color:"white",
            display:"flex",
            flexDirection:"column",
            gap: 6,
            alignItems:"center",
            alignContent:"center",
            justifyContent:"center",
            height:"100vh",
            backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
        }}>
            <Box sx={{
                display:"flex", 
                alignItems:"center", 
                alignContent:"center",
                color: "white",
                gap: 3,
                flexDirection: "column"
            }}>
                <img
                    src='/images/logo.png'
                    alt='Camp Half Blood'
                    height={300}
                    width={300}
                />
                <Typography variant="h2" sx={{
                    fontWeight: "bold",
                }}> Camp Half-Blood </Typography>
            </Box>
            <Button component={Link} to='/login' size="large" sx={{
                height: 80,
                borderRadius: 1,
                fontSize: '1.5rem',
                color: 'white',
                textDecoration: 'none',
                textTransform: 'none',
            }}>Take me there.</Button>
        </Paper>
    );
}