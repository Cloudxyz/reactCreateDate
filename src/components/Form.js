import React, { Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Form = ({createDate}) => {

    //Crear State de Citas
    const [cita, updateDate] = useState({
        mascota: '',
        propietario: '',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const [error, updateError] = useState(false);

    // Función que se ejecuta cada que el usuario escribe en el input
    const updateState = e =>{
        updateDate({
            ...cita,
            [e.target.name]: e.target.value
        })
        console.log('Escribiendo puto');
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando el usuario presiona el boton
    const submitDate = e => {
        e.preventDefault();
        updateError(false);
        // Validar la información Obtenida
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            updateError(true);
            return;
        }

        // Asignar un ID
        cita.id = uuidv4();

        // Crear la Cita
        createDate(cita);

        // Reinicar el form
        updateDate({
            mascota: '',
            propietario: '',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    return(
        <Fragment>
            <h2>Crear Cita</h2>
            { error? <p className="alerta-error">Todos los campos son obligatorios</p>:null}
            <form onSubmit={submitDate}>
                <label>Nombre Mascota</label>
                <input type="text" name="mascota" className="u-full-width" placeholder="Nombre completo de la mascota" onChange={updateState} value={mascota}/>

                <label>Nombre Dueño</label>
                <input type="text" name="propietario" className="u-full-width" placeholder="Nombre completo del dueño" onChange={updateState} value={propietario}/>

                <label>Fecha</label>
                <input type="date" name="fecha" className="u-full-width" onChange={updateState} value={fecha}/>

                <label>Hora</label>
                <input type="time" name="hora" className="u-full-width" onChange={updateState} value={hora}/>

                <label>Sintomas</label>
                <textarea name="sintomas" cols="30" rows="10" className="u-full-width" onChange={updateState} value={sintomas}></textarea>

                <button type="submit" className="u-full-width button-primary">Agendar Cita</button>
            </form>
        </Fragment>
    )
}

Form.propTypes = {
    createDate: PropTypes.func.isRequired
}

export default Form;