import { makeStyles } from '@material-ui/core/styles';
import React, {useState} from 'react';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './ElementsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {  putPassword } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Input from './ChangePasswordInput'
import NavBar from '../NavBar/NavBar';
import { useNavigate,useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
    main: {
		maxWidth: "800px",
	width: "90%",
	margin: "auto",
	padding: "40px",
	
	},
	Conteiner:{
		background: "#e5e5e5",
		height:"auto"
	}

}));
const ChangeWithToken= (props) => {
    const {resetToken} = useParams()
	const classes = useStyles();
	const dispatch = useDispatch()
	const Registrado = () => toast.success(`Tu contraseña ha sido cambiada con exito`)
	const user =useSelector((state) => state.User);
    const token =useSelector((state) => state.token);
    console.log(token)
    console.log(resetToken)
	const [passwordAntiguo, AntiguoPassword] = useState({campo: '', valido: null});
	const [password, cambiarPassword] = useState({campo: '', valido: null});
	const [password2, cambiarPassword2] = useState({campo: '', valido: null});
	const [terminos, cambiarTerminos] = useState(false);
	const [formularioValido, cambiarFormularioValido] = useState(null);
	const Navigate = useNavigate()
	const expresiones = {
		password: /^.{4,12}$/, // 4 a 12 digitos.
	}
	const PaswordAntiguo = () => {
		if(passwordAntiguo.campo.length > 0){
			if(passwordAntiguo.campo !== user.password){
				AntiguoPassword((prevState) => {
					return {...prevState, valido: 'false'}
				});
			} else {
				AntiguoPassword((prevState) => {
					return {...prevState, valido: 'true'}
				});
			}
		}
	}

	const validarPassword2 = () => {
		if(password.campo.length > 0){
			if(password.campo !== password2.campo){
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'false'}
				});
			} else {
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'true'}
				});
			}
		}
	}

	const onChangeTerminos = (e) => {
		cambiarTerminos(e.target.checked);
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if(
			password.valido === 'true' &&
			password2.valido === 'true' &&	
			terminos
		){
		    let input = {
				password: passwordAntiguo.campo,
				newPassword: password.campo
			}
			
			// dispatch(putPassword(input, user.email))
			cambiarFormularioValido(true);
			Registrado()
			Navigate('/SignIn')
			AntiguoPassword({campo: '', valido: null});
			cambiarPassword({campo: '', valido: null});
			cambiarPassword2({campo: '', valido: null});
		} else {
			cambiarFormularioValido(false);
		}
	}
  
	return ( <>
			<NavBar/>
		<main className={classes.main}>
			<h1>Cambiar Contraseña</h1>
			<Formulario action="" onSubmit={onSubmit}>
			<ContenedorBotonCentrado>
				<Input
					estado={password}
					cambiarEstado={cambiarPassword}
					tipo="password"
					label="Nueva Contraseña"
					name="password1"
					leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
					expresionRegular={expresiones.password}
				/>
				<Input
					estado={password2}
					cambiarEstado={cambiarPassword2}
					tipo="password"
					label="Repetir Nueva Contraseña"
					name="password2"
					leyendaError="Ambas contraseñas deben ser iguales."
					funcion={validarPassword2}
				/>
				
			
				</ContenedorBotonCentrado>
				<ContenedorTerminos>
					<Label>
						<input 
							type="checkbox"
							name="terminos"
							id="terminos"
							checked={terminos} 
							onChange={onChangeTerminos}
						/>
						Acepto que estos son mis datos
					</Label>
				</ContenedorTerminos>
				{formularioValido === false && <MensajeError>
					<p>
						<FontAwesomeIcon icon={faExclamationTriangle}/>
						<b>Error:</b> Por favor rellena el formulario correctamente.
					</p>
				</MensajeError>}
				<ContenedorBotonCentrado>
					<Boton type="submit">Guardar Cambios</Boton>
					{formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
				</ContenedorBotonCentrado>
			</Formulario>
		</main>
	
    
        </>
        
        
        );
	
}
 
export default ChangeWithToken;




