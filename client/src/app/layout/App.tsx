import {Box, Container, CssBaseline} from "@mui/material";
import NavBar from "./NavBar.tsx";
import {Outlet, useLocation} from "react-router";
import HomePage from "../../features/home/homePage.tsx";

function App() {
    const location = useLocation();
      return (
        <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh'}}>
            <CssBaseline></CssBaseline>
            {location.pathname === "/" ? <HomePage /> : (
                <>
                    <NavBar />
                    <Container maxWidth="xl" sx={{marginTop: 3}}>
                        <Outlet />
                    </Container>
                </>
            )}
        </Box>
      )
}

export default App
