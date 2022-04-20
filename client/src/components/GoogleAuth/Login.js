import { makeStyles } from '@material-ui/core';
import GoogleLogin from 'react-google-login';

import React, { useState, useEffect } from 'react';
import { gapi, loadAuth2 } from 'gapi-script'
import { UserCard } from './UserCard';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
       
        justifyContent: 'center',
        width: '100%',
      },
}));

const clientId = '413158522199-o91o6pf9hh3q9usmsdrhi7lq6io1cs44.apps.googleusercontent.com';





    const  Login  = () => {
    const [user, setUser] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        
        const setAuth2 = async () => {
          const auth2 = await loadAuth2(gapi, clientId);

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
          const auth2 = await loadAuth2(gapi, process.env.REACT_APP_CLIENT_ID, '')
          attachSignin(document.getElementById('customBtn'), auth2);
        }
        setAuth2();
      }//eslint-disable-next-line
    }, [user])
  
    const updateUser = (currentUser) => {
      console.log(currentUser)
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
    console.log(user)
  
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
        />
      </div>
    );
  }

    export default Login;



//<div id="customBtn" className={classes.submit}>
 //         Login
  //      </div>







// function Login() {
//     const classes = useStyles();

//     const onSuccess = (res) => {
//         console.log("LOGIN SUCCESS! Current user: ", res.profileObj);// res.profileObj se usa para obtener los datos del usuario
//     }

//     const onFailure = (res) => {
//         console.log("LOGIN FAILURE! ", res);
//     }


//     return (
//         <div id='signInButton'>
//         <GoogleLogin
//         clientId={clientId}
//         buttonText="Login"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         className={classes.submit}
//         fullWidth   
//         cookiePolicy={'single_host_origin'}
//         isSignedIn={true}
//         />
//         </div>
//     );
// }


// export default Login;