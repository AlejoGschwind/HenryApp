import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateModule from '../../components/CreateModule/index';
import "./estilos.css";

const ModuleList = () => {
  const [allModules, setAllModules] = useState([{
    title: '',
    description: '',
    lectures: [],
    order: null,
    _id: ''
  }]);
  const [oneModule, setOneModule] = useState({
    title: "",
    description: ""
  });
  const [oneId, setOneId] = useState(null);

  useEffect(() => {
    getModules();
  }, []);

  const getModules = () => {
    axios.get("http://localhost:5000/modules/")
      .then(res => {
        setAllModules(res.data);
      });
  };

  const handleDelete = (id) => {
    if (confirm("¿Quiere eliminar este módulo? Se eliminarán todas las clases y videos asociados.") === true) {
      axios.delete(`http://localhost:5000/modules/${id}`)
        .then(res => getModules());
    }
  };

  const [lecture, setLecture] = useState({
    title: "",
    imagen: 'https://media-exp1.licdn.com/dms/image/C4E0BAQGy6GZmHb_SXA/company-logo_200_200/0/1603651276024?e=1619654400&v=beta&t=kRb_lMNqQF3oGVL9IrNYVxKdJf1qDW3FNTRdSeIu4zI',
    description: '',
    moduloName: "",
    urlLecture: ""
  });

  function handleChange(e) {
    setLecture({
      ...lecture,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e) => {
    const { title, imagen, description, moduloName, urlLecture } = lecture;
    console.log(urlLecture)
    //Si la URL no matchea con el repo de github de soyHenry, simplemente alerta que no es válido
    if (urlLecture.substring(0,28) !== "https://github.com/soyHenry/" ) {
      alert ("El enlace ingresado no es válido")
      e.preventDefault()
      return  

    } else {
      console.log("lectura valida, se supone que se mando el link")
      axios.post(`http://localhost:5000/lectures/${oneId}`, { title, imagen, description, moduloName, urlLecture }) 
      .then(res => console.log(res));}
      
  };

  const handleModuleSubmit = (id) => {
    const { title, description } = oneModule;

    axios.patch(`http://localhost:5000/modules/${id}`, { title, description })
      .then(res => {
        getModules();
        setOneModule({
          title: "",
          description: ""
        });
      });
  };

  const handleModuleChange = (e) => {

    setOneModule({
      ...oneModule,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div>
      <h3>Módulos</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">Módulo</th>
            <th scope="col">Clases</th>
          </tr>
        </thead>
        <tbody>
          {
            allModules.map((module, index) => {
              const { title, lectures, _id } = module;

              return (
                <tr key={index}>
                  <td >{title}</td>
                  <td>{lectures.length}</td>
                  <td >
                    <button onClick={() => setOneId(_id)} ><a href="#openModal1">
                      <i className="fas fa-user-edit" /> </a>
                    </button>
                  </td>

                  {/* ---------------------------------MODAL EDITAR MODULO---------------------------------------------------- */}

                  <div id="openModal1" className="modalDialog">
                    <div>
                      <a href="#close" title="Close" className="close">X</a>
                      <h2>Editar Módulo</h2>
                      <form onSubmit={() => handleModuleSubmit(oneId)} >
                        <a href="#close" title="Close" className="close"></a>
                        <p>
                          Título
                          <input name="title" onChange={e => handleModuleChange(e)} />
                        </p>
                        <p>
                          Descripción
                          <input name="description" onChange={e => handleModuleChange(e)} />
                        </p>
                        <button type="submit">  Guardar cambios</button>
                      </form>
                    </div>
                  </div>

                  {/* ---------------------------------MODAL CREAR LECTURE---------------------------------------------------- */}

                  <td><button type="submit" onClick={() => handleDelete(_id)} > <i className="fas fa-trash-alt" /></button></td>
                  <td><button onClick={() => setOneId(_id)}><a href="#openModal"><i className="fas fa-plus-circle me-2" /> Agregar clase</a></button></td>
                  <div id="openModal" className="modalDialog">
                    <div>
                      <a href="#close" title="Close" className="close">X</a>
                      <div>
                        <div>
                          <h3>Crear una clase</h3>
                        </div>
                        <form onSubmit={()=>{handleSubmit}}>
                          <div>
                            <label>Módulo </label>
                            <div>
                              <input
                                onChange={(e) => { handleChange(e); }}
                                name="moduloName"
                                type="text"
                                required />
                            </div>
                          </div>
                          <div>
                            <label>Nombre</label>
                            <div>
                              <input
                                onChange={(e) => { handleChange(e); }}
                                name="title"
                                type="text"
                                required />
                            </div>
                          </div>
                          <div>
                            <label>Descripción</label>
                            <div>
                              <textarea
                                onChange={(e) => { handleChange(e); }}
                                name="description"
                                type="text"
                                required />
                            </div>
                          </div>
                          <div>
                            <div>
                              <label>URL Clase</label>
                              <div>
                                <input
                                  onChange={(e) => { handleChange(e); }}
                                  name="urlLecture"
                                  type="text"
                                  required />
                              </div>
                            </div>
                            <label>Imagen</label>
                            <div>
                              <input
                                onChange={(e) => { handleChange(e); }}
                                name="imagen"
                                type="text"
                                placeholder='Puede agregar una imagen' />
                            </div>
                          </div>
                          <div>
                            <div>
                              <button type='submit'>Crear clase</button>
                            </div>
                          </div>
                        </form>
                        <br />
                      </div>
                    </div>
                  </div>
                </tr>);
            })}
        </tbody>
      </table>
      <br />
      <CreateModule />
    </div >
  );
};

export default ModuleList;
