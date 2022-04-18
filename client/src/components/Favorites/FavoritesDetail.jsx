/** @format */

import React from "react";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {deleteFavorite,getFavorites} from '../../actions/index';
import {useSelector, useDispatch} from 'react-redux';
import accounting from "accounting";
import "./FavoritesDetail.css";
import toast, { Toaster } from 'react-hot-toast';
import { makeStyles } from "@material-ui/core/styles";
import Logo from '../../svg/latcom1.png'
import {
    Table,
    Button, 
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
  } from "reactstrap";
const useStyles = makeStyles((theme) => ({
    image: {
      with: "200px",
      height: "70px"
    },
  }));
  
export default function ComprasDetail({
    price,id,image,name
}) {  
    const classes = useStyles();
    const dispatch=useDispatch()
    const user = useSelector((state) => state.User);
    const [modalInsertar, setStateModalInsectar] = useState(false)
const DeleteFavorite = () => toast.success(`has sacado ${name} de tus favoritos`, {duration: 4000,})

    const mostrarModalInsertar= (id)=> {

        setStateModalInsectar({
          modalInsertar:true,
      })  ;
      }
    function handleDeleteFavorite(e,id){
        e.preventDefault()
        
        const fetchData = async () => {
        
            await dispatch(deleteFavorite(user.email,id))
            await dispatch(getFavorites(user.email));
            
        }
        DeleteFavorite()
        fetchData()
        
    }

    return (
        
            <div key={id} className="product-favorites-detail">
                <Toaster 
            position="top-center"
            reverseOrder={false}

            />
                <div className="div-img-product-favorite-detail"><img src={image} alt="hola"></img></div>
                <div className="div-product-details-favorite-detail">
                    <h4>{name}</h4>
                    <h3>{accounting.formatMoney(price,"$")}</h3>
                    <h5 style={{color:"green"}}>Envio gratis</h5>
                    <button className="button-delete-favorite-detail" onClick={() => mostrarModalInsertar(id)}>Eliminar</button>
                </div>
                <Modal isOpen={modalInsertar} onRequestClose={()=>setStateModalInsectar(false)}>
                <ModalHeader>
                    <div><img className={classes.image} src={Logo}/></div>
                </ModalHeader>
                <form>
                <ModalBody>
                    <FormGroup>
                        <p>
                          {`Estas seguro que quieres eliminar de tus favoritos
                          a la siguiente venta: ${name}`}
                        </p>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        type="submit"
                        onClick={(e) => handleDeleteFavorite(e, id)}
                    >
                        Eliminar
                    </Button>
                    <Button
                        
                        color="primary"
                        onClick={() => setStateModalInsectar(false)}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
                 </form>
            </Modal>
            </div> 
    );
}