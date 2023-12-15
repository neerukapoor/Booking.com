import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

function NavBar() {
    return <>
      <Box sx={{ flexGrow: 1 }}>
          <AppBar>
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <a href="/" style={{textDecoration:"none", color:"white"}}>Booking.com</a>
            </Typography>
            <Button color="inherit" href='/adminlogin'>Login</Button>
            <Button color="inherit" href='/adminsignup'>Signup</Button>
            </Toolbar>
        </AppBar>
      </Box>
    </>
}

export default NavBar;