import './Adress.css'
import { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { editPrincipalDirection,getUserByEmail } from '../../actions'
export default function Adress() {
const user = useSelector((state) => state.User);
const navigate=useNavigate()
const [adress,setAdress] = useState(1)
const [indexAdress,setIndexAdress] = useState(0)
const [validate,setValidate] = useState(1)
const dispatch= useDispatch()

function handleAdress(e,i){
    e.preventDefault()
    setAdress(e.target.value)
    setIndexAdress(i)

}
function changeDirection(e){
    e.preventDefault()
    // console.log(`este es el index de adress ${indexAdress}`)
    async function postAdress(){
        await dispatch(editPrincipalDirection({index:indexAdress},user.email))
        await dispatch(getUserByEmail(user.email))
    }
    postAdress()
}


return (<>
    <NavBar/>
    
    <div className="modal-container-adress">
        <h5>Elegí dónde recibir tus compras</h5>
        <h6>En tu direccion principal:</h6>
        <div className="div-adress">
            <label>
                <h4>Calle: {user.principalDirection[0].direction}</h4>
                <h6>CP-
                
                {user.principalDirection[0].postalcode},
                {user.principalDirection[0].city},{user.principalDirection[0].province} 
                </h6>
            </label>
        </div>
        <h6>En una de tus direcciones:</h6>
        <div className="modal-div-adress">
            {!user.name ? (<Link to="/SignIn"><h5>Por favor incia sesion</h5> </Link>) : (
                <div className="container-adress">

                    {user.directions.map((element, i) => {
                        return (<div className="div-adress" key={i}>
                            <input className="radio-adress" type="radio" value={i+1} onChange={(e)=>handleAdress(e,i)} checked={adress==i+1 ? true:false} name="adress" />
                            <div>
                                <label >
                                    <h4>Calle: {element.direction}</h4>
                                    <h6>CP: {element.postalcode}-{element.city},{element.province} </h6>
                                </label>
                            </div>
                        </div>
                        )
                    })}
                    <div className="div-adress" style={{ color: "#3483fa", padding: "1rem", cursor: 'pointer' }} onClick={(e)=> navigate('/user/addAdress')}> + Agregar nueva direccion</div>
                    <div className="div-final-buttons-add-adress">
                        <button className="save-changes-adress" onClick={changeDirection} >Guardar cambios</button>
                    </div>
                </div>)}

        </div>
    </div>
    
            </>)
                                            
                                            
}