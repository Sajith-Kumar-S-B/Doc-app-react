import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home';
import Auth from './components/Auth/Auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

function App() {
  const [userName,setUserName] = useState("")

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
   if(user){ setUserName(user.displayName)
  }else{
     setUserName("")
    }
    })
  },[])
  return (
    <>

<Routes>
     <Route path={'/'} element={<Home name={userName} />} />
     <Route path={'/login'} element={<Auth/>} />
     <Route path={'/register'} element={<Auth  register />} />

    </Routes>
    </>
  );
}

export default App;
