import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginAdmin } from "../../api/admin";

// error variable if any
let error = null;

const Login = ({setLoggedIn}) => {
  //auth data state
  const [authData, setAuthData] = React.useState({
    username: "",
    password: "",
    role: "admin",
  });

  const classes = useStyles();

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authData.username && authData.password){
      loginAdmin(authData).then((res) => {
        // if user is successfully logged in as an admin
          error = null;
          setImmediate(()=> setLoggedIn(true));
      })
      .catch ((err) => {
        // if no user was found in DB or invalid username/password combination
          if (err?.response?.status === 401) error = "Invalid credentials";
        // server side problem
          else error = "some thing wrong happened";
          setAuthData({ username: "", password: "", role: "admin" });
      })
    }
  };
//admin panel
   return (
    <Container component="main" maxWidth="xs" >
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" className='my-2'>
        Sign in to Admin panel
      </Typography>
      {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth
          id="username"
          label="Username"
          name="username"
          onChange={handleInputChange}
          value={authData.username}
          autoFocus
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
          onChange={handleInputChange}
          value={authData.password}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </div>
    <Box mt={8}>
    </Box>
  </Container>
  )
};


//style settings for the material form
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default Login;
