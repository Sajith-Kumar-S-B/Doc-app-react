import React from 'react'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav bar/Nav';
import Dashboard from './Dashboard/Dashboard';

function Home({userName,isLoggedIn,setIsLoggedIn,setUserData,userData}) {
    const navigate = useNavigate()


  const Logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUserData({})
    
      setIsLoggedIn(false)
    }).catch((error) => {
      // An error happened.
      console.log({ error });
    });

    navigate('/login')

  }


  
  return (
    <div>
      <Nav  isLoggedIn={isLoggedIn} Logout={Logout} userName={userName} userData={userData} />
      <Dashboard/>
    </div>
  )
}

export default Home