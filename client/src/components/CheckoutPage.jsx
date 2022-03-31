///////////////////
///Producto de la canasta
//Mapeo De Los Productos Comprados
////////////////////////
import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import CheckoutCard from "./CheckoutCard.jsx";
import {useSelector} from 'react-redux'
import Total from './Total'
import NavBarGuest from "./Guest/NavBarGuest.jsx";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "2rem",
    },
}));

const CheckoutPage = () => {
    const products = useSelector((state)=>state.basket)
    const classes = useStyles();


    function FormRow() {
        return (
            <React.Fragment>
                {products?.map((product) => (
                    <Grid key={product.id} item xs={12} sm={8} md={6} lg={4}>
                        <CheckoutCard
                            name={product.name}
                            image={product.image}
                            producType={product.producType}
                            price={product.price}
                            rating={product.rating}
                            description={product.description}
                            id={product.id}
                        />
                    </Grid>
                ))}
            </React.Fragment>
        );
    }

    return (<>
        <NavBarGuest/>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align="center" gutterbotton="true" variant='h4'>
                        Compras
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={9} container spacing={2}>
                    <FormRow />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography align="center" gutterbotton="true" variant='h4'>
                        <Total/>
                    </Typography>
                </Grid>
            </Grid>
        </div>
        </>);
};

export default CheckoutPage;