import React from 'react';
import {Input, Label, GrupoInput, LeyendaError, IconoValidacion, LeyendaDato} from './ElementsForm';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap'; 

const InputUser = ({estado, cambiarEstado, tipo, label, placeholder, name, leyendaError, expresionRegular, funcion, dato}) => {
	const onChange = (e) => {
		cambiarEstado({...estado, campo: e.target.value});
	}

	const validacion = () => {
		if(expresionRegular){
			if(expresionRegular.test(estado.campo)){
				cambiarEstado({...estado, valido: 'true'});
			} else {
				cambiarEstado({...estado, valido: 'false'});
			}
		}

		if(funcion){
			funcion();
		}
	}
	const handleEditar = () => {

		if(estado.cambio%2===0){
			cambiarEstado({...estado, editar: "true", cambio: 3})

	
		}else if (estado.valido==='true' || estado.campo===dato){
			cambiarEstado({...estado, editar: "false", cambio: 2})
		}
	}

	return (
		<div>
			<Label htmlFor={name} valido={estado.valido} editar={estado.editar}>{label}</Label>
			<GrupoInput>
				<LeyendaDato editar={estado.editar}>{dato}</LeyendaDato>
				<Input 
					type={tipo}
					placeholder={placeholder} 
					id={name}
					value={estado.campo}
					onChange={onChange}
					onKeyUp={validacion}
					onBlur={validacion}
					valido={estado.valido}
					editar={estado.editar}
				/>
				<IconoValidacion 
					icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle}
					valido={estado.valido} editar={estado.editar}
				/>
				
			</GrupoInput>
			<LeyendaError valido={estado.valido} editar={estado.editar}>{leyendaError}</LeyendaError>
			<Button estado={estado.editar} onClick={handleEditar} color="primary" >Editar</Button>
		</div>
	);
}
 
export default InputUser;