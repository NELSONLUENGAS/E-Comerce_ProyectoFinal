import React from 'react';
import Avatar from '@material-ui/core/Avatar';
//import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
//import  { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {getUserSigningIn} from '../../actions/index'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import NavBar from '../NavBar/NavBar'
//import GoogleLogin from 'react-google-login';
import Login from '../GoogleAuth Login/Login';
//import LogoutButton from "./GoogleAuth/LogOut";
import toast, { Toaster } from 'react-hot-toast';
import {
  Table,
  Button, 
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import Logo from '../../svg/latcom1.png'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  imagee:{
    with: "200px",
    height: "70px"
  }
}));

export default function SignIn() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const classes = useStyles();
  //const {isAuthenticated} = useAuth0();
  const [email,setEmail] = useState('')
  const [modalInsertar, setStateModalInsectar] = useState(false)
  const [password,setPassword] = useState('');
  const [validate,setValidate] = useState(0);
  const user = useSelector((state) => state.User);
  const guestCart = useSelector((state) => state.basket);
  const Error = () => toast.error("El email o la contraseña son incorrectos")
 const Bienvenido = ()=>setStateModalInsectar(true)
 const Salir = ()=>setStateModalInsectar(false)



  useEffect(()=>{
    if(validate>0){
      setTimeout(()=>{
        if (user.name){
          localStorage.setItem('userData', JSON.stringify(user)); 
          Bienvenido()         
        }else {
         Error()
        }
      });
    }
  },[validate])

  function handleEmail(e){
    e.preventDefault()
    setEmail(e.target.value)
  }
  
  function handlePassword(e){
    e.preventDefault()
    setPassword(e.target.value)
  }
  const mostrarModalInsertar= (user)=> {

    
}
  function handleSignIn(e){
    e.preventDefault();
    const fetchData = async () => {
      await   dispatch(getUserSigningIn({
        email:email,
        password:password
      },guestCart))
      await setValidate(validate+1)
    }
  fetchData()
    
    
}
const IniciarCompra =(e)=>{
  e.preventDefault()
  Navigate('/')
} 
  return (<>
      <NavBar/>
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          
          <h5>Iniciar Sesion</h5>
          <Toaster 
            position="top-center"
            reverseOrder={false}

            />
          <form className={classes.form} noValidate>
          
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
              onChange={handleEmail}
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
              onChange={handlePassword}
              
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button


              color="primary"
              className={classes.submit}
              onClick={(e) => handleSignIn(e)}
    
            >
              Sign In
            </Button>

            <Login/>
            
             <Grid container>
              <Grid item xs>
                <Link to="/forgotPassword" variant="body2">
                 Olvidaste la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/SignUp" >
                  No tienes una cuenta? Registrate!             </Link>
              </Grid>
            </Grid>
          </form>
          <Modal isOpen={modalInsertar} onRequestClose={()=>setStateModalInsectar(false)}>
                <ModalHeader>
                    <div><img className={classes.imagee} src={Logo}/></div>
                </ModalHeader>
                <form>
                <ModalBody>
                    <FormGroup>
                        <p>
                            {`Bienvenido a Latcom, ${user.name}`}
                        </p>
                        <p>
                            {`Bienvenido a lo que queres`}
                        </p>
                        <p>
                            {`Donde todos los dias eres bienvenido`}
                        </p>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
            
                    <Button
                        color="primary"
                        type="submit"
                        onClick={IniciarCompra}
                    >
                        Acceder
                    </Button>
          
                </ModalFooter>
                 </form>
            </Modal>
        </div>
      </Grid>
    </Grid>
    </>
  );
}