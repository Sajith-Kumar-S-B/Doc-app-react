import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home';
import Auth from './components/Auth/Auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Dashboard from './Pages/Dashboard/Dashboard';

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
    };
    setUserData(userData);
  }else{
     setUserName("")
     setIsLoggedIn(false)
    }
    })

    return ()=>{
      unsubscribe();
    }

  },[])



  
  return (
    <>

<Routes>
     <Route path={'/'} element={<Home userName={userName} isLoggedIn={isLoggedIn} userData={userData} />} />
     <Route path={'/login'} element={<Auth setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}  />} /> 
     <Route path={'/register'} element={<Auth  register setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}  />} />
     <Route path={'/dashboard'} element={<Dashboard  />} />


    </Routes>
    </>
  );
}

export default App;
