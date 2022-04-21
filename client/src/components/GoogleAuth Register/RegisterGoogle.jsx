import NavBar from "../NavBar/NavBar"
import {postCrearUsuario} from '../../actions/index'
import { useDispatch,useSelector} from "react-redux"
import { useState} from "react"
export default function RegisterGoogle(){
    const googleproperties = useSelector((state)=>state.propertiesGoogle)
    const dispatch= useDispatch();
    const [input,setInput]= useState(googleproperties)
    console.log(input)
    function handleOnChange(e){
        e.preventDefault();
        setInput({...input,birthday:"02/12/2012", 
        dni: "213123312", 
        nationality: "Argentina", 
        direction: [{"direction":"12 4321","postalcode":"33","city":"La plata","province":"Buenos Aires"}], 
        phone: "221923819"})
    }

    function finalizarRegistro(e){
        e.preventDefault();
        dispatch(postCrearUsuario(input))
    }
// "birthday": "02/12/2012", 
// "dni": "213123312", 
// "nationality": "Argentina", 
// "direction": [{"direction":"12 4321","postalcode":"33","city":"La plata","province":"Buenos Aires"}], 
// "phone": "221923819"
    return(<>
        <NavBar/>
        <div style={{display:"flex",flexDirection:"column"}}>
            Registro
            <button onClick={handleOnChange}>Llenar datos</button>
            <button onClick={finalizarRegistro}>Finalizar Registro</button>
            <input placeholder="BirthdahandleOnChangey"></input>
            <input placeholder="DNI"></input>
            <input placeholder="nationality"></input>
            <input placeholder="direction"></input>
            <input placeholder="phone"></input>
        </div>
        </>)
}