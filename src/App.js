import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home';
import Auth from './components/Auth/Auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Dashboard from './Pages/Dashboard/Dashboard';
import Document from './components/Document/Document';
import Sidebar from './components/sidebar/Sidebar';
import Nav from './components/Nav bar/Nav';

function App() {

  

 
  const [userName,setUserName] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(()=>{
   const unsubscribe = auth.onAuthStateChanged((user)=>{
   if(user){ 
   
    setUserName(user.displayName)
    setIsLoggedIn(true)

    const userData = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid, 
    };
    setUserData(userData);
  }else{
     setUserName("")
     setIsLoggedIn(false)
     setUserData({});
    }
    })

    return ()=>{
      unsubscribe();
    }

  },[])

  


  
  return (
    <>


  <Routes>
       <Route path={'/'} element={<Home userName={userName} isLoggedIn={isLoggedIn} userData={userData} setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
       <Route path={'/login'} element={<Auth setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}  />} /> 
       <Route path={'/register'} element={<Auth  register setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}  />} />
       <Route path={'/dashboard'} element={
        isLoggedIn ? (<Dashboard   userName={userName} userData={userData} />) : (<Navigate to="/login" replace /> )} />
         <Route path={'/document'} element={<Document/>} />
         <Route path={'/sidebar'} element={<Sidebar/>} />
         <Route path={'/nav'}  element={<Nav/>} />
  
  
  
      </Routes>

    </>
  );
}

export default App;
