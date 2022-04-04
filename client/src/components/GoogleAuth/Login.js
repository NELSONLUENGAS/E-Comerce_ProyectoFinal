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

function Login() {
    const classes = useStyles();

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);// res.profileObj se usa para obtener los datos del usuario
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILURE! ", res);
    }


    return (
        <div id='signInButton'>
        <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        className={classes.submit}
        fullWidth   
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
        </div>
    );
}


export default Login;