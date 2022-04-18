/** @format */
import React from 'react';
import NavBar from '../NavBar/NavBar'
import { makeStyles } from "@material-ui/core/styles";
import { useSelector} from 'react-redux';
import { CardActions } from '@mui/material';
// import {
//     Table,
//     Button, 
//     Container,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     FormGroup,
//     ModalFooter,
// } from "reactstrap";
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    profile: {
        marginTop: "2.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap:"1.5rem",
        margin:"auto",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap:"1.5rem",
            margin:"auto",
          },
          "& h4": {
              fontSize: "18px",
          }
    },
    data:{
        backgroundColor: "#fff",
        width: "35%",
        padding: "2rem",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            backgroundColor: "#fff",
            marginTop:"20px",
            width: "86%",
            padding: "2rem",
            alignItems: "center",
        }
    },
    Option:{
        position: "relative",
    height: "30px",
    borderBottom: "1px solid",
    marginTop: "1rem",
    width: "100%",
    textAlign: "left",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
    },
    datos:{
        color: "#FF8C00",
        fontSize: "1.2rem",
    },
    Card:{
        marginLeft: "40px",
        marginTop:"10px",
        marginBottom: "0px",
        padding: "0px",
        [theme.breakpoints.down("sm")]:{
            marginLeft: "-7px",
        }
    },
    dato3:{
        fontSize:"13px",
        color:"blue",
        cursor: "pointer"
    },
    letrero:{
        marginTop:"30px"
    }

  }));

export default function UserData() {
    const classes = useStyles();
    const user = useSelector((state) => state.User);
    // const [phone]= useState(`${user.phone}`)
    // const [modalInsertar, setStateModalInsectar] = useState(false)
    // const mostrarModalInsertar= (e)=> {

    //     setStateModalInsectar({
    //         modalInsertar:true,
    //     })  ;
    //   };
    //   const handleSubmit = (e)=>{
    //     e.preventDefault()
    //     let input = {
    //         phone: phone,
    //         password: user.password
    //     }
    //     let email = user.email
    //     const fetchData = async () => {
    //         await dispatch(ChangeProfileInfo(input, email))

    //     }
    //     fetchData()
    //     alert("Elemento actualizado correctamente")
    //     setStateModalInsectar(false);
        
    // }
  

    return (
        <>
            <NavBar />
            <div className={classes.profile}>
                
                <div className={classes.data}>
                    <h2>Mis datos</h2>
                        <div className={classes.Option}>
                            <p className={classes.datos}>Datos De cuenta</p>
                     </div>
                     <CardActions className={classes.Card}>
                       <p className={classes.dato}>Email:</p>  
                       <p className={classes.dato}>{user.email}</p>
                       
                     </CardActions>
                     <CardActions className={classes.Card}>
                       <p className={classes.dato}>Clave:</p>  
                       <p className={classes.dato}>*****</p>
                       <Link to='/user/changePassword'>
                       <p className={classes.dato3}>Modificar</p>
                       </Link>
                     </CardActions>
                     <div className={classes.Option}>
                            <p className={classes.datos}>Datos personales</p>
                     </div>
                     <CardActions className={classes.Card}>
                       <p className={classes.dato}>Nombre y apellido:</p>  
                       <p className={classes.dato}>{`${user.name} ${user.lastname}`}</p>                   
                     </CardActions>
                     <CardActions className={classes.Card}>
                       <p className={classes.dato}>Documento:</p>  
                       <p className={classes.dato}>{user.dni}</p>  
                     </CardActions>
                     <CardActions className={classes.Card}>
                       <p className={classes.dato}>Telefono:</p>  
                       <p className={classes.dato}>{user.phone}</p>
                     </CardActions>
    
                </div>
            </div>
            {/* <Modal isOpen={modalInsertar} onRequestClose={()=>setStateModalInsectar(false)} className={classes.letrero}>
                <ModalHeader>
                    <div><h3>Cambiar Numero Telefono</h3></div>
                </ModalHeader>
                <form>
                <ModalBody>
                    <FormGroup>
                        <label>
                            Cambiar Numero
                        </label>

                        <input
                            className="form-control"
                            name="name"
                            type="text"
                        />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={handleSubmit}
             
                    >
                        Editar
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => setStateModalInsectar(false)}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
                 </form>
            </Modal> */}
        </>
    );
}
