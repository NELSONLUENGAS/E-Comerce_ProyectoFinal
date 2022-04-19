//////////////////////////
/////Total Del producto
///////////////////////
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core';
import './Total.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { SumItem } from '../../actions';
import Logo from '../../svg/latcom1.png'
import {
    Table,
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
  } from "reactstrap";


const useStyles = makeStyles((theme) => ({
    root:  {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh"
    },
    button: {
        marginTop: "2rem"
    },
    image: {
        with: "200px",
        height: "70px"
      },
}))


const Total = ({onPay,buttonContinue,emptyCart}) => {
    const user = useSelector((state)=>state.User)
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [modalInsertar, setStateModalInsectar] = useState(false)
    const TotalPrice = useSelector((state)=>state.SumPriceBack)
    const TotalPriceLocal= useSelector((state)=>state.SumPrice)
    const TotalItem = useSelector((state)=>state.SumItemsBack)
    useEffect(()=>{
        dispatch(SumItem())
    },[dispatch])
    function handleButtonDeleteCart(e){
         setStateModalInsectar({
            modalInsertar:true,
        })
    }

  return (
      <div className='containter-total'> 
        <div className="container-pay-total">
            {/* <h3>Total items: {TotalItem}</h3> */}
            <h3>Total a pagar:</h3>
            {user.email ? (<h3>{`$${Intl.NumberFormat("es-ES").format(TotalPrice)}`}</h3>):(<h3>{`$${Intl.NumberFormat("es-ES").format(TotalPriceLocal)}`}</h3>)}
        </div>
        {buttonContinue ? (<div className="div-buttons-total">
        <button onClick={(e) => handleButtonDeleteCart(e)} className="empty-cart-button-total">Vaciar carrito</button> 
            {/* <button onClick={(e) => mostrarModalInsertar(e)} className="empty-cart-button-total">Vaciar carrito</button> */}
            <button onClick={(e) => onPay(e)} className="continue-button-total" >Continuar compra</button>
            </div>
        ):null}
        <Modal isOpen={modalInsertar} onRequestClose={()=>setStateModalInsectar(false)}>
                <ModalHeader>
                    <div><img className={classes.image} src={Logo}/></div>
                </ModalHeader>
                <form>
                <ModalBody>
                    <FormGroup>
                        <p>
                          {`Estas seguro que quieres Vaciar el carrito por completo`}
                        </p>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        type="submit"
                        onClick={(e) => emptyCart(e)}
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
  )

};

export default Total;