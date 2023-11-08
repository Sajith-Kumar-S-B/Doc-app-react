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

function Auth({ register, history, UI }) {

  const navigate = useNavigate()
  const isRegisterForm = register ? true : false;

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})
  const handleSubmit = (e) => {
    e.preventDefault();

    if ((isRegisterForm && !values.name) || !values.email || !values.password) {
      setError("Fill all fields");
    } else if ((!isRegisterForm && !values.email) || !values.password) {
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
        navigate('/')
    })
    .catch((err) => {
      setButtonDisable(false);

      setError(err.message.substring(9));
    });}

     {!isRegisterForm && signInWithEmailAndPassword(auth, values.email, values.password).then(async(res) => {
      setButtonDisable(false);
     
        navigate('/')
    }).catch((err) => {
      setButtonDisable(false);

      setError(err.message.substring(9));
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
      }).catch((error) => {

        console.log({ error });

      });
  }


  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
          <Avatar className="avatar">
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

            {isRegisterForm && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
            )}

            <b className="error">{error}</b>
            {isRegisterForm ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
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
                color="primary"
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
                  <Link href="/login">{"Already have  an account? Login"}</Link>
                ) : (
                  <Link href="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                )}
              </Grid>
            </Grid>
            {/* {errors.general && <p className="customError">{errors.general}</p>} */}
          </form>
        </div>
      </Container>
    </>
  );
}

export default Auth;
