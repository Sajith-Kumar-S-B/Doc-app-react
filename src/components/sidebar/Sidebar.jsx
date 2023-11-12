import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

import Avatar from "@mui/material/Avatar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import userImg from '../../Assets/147142.png'
import { useState } from 'react';
import { getDatabase,ref ,set } from 'firebase/database'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ref as storageRef,uploadBytes,getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { useDarkMode } from '../../ModeContext';
export default function Sidebar({state,toggleDrawer,userName,isLoggedIn,userData,Logout}) {


  const { darkMode } = useDarkMode();

  const [show, setShow] = React.useState(false);
  const [image,setImage] = useState(null)
  const [url,setUrl] = useState(null)
  const [forceUpdate, setForceUpdate] = useState(false);
  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  // });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  React.useEffect(() => {

    const localStorageKey = `profileImageURL_${userData.uid}`;
    console.log('Fetching image for user UID:', userData.uid);
    const storedURL = localStorage.getItem(localStorageKey);
    if (storedURL) {
      setUrl(storedURL);
    }

    const imageRef = storageRef(storage, `images/${userData.uid}`);
    
    console.log('User UID:', userData.uid);
    getDownloadURL(imageRef)
      .then((url) => {
        localStorage.setItem(localStorageKey, url);
        setUrl(url);
        setForceUpdate((prev) => !prev);
      })
      .catch((error) => {
        console.error('Error fetching profile image URL:', error);
      });
  }, [userData.uid]);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageSubmit = () => {

    console.log('Uploading image for user UID:', userData.uid);
    console.log('Current image state:', image);
    const imageRef = storageRef(storage, `images/${userData.uid}`); 
   
    uploadBytes(imageRef, image).then(() => {
      console.log('Image uploaded successfully.');
      getDownloadURL(imageRef).then((url) => {
        console.log('Image URL fetched successfully:', url);
        const localStorageKey = `profileImageURL_${userData.uid}`;
        localStorage.removeItem(localStorageKey);

          localStorage.setItem(localStorageKey, url);
        setUrl(url);
        setImage(null);
      }).catch((err) => {
        console.log('Error fetching image URL:', err.message);
      });
    }).catch((err) => {
      console.log('Error uploading image:', err.message);
    });
  };

  // const saveProfileDataToFirebase = () => {
  //   const database = getDatabase();
  //   const userRef = ref(database, `users/${userData.uid}`); // Assuming you have a 'users' node

  //   const userDataToSave = {
  //     username: formData.username,
  //     email: formData.email,
  //   };

  //   set(userRef, userDataToSave)
  //     .then(() => {
  //       console.log('Data saved to Firebase successfully.');
  //     })
  //     .catch((error) => {
  //       console.error('Error saving data to Firebase:', error);
  //     });
  // };

  // const handleFormChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      className={`sidebar-con ${darkMode ? 'dark-mode' : 'light-mode'}`}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
     
    >
         <div className='sidebar'>
          
  
  {isLoggedIn ?
    <div className="wrapper">
      
      <div className="profile-card js-profile-card">
      <h4 className='welcome'>{isLoggedIn && userName? `Welcome - ${userName} `: 'Please Login'}</h4>
        <div className="profile-card__img">
          <Avatar style={{width:'100%',height:'100%'}}>
            <img style={{width:'100%',height:'100%'}}  key={forceUpdate} src={`${url}?${Math.random()}`} alt="" />
          </Avatar>
  
         
        </div>
  
        <div className="profile-card__cnt js-profile-cnt">
          <div className="profile-card__name">{userData.displayName}</div>
          <div className="profile-card__txt">{userData.email}</div>
          
        
        </div>
        <div onClick={handleShow} className="profile-card-loc">
              <AccountCircleIcon/> Profile
          </div>
  
      </div>
      <Divider />
     
      
      <div className="profile-card-ctr">
            <button className="profile-card__button button--orange" onClick={Logout}>Log out<LogoutIcon/> </button>
          </div>
    </div> : <div className='wrapper'><h4>Please Login</h4></div>
  }
         </div>
     
    

    </Box>

  );

  return (
    <div >
      {['left'].map((anchor) => (
        <React.Fragment   
        key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}

     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='modal'
      >
        <Modal.Header >
          <Modal.Title> <h3>{isLoggedIn && userName? `${userName}'s profile `: 'Login please'}</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body >
       <div className='modal_content'>
         <div className='modal_image'>
            <label  className='file' htmlFor='profile'> 
                     <input  onChange={handleImage} id='profile' style={{display:'none'}}  type="file" />
                 
                  <Avatar style={{width:'200px',height:"200px"}}>   <img className='image' key={forceUpdate} src={`${url}?${Math.random()}`}  width={'100%'}   /></Avatar></label>


                  <div className="profile-card__name">{userData.displayName}</div>
          <div className="profile-card__txt">{userData.email}</div>
                     <Button style={{backgroundColor:'#6e84d0'}}  onClick={handleImageSubmit}>Add Image</Button>

         </div>

       
                   
       </div>
                
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{backgroundColor:'#6e84d0'}}  onClick={() => {
              // saveProfileDataToFirebase(); // Save profile data when clicking the "Save" button
              handleClose();
            }} variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}