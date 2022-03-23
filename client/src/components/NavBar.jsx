/////////////////////
//Nelson saca la funcionalidad del Nav Y colocala en la tuya
///solo le tienes que pasar el estado global
//////////////
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import image from '../images/logo.png'
import { ShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: "7rem",
    },
    appBar: {
        backgroundColor: "whitesmoke",
        boxShadow: "none",
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        marginLeft: theme.spacing(2),
        position: "justify",
    },
    image: {
        marginRight: "10px",
        height: "1.5rem"
    },
}));

export default function NavBar() {
    const classes = useStyles();
    const products = useSelector((state)=>state.basket)

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Link to = "/">
                       <IconButton edge="start" color="inherit" aria-label="menu">
                        <img src={image} className={classes.image} alt="not found" />
                    </IconButton> 
                    </Link>
                    <div className={classes.grow}/>
                    <Typography variant="h6" color="textPrimary" component='p'>
                        hello guest
                    </Typography>
                    <div className={classes.button}>
                        <Button variant="outlined"><strong>Login</strong></Button>
                        <Link to= "/checkout-page">
                        <IconButton aria-label="show cart items" color='inherit'>
                         <Badge badgeContent={products?.length} color="secondary">
                                <ShoppingCart fontSize="large" color="primary" />
                        </Badge>
                        </IconButton>
                        </Link>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
}
