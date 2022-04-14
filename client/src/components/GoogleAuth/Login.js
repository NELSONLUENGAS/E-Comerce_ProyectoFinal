
import React, { useState, useEffect } from 'react';
import { gapi, loadAuth2 } from 'gapi-script'

import { UserCard } from './UserCard';
import { makeStyles } from '@material-ui/core';
import GoogleLogin from 'react-google-login';


const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
       
        justifyContent: 'center',
        width: '100%',
      },
}));

const clientId = '413158522199-o91o6pf9hh3q9usmsdrhi7lq6io1cs44.apps.googleusercontent.com';



export const Login = () => {

  const [user, setUser] = useState(null);
  const classes = useStyles();

  const Navigate = useNavigate()
  const dispatch = useDispatch()
  
  //const {isAuthenticated} = useAuth0();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('');
  const [validate,setValidate] = useState(0);
  const user = useSelector((state) => state.User);


  useEffect(()=>{
    if(validate>0){// if user is logged in
      setTimeout(()=>{// wait for 2 seconds
        console.log(user)      
        if (user.name){// if user is logged in
          alert("Ha iniciado sesion correctamente")
          localStorage.setItem('userData', JSON.stringify(user)); // stringify se usa para convertir un objeto en un string          
          Navigate("/")
        }else {
         alert("El usuario y o contraseña son incorrectos");
        }
      });
    }// eslint-disable-next-line
  },[validate])

  function handleSignIn(e){
    e.preventDefault();
    setValidate(validate+1)
  }



   

    useEffect(() => {
      const setAuth2 = async () => {
        const auth2 = await loadAuth2(gapi, clientId, '');
          if (auth2.isSignedIn.get()) {
            updateUser(auth2.currentUser.get())
        } else {
            attachSignin(document.getElementById('customBtn'), auth2);
        }
      }
      setAuth2();//eslint-disable-next-line
    }, []);
  
    useEffect(() => {
      if (!user) {
        const setAuth2 = async () => {
          const auth2 = await loadAuth2(gapi, clientId, '')
          attachSignin(document.getElementById('customBtn'), auth2);
        }
        setAuth2();
      }//eslint-disable-next-line
    }, [user])
  
    const updateUser = (currentUser) => {
      const name = currentUser.getBasicProfile().getName();
      const profileImg = currentUser.getBasicProfile().getImageUrl();
      setUser({
        name: name,
        profileImg: profileImg,
      });
    };
  
    const attachSignin = (element, auth2) => {
      auth2.attachClickHandler(element, {},
        (googleUser) => {
          updateUser(googleUser);
        }, (error) => {
        console.log(JSON.stringify(error))
      });
    };
  
    const signOut = () => {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        setUser(null);
        console.log('User signed out.');
      });
    }
  
    if(user) {
      return (
        <div className="container">
          <UserCard user={user} />
          <div id="" className={classes.submit} onClick={signOut}>
            Logout
          </div>
        </div>
      );
    }
  
    return (
      <div className="container">
        <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={updateUser}
        onFailure={(err) => console.log(err)}
        className={classes.submit}
        fullWidth   
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        onClick={handleSignIn}

        />
      </div>
    );
  }

    export default Login;



