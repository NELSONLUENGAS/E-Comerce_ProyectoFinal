import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EditarProduct from "./EditarProduct";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getSearch } from "../../actions";
import SearchIcon from "../../svg/search.svg";
import NavBar from '../NavBar/NavBar'
//import Paginado from '../Paginado/Paginado';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    width: "100%",
    maxWidth: "100%",
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "30px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginRight: "100rem",
    width: "90%",
    height: "100%",
    borderRadius: "0.5rem",
    overflow: "hidden",
    backgroundColor: "#fff",
    "&:hover": {
      transition: "all 0.3s ease-out",
      boxShadow: "0px 10px 10px -2px rgb(97, 94, 94)",
      cursor: "pointer",
    },
  },
}));

export default function Products() {
  const [busqueda, setBusqueda] = useState("");
  const classes = useStyles();
  const productos = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function handleSearch(e) {
    e.preventDefault();
  }

  function handleInputSearch(e) {
    e.preventDefault();
    setBusqueda(e.target.value);
    dispatch(getSearch(e.target.value));
    console.log(Products);
  }

  return (<>
    <NavBar/>
    <div className={classes.root}>
        <h1>Editar y Eliminar Productos</h1>
      <div className={classes.paper}>

        <form
          onSubmit={(e) => handleSearch(e)}
          style={{
            display: "flex",
            backgroundColor: "#fff",
            width: "40%",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            height: "50px",
            borderRadius: "0.5rem",
            margin: "auto",
          }}
        >
          <input
            style={{ height: "100%", width: "100%", marginTop: "0" }}
            value={busqueda}
            onChange={(e) => handleInputSearch(e)}
            type="search"
            placeholder="Buscar..."
          />
          <button
            type="submit"
            style={{
              height: "100%",
              backgroundColor: "#fff",
              border: "transparent",
              borderLeft: "1px solid grey",
            }}
          >
            {" "}
            <img
              style={{
                height: "15px",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
              src={SearchIcon}
              alt="Buscar"
            />
          </button>
        </form>
      </div>

      <br />

      <Grid container spacing={2}>
        {productos.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
            <EditarProduct
              name={product.name}
              image={product.image}
              price={product.price}
              stock={product.stock}
              description={product.description}
              id={product.id}
            />
          </Grid>
        ))}
      </Grid>
    </div>
    </>
  );
}
