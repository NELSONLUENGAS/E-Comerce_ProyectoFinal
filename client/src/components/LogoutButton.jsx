import React from "react";
import  { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core";
import { Button } from "reactstrap";

const useStyles = makeStyles((theme) => ({
    root: { 
        marginTop: "10px",
        
    },
}));
export const LogoutButton = () => {
    const classes = useStyles();
    const { logout } = useAuth0();
    return (
    <div className={classes.root}>
    <Button variant="contained"  onClick={() => logout({returnTo: window.location.origin})}>Log out</Button>;
    </div>
    );
};
    