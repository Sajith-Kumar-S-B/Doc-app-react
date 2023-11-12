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
import LoginIcon from '@mui/icons-material/Login';

import ModeToggle from '../../ModeToggle';
import { Link } from 'react-router-dom';

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
       {isLoggedIn && <ModeToggle/>}
      { isLoggedIn ? <Button style={{display:'inline-flex',justifyContent:'center',alignItems:'center',gap:'5px',textTransform:'none',fontSize:'large'}} onClick={Logout} color="inherit"><span>Logout</span><LogoutIcon/></Button>: <Link to={'/login'} style={{display:'inline-flex',justifyContent:'center',alignItems:'center',gap:'5px',textTransform:'none',fontSize:'large',textDecoration:'none',color:'white'}} color="inherit"><span>Login</span><LoginIcon/></Link> }
      </Toolbar>
    </AppBar>
    <Sidebar Logout={Logout} userName={userName} userData={userData} isLoggedIn={isLoggedIn} state={state} setState={setState} toggleDrawer={toggleDrawer} />
  </Box>
  )
}

export default Nav