import { GoogleLogout } from 'react-google-login';


const clientId = '413158522199-o91o6pf9hh3q9usmsdrhi7lq6io1cs44.apps.googleusercontent.com';

function LogOut() {

    const onSuccess = (res) => {
        console.log("Log Out Successful!");
    }

    return (
        <div id='signInButton'>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onSuccess={onSuccess}
                />
        </div>
    );
}


export default LogOut;

    