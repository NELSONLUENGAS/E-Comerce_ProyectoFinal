import { Navbar } from "reactstrap"
import NavBarGuest from "./Guest/NavBarGuest"
import { useNavigate } from "react-router-dom"

export default function ForgotPassword(){
    const navigate = useNavigate()

    function handleRestorePassword(){
        alert('Hemos enviado un link a tu e-mail para que recuperes la contraseña')
        navigate('/SignIn')
    }
    
    return(
        <div>
            <NavBarGuest/>
            <div>
                Has olvidado la contraseña?
                <div>
                <p>Ingresa tu e-mail</p>
                <input></input>
                </div>
                <button onClick={handleRestorePassword}>Recuperar contraseña</button>
            </div>
            
        </div>
    )

}