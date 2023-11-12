import React from 'react'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav bar/Nav';
import Dashboard from './Dashboard/Dashboard';
import { Button } from '@mui/material';

function Home({userName,isLoggedIn,setIsLoggedIn,setUserData,userData}) {
    const navigate = useNavigate()


  const Logout = async () => {
    console.log('Logging out user:', userData);
     const localStorageKey = `profileImageURL_${userData.uid}`;
  localStorage.removeItem(localStorageKey);
  console.log(localStorageKey);
  try {
    await signOut(auth);
    // Sign-out successful.
    setUserData({});
    setIsLoggedIn(false);
    navigate('/login');
  } catch (error) {
    // An error happened.
    console.error('Error during logout:', error.message);
  }

  }


  
  return (
    <div>
      <Nav  isLoggedIn={isLoggedIn} Logout={Logout} userName={userName} userData={userData} />
      {isLoggedIn ? <Dashboard   userName={userName} userData={userData} />:
      <div className='loginSec'>
      <Button className='saveButton'> <Link style={{textDecoration:'none',color:'white'}} to={'/login'}> Login</Link></Button>
        </div>}
    </div>
  )
}

export default Home