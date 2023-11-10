import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import userImg from '../../Assets/147142.png'
import { useState } from 'react';
import { getDatabase,ref ,set } from 'firebase/database'; 

import { ref as storageRef,uploadBytes,getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
export default function Sidebar({state,toggleDrawer,userName,isLoggedIn,userData,Logout}) {
   
  const [show, setShow] = React.useState(false);
  const [image,setImage] = useState(null)
  const [url,setUrl] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  React.useEffect(() => {
    const storedURL = localStorage.getItem('profileImageURL');
    if (storedURL) {
      setUrl(storedURL);
    }
  }, []);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageSubmit = () => {
    const imageRef = storageRef(storage, "images/" + userData.uid); 
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((url) => {
        localStorage.setItem('profileImageURL', url);
        setUrl(url);
        setImage(null);
      }).catch((err) => {
        console.log(err.message);
      });
    }).catch((err) => {
      console.log(err.message);
    });
  };

  const saveProfileDataToFirebase = () => {
    const database = getDatabase();
    const userRef = ref(database, `users/${userData.uid}`); // Assuming you have a 'users' node

    const userDataToSave = {
      username: formData.username,
      email: formData.email,
    };

    set(userRef, userDataToSave)
      .then(() => {
        console.log('Data saved to Firebase successfully.');
      })
      .catch((error) => {
        console.error('Error saving data to Firebase:', error);
      });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
         <h3>{isLoggedIn && userName? `Welcome - ${userName} `: 'Login please'}</h3>

{isLoggedIn &&
  <div className="wrapper">
    <div className="profile-card js-profile-card">

      <div className="profile-card__img">
        <Avatar>
          <img src={url} alt="" />
        </Avatar>

       
      </div>

      <div className="profile-card__cnt js-profile-cnt">
        <div className="profile-card__name">{userData.displayName}</div>
        <div className="profile-card__txt">{userData.email}</div>
        <div onClick={handleShow} className="profile-card-loc">
           Profile
        </div>
        <div className="profile-card-ctr">
          <button className="profile-card__button button--orange" onClick={Logout}>Log out</button>
        </div>
      </div>

    </div>
  </div>
}
     
      <Divider />

    </Box>

  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
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
                     <input  onChange={handleImage} id='profile'  type="file" />
                     <img className='image' src={url || userImg}  width={'200px'}  alt="image" /></label>
                     <Button onClick={handleImageSubmit}>Add Image</Button>
         </div>
                   <div>
                     <TextField
                  margin="normal"
                  id="username"
                  label="Username"
                  autoFocus
                  fullWidth
                  required
                  autoComplete="username"
                  variant="outlined"
                onChange={handleFormChange}
                />
  
                <TextField
                  margin="normal"
                  id="email"
                  label="Email"
                  autoFocus
                  fullWidth
                  required
                  autoComplete="email"
                  variant="outlined"
                  onChange={handleFormChange}

                />
                   </div>
       </div>
                
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  onClick={() => {
              saveProfileDataToFirebase(); // Save profile data when clicking the "Save" button
              handleClose();
            }} variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}