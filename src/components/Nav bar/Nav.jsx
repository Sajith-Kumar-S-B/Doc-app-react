import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../sidebar/Sidebar';
import LogoutIcon from '@mui/icons-material/Logout';
import ModeToggle from '../../ModeToggle';

function Nav({userName,isLoggedIn,userData,Logout,darkMode,setDarkMode}) {
    const [state, setState] = React.useState({
        left: false
       
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

      const toggleMode = () => {
        setDarkMode(!darkMode);
      };
    
      
  return (
    <Box   sx={{ flexGrow: 1 }}>
    <AppBar style={{backgroundColor:'#6e84d0'}} position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <i class="fa-brands fa-dochub"></i>ocs.doc
        </Typography>
        <ModeToggle/>
        <Button style={{display:'inline-flex',justifyContent:'center',alignItems:'center',gap:'5px',textTransform:'none',fontSize:'large'}} onClick={Logout} color="inherit"><span>Logout</span><LogoutIcon/></Button>
      </Toolbar>
    </AppBar>
    <Sidebar Logout={Logout} userName={userName} userData={userData} isLoggedIn={isLoggedIn} state={state} setState={setState} toggleDrawer={toggleDrawer} />
  </Box>
  )
}

export default Nav