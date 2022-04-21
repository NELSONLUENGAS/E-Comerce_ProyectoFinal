import NavBar from "../NavBar/NavBar"
import { useState } from "react"
import {useDispatch} from 'react-redux'
import {forgotPassword} from '../../actions/index'
import {Input, Label, GrupoInput, LeyendaError, IconoValidacion,Boton} from './ElementsForm';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function ForgotPassword(){
    const dispatch=useDispatch()
    
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const [email,setEmail] = useState('')
    function handleForgotPassword(){
        dispatch(forgotPassword(email,token))   
        alert('En caso de que exista el usuario, se enviara un mail a tu casilla para recuperar la contraseña') 
    }
    function handleMail(e){
        e.preventDefault()
        setEmail(e.target.value);
    }
    return(
        <>
        <NavBar/>
        <h1>Olvidaste la contraseña?</h1>
        
        <div style={{display:"flex",flexDirection:"column",width:"20%",gap:"1rem",margin:"auto"}}>
            Ingrese el e-mail registrado
            <Input 
					value={email}
					onChange={(e)=>handleMail(e)}
                    placeholder="Ingrese e-mail"
				/>
               <div style={{margin:"auto",width:"100%"}}> <Boton onClick={handleForgotPassword}>Enviar</Boton>
               </div>
        </div>
        </>
    )
}

