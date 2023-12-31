import React, { useState } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid, Link, TextField, CircularProgress, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import styles from "./Auth.module.css";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import ModeToggle from "../../ModeToggle";
import { useDarkMode } from "../../ModeContext";

function Auth({ register,setIsLoggedIn,setUserData,}) {
  // const { darkMode } = useDarkMode();

  const navigate = useNavigate()
  const isRegisterForm = register ? true : false;

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegisterForm && !values.name || !values.email || !values.password) {
      setError("Fill all fields");
    } else if (!isRegisterForm && !values.email || !values.password) {
      setError("Fill all fields");
    }
    setError("");
    setButtonDisable(true);
  {isRegisterForm &&  createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(async(res) => {
      setButtonDisable(false);
      const user = res.user;
      await updateProfile(user, {
        displayName: values.username,
      });
      
      setIsLoggedIn(true)

        navigate('/')
    })
    .catch((err) => {
      setButtonDisable(false);

      setError(err.message?.substring(9));
    });}

     {!isRegisterForm && signInWithEmailAndPassword(auth, values.email, values.password).then(async(res) => {
      setButtonDisable(false);

        navigate('/')
    }).catch((err) => {
      setButtonDisable(false);

      setError(err.message?.substring(9));
    });
    
    
    
    }

  };


  const SignUpUsingGoogle = () => {

    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {

        const { displayName, email } = result.user;
        setUserData({ displayName, email })
         
        setIsLoggedIn(true)
        navigate('/')
      }).catch((error) => {

        console.error("Firebase authentication error:", error);

      });
  }


  


  return (
    <div className={styles.auth}>
            <div className={styles.header}><h3><i class="fa-brands fa-dochub"></i>ocs.doc</h3>
            {/* <ModeToggle/> */}
            </div>
          
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
          <Avatar style={{backgroundColor:'#be4d25'}} className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {isRegisterForm ? <h5>Register</h5> : <h5>Login</h5>}
          <form className={styles.form} noValidate>
            {isRegisterForm && (
              <TextField
                margin="normal"
                id="username"
                label="Username"
                // error={errors.username ? true : false}
                autoFocus
                // helperText={errors.username}
                fullWidth
                required
               
               
                className="textField"
                autoComplete="username"
                variant="outlined"
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              className="textField"
             
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              // helperText={errors.email}
              // error={errors.email ? true : false}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              className="textField"

              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // helperText={errors.password}
              // error={errors.password ? true : false}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            

            <b className="error">{error}</b>
            {isRegisterForm ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
              
                className={styles.submit}
                onClick={handleSubmit}
                disabled={buttonDisable}
                // disabled={loading || !values.email || !values.password || !values.username}
              >
                Register
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
               
                className={styles.submit}
                onClick={handleSubmit}
                disabled={buttonDisable}

                // disabled={loading || !values.email || !values.password }
              >
                Sign In
              </Button>
            )}
   <hr />
   <br />
      <button   onClick={SignUpUsingGoogle}  type="button" className={styles.loginGoogle} >
          Sign in with Google
        </button>

            <Grid container>
              <Grid item>
                {isRegisterForm ? (
                  <Link style={{textDecoration:'none'}} href="/login">{"Already have  an account? Login"}</Link>
                ) : (
                  <Link style={{textDecoration:'none'}} href="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                )}
              </Grid>
            </Grid>
            {/* {errors.general && <p className="customError">{errors.general}</p>} */}
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Auth;
