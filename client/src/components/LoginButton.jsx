import React from "react";
import  { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core";
import { Button } from "reactstrap";

const useStyles = makeStyles((theme) => ({
    root: { 
        marginTop: "10px",
        
    },
}));
 export const LoginButton = () => {
    const classes = useStyles();
    const { loginWithRedirect } = useAuth0();
    
    return (
    <div className={classes.root}>
    <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>Log in</Button>
    </div>

    );
};