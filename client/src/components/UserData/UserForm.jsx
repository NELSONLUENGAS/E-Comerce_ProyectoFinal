import { makeStyles } from '@material-ui/core/styles';
import React, {useState} from 'react';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './ElementsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { postCrearUsuario } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Input from './InputUser'
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

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
const UserForm= () => {
	const classes = useStyles();
	const dispatch = useDispatch()
	const user =useSelector((state) => state.User);
	const [nombre, cambiarNombre] = useState({campo: user.name, valido: null, editar: null, cambio: 2});
	const [lastname, cambiarlastname] = useState({campo: user.lastname, valido: null, editar: null, cambio: 2});
	const [password, cambiarPassword] = useState({campo: '', valido: null, editar: null, cambio: 2});
	const [password2, cambiarPassword2] = useState({campo: '', valido: null, editar: null, cambio: 2});
	const [correo, cambiarCorreo] = useState({campo: user.email, valido: null, editar: null, cambio: 2});
	const [telefono, cambiarTelefono] = useState({campo: user.phone, valido: null, editar: null, cambio: 2});
	const [dni, cambiardni] = useState({campo: user.dni, valido: null, editar: null, cambio: 2});
	const [fechaDeNacimiento, cambiarfechaDeNacimiento] = useState({campo: user.birthday, valido: null, editar: null, cambio: 2});
	const [direction, cambiardirection] = useState({campo: user.directions[0].direction, valido: null, editar: null, cambio: 2});
	const [postalcode, cambiarpostalcode] = useState({campo: user.directions[0].postalcode, valido: null, editar: null, cambio: 2});
	const [province, cambiarprovince] = useState({campo: user.directions[0].province, valido: null, editar: null, cambio: 2});
	const [city, cambiarcity] = useState({campo: user.directions[0].city, valido: null, editar: null, cambio: 2});
	const [nationality, cambiarnationality] = useState({campo: user.nationality, valido: null, editar: null, cambio: 2});
	const [terminos, cambiarTerminos] = useState(false);
	const [formularioValido, cambiarFormularioValido] = useState(null);
	const Navigate = useNavigate()
	const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ]{4,10}$/, // Letras y espacios, pueden llevar acentos.
		apéllido: /^[a-zA-ZÀ-ÿ]{4,10}$/,
		password: /^.{4,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/, // 7 a 14 numeros.
		dni: /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/,
		ProvinciaNacionalidadCiudad: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
		direccion: /^[a-zA-Z1-9\s]{4,40}$/,
		codigoPostal: /^[0-9]{4,5}$/,
		fechaDeNacimiento: /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/
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
			nombre.valido === 'true' &&
			lastname.valido === 'true' &&
			password.valido === 'true' &&
			password2.valido === 'true' &&
			correo.valido === 'true' &&
			telefono.valido === 'true' &&
			dni.valido === 'true' &&
			fechaDeNacimiento.valido === 'true' &&
			direction.valido === 'true' &&
			postalcode.valido === 'true' &&
			province.valido === 'true' &&
			city.valido === 'true' &&
			nationality.valido === 'true' &&
			terminos
		){
		    let input = {
				email: correo.campo,
				password: password.campo,
				name: nombre.campo,
				lastname: lastname.campo,
				birthday: fechaDeNacimiento.campo,
				dni: dni.campo,
				nationality: nationality.campo,
				// province: province.campo,
				// city: city.campo,
				// postalcode: postalcode.campo,
				direction: [{"direction":direction.campo,"postalcode":postalcode.campo,"city":city.campo,"province":province.campo}],
				phone: telefono.campo
			}
			dispatch(postCrearUsuario(input))
			cambiarFormularioValido(true);
			alert("Usuario creado correctamente")
			Navigate('/SignIn')
			cambiarNombre({campo: '', valido: null});
			cambiarPassword({campo: '', valido: null});
			cambiarPassword2({campo: '', valido: null});
			cambiarCorreo({campo: '', valido: null});
			cambiarTelefono({campo: '', valido: null});
			cambiardni({campo: '', valido: null});
			cambiarfechaDeNacimiento({campo: '', valido: null});
			cambiarnationality({campo: '', valido: null});
			cambiarprovince({campo: '', valido: null});
			cambiarcity({campo: '', valido: null});
			cambiardirection({campo: '', valido: null});
			cambiarpostalcode({campo: '', valido: null});


			// ... 
		} else {
			cambiarFormularioValido(false);
		}
	}
	

	return ( <>
		
			<NavBar/>
		<main className={classes.main}>
			<h1>Perfil De Usuario</h1>
			<Formulario action="" onSubmit={onSubmit}>
				<Input
					estado={nombre}
					cambiarEstado={cambiarNombre}
					dato= {user.name}
					tipo="text"
					label="Nombre"
					placeholder="Axel"
					name="usuario"
					leyendaError="El nombre solo puede contener letras y espacios."
					expresionRegular={expresiones.nombre}
				/>
				<Input
					estado={lastname}
					cambiarEstado={cambiarlastname}
					dato= {user.lastname}
					tipo="text"
					label="Apellido"
					name="lastname"
					leyendaError="Ingrese su apellido correctamente"
					expresionRegular={expresiones.nombre}
				/>
				<Input
					estado={correo}
					dato= {user.email}
					cambiarEstado={cambiarCorreo}
					tipo="email"
					label="Correo Electrónico"
					name="correo"
					leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
					expresionRegular={expresiones.correo}
				/>
			
				
				<Input
					estado={telefono}
					dato= {user.phone}
					cambiarEstado={cambiarTelefono}
					tipo="text"
					label="Teléfono"
					placeholder="54 9 336 4680581"
					name="telefono"
					leyendaError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
					expresionRegular={expresiones.telefono}
				/>
				<Input
					estado={dni}
					dato= {user.dni}
					cambiarEstado={cambiardni}
					tipo="text"
					label="Numero De Documento"
					placeholder="39770740"
					name="dni"
					leyendaError="Ingrese el numero de documento correctamente"
					expresionRegular={expresiones.dni}
				/>
				<Input
					estado={fechaDeNacimiento}
					dato= {user.birthday}
					cambiarEstado={cambiarfechaDeNacimiento}
					tipo="text"
					label="Fecha De Nacimiento"
					placeholder="15/08/1996"
					name="fechaDeNacimiento"
					leyendaError="Ingresa tu fecha de nacimiento correctamente"
					expresionRegular={expresiones.fechaDeNacimiento}
				/>
				<Input
					estado={nationality}
					dato= {user.nationality}
					cambiarEstado={cambiarnationality}
					tipo="text"
					label="Nacionalidad"
					placeholder="Argentina"
					name="nationality"
					leyendaError="Ingresa tu nacionalidad, correctamente para cuando haces un pedido"
					expresionRegular={expresiones.ProvinciaNacionalidadCiudad}
				/>
				<Input
					estado={province}
					dato= {user.directions[0].province}
					cambiarEstado={cambiarprovince}
					tipo="text"
					label="Provincia"
					placeholder="Buenos Aires"
					name="province"
					leyendaError="Ingresa tu provincia, correctamente para que el pedido este echo correctamente"
					expresionRegular={expresiones.ProvinciaNacionalidadCiudad}
				/>
				<Input
					estado={city}
					dato= {user.directions[0].city}
					cambiarEstado={cambiarcity}
					tipo="text"
					label="Ciudad"
					placeholder="Buenos Aires"
					name="city"
					leyendaError="Ingrese tu ciudad correctamente"
					expresionRegular={expresiones.ProvinciaNacionalidadCiudad}
				/>
				<Input
					estado={direction}
					dato= {user.directions[0].direction}
					cambiarEstado={cambiardirection}
					tipo="text"
					label="Direccion"
					placeholder="Bartolome Mitre 250"
					name="direction"
					leyendaError="Ingrese tu direccion para cualquier pedido a domicilio, o entrega"

					expresionRegular={expresiones.direccion}
				/>
				<Input
					estado={postalcode}
					dato= {user.directions[0].postalcode}
					cambiarEstado={cambiarpostalcode}
					tipo="text"
					label="Codigo Postal"
					placeholder="2900"
					name="postalcode"
					leyendaError="ingrese tu codigo postal correctamente"
					expresionRegular={expresiones.codigoPostal}
				/>
				
			</Formulario>
		</main>
		</>);
	
}
 
export default UserForm;