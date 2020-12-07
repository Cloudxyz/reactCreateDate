import React, { Fragment, useState, useEffect } from "react";
import Form from './components/Form';
import Cita from './components/Cita';

function App() {

  let citasInit = JSON.parse(localStorage.getItem('citas'));
  if(!citasInit){
    citasInit = [];
  }
  const [citas, saveDates] = useState(citasInit);

  // El useEffect es como el documentReady
  useEffect( () => {
    if(citasInit){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasInit]);

  // Function que toma las citas actuales y agregue la nueva
  const createDate = cita => {
    saveDates([
      ...citas,
      cita
    ]);
  }

  // Function eliminar cita
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    saveDates(nuevasCitas);
  }

  const title = citas.length > 0 ? 'Administra tus citas' : 'Agrega una cita';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form createDate={createDate} />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
