import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";

import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getEdit, DeleteProduct, getProducts } from "../../actions";

const useStyles = makeStyles((theme) => ({
  formatoDescription: {
    position: "center",
  },
  root: {
    maxWidth: 345,
  },
  action: {
    marginTop: "0.5rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  conteiner: {
    border: "solid #cdc6c6 0.2px",
    borderRadius: "0.5rem",
    width: "285px",
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: "25px",
    textAlign: "left",
    position: "relative",
    "&:hover": {
      transition: "all 0.3s ease-out",
      boxShadow: "0px 10px 10px -2px rgb(97, 94, 94)",
      cursor: "pointer",
    },
  },

  price: {
    fontSize: "30px",
    marginTop: "1rem",
    marginLeft: "0.5rem",
  },
}));

export default function EditarProduct({
  id,
  stock,
  name,
  image,
  price,
  description,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  var item = {
    id: id,
    name: name,
    image: image,
    stock: stock,
    description: description,
    price: price,
  };
  const navigate = useNavigate();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const HandleAdd = (e) => {
    dispatch(getEdit(item));
    navigate("/admin/edit/form");
  };
  const handleDelete = (e, id, name) => {
    e.preventDefault();
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar el Producto, " + name
    );
    if (opcion === true) {
      const fetchData = async () => {
        await dispatch(DeleteProduct(id));
        await dispatch(getProducts());
      };
      fetchData();
    }
  };

  return (
    <>
      <Card className={classes.conteiner}>
        <img className="card-image" src={image} alt="" />

        <p className={classes.price}>
          $ {Intl.NumberFormat("es-ES").format(price)}
        </p>

        <div style={{ marginLeft: "1rem" }}>
          <p className="cuotas-product">{`STOCK: ${stock}`}</p>
        </div>
        <div className="div-name-product">
          <p className="name-product">{name}</p>
        </div>
        <CardActions>
          <Button color="primary" onClick={HandleAdd}>
            Editar
          </Button>

          <Button color="danger" onClick={(e) => handleDelete(e, id, name)}>
            Eliminar
          </Button>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
