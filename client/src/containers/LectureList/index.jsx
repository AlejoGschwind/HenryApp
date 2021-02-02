import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './index.css'

const lectureList = () => {
    const [allLectures, setAllLectures] = useState([{
        title: '',
        imagen: '',
        video: [],
        modulo: '',
        description: '',
        _id: '',
        nameModulo: ""
    }]);
    const [estadoId, setEstadoId] = useState('');

    const [video, setVideo] = useState({
        title: '',
        profesor: '',
        url: '',
        img: 'https://media-exp1.licdn.com/dms/image/C4E0BAQGy6GZmHb_SXA/company-logo_200_200/0/1603651276024?e=1619654400&v=beta&t=kRb_lMNqQF3oGVL9IrNYVxKdJf1qDW3FNTRdSeIu4zI',
        duration: ''
    });

    const [oneLecture, setOneLecture] = useState({
        title: "",
        description: ""
    });


    const [allModules, setAllModules] = useState([{
        title: "",
        description: "",
        order: null,
        lectures: []
    }])

    useEffect(() => {
        getLectures();
        getNameModule();
    }, []);

    const getLectures = () => {
        axios.get("http://localhost:5000/lectures")
            .then(res => {
                setAllLectures(res.data);
            });
    };





    const getNameModule = (id) => {
        axios.get(`http://localhost:5000/modules/`)
            .then(res => {
                setAllModules(res.data)
            });
    }



    const handleDelete = (id) => {
        if (confirm("¿Quiere eliminar la Lecture? Se eliminarán todos los videos asociados") === true) {
            axios.delete(`http://localhost:5000/lectures/${id}`)
                .then(res => getLectures());
        };
    };



    const handleSubmit = (id) => {
        const { title, description } = oneLecture;
        axios.patch(`http://localhost:5000/lectures/${id}`, { title, description })
            .then(res => {
                getLectures(),
                    setOneLecture({
                        title: "",
                        description: ""
                    });
            });
    };

    const handleChange = (e) => {
        setOneLecture({
            ...oneLecture,
            [e.target.name]: e.target.value
        });
    };

    const handleVideoSubmit = () => {
        const { title, profesor, url, img, duration } = video
        axios.post(`http://localhost:5000/videos/${estadoId}`, { title, profesor, url, img, duration })
            .then(res => {
                getLectures(),
                    setVideo({
                        title: '',
                        profesor: '',
                        url: '',
                        img: 'https://media-exp1.licdn.com/dms/image/C4E0BAQGy6GZmHb_SXA/company-logo_200_200/0/1603651276024?e=1619654400&v=beta&t=kRb_lMNqQF3oGVL9IrNYVxKdJf1qDW3FNTRdSeIu4zI',
                        duration: ''
                    })

            })
    };

    function handleVideoChange(e) {
        setVideo({
            ...video,
            [e.target.name]: e.target.value
        });
    }


    return (
        <div>
            <div>
                <table >
                    <thead >
                        <tr >
                            <th scope="col">Modulo</th>
                            <th scope="col">Lecture</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Videos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            allLectures.map((lecture, index) => {
                                const { modulo, title, _id, description, video } = lecture;
                                return (
                                    <tr key={index}>
                                        <td>{allModules[0].title}</td>
                                        <td>{title}</td>
                                        <td>{description}</td>
                                        <td>{video.length}</td>
                                        <td ><button onClick={() => setEstadoId(_id)} ><a href="#openModal"> <i className="fas fa-user-edit" /></a></button></td>
                                        <div id="openModal" class="modalDialog">
                                            <div>	<a href="#close" title="Close" class="close">X</a>
                                                <h2>Editar Lecture</h2>
                                                <form onSubmit={() => handleSubmit(estadoId)}><a href="#close" title="Close" class="close"></a>
                                                    <p>
                                                        Titulo
                                                        <input name="title" type="text" onChange={e => handleChange(e)} />
                                                    </p>
                                                    <p>
                                                        Descripcion
                                                        <input name="description" onChange={e => handleChange(e)}></input>
                                                    </p>
                                                    <button type="submit"  >GUARDAR CAMBIOS</button>
                                                </form>
                                            </div>
                                        </div>
                                        {/* --------------------------------------------------------------------- */}
                                        <td><button type="submit" onClick={() => handleDelete(_id)} > <i className="fas fa-trash-alt" /></button></td>
                                        <td><button onClick={() => setEstadoId(_id)}><a href="#openModal2"><i className="fas fa-plus-circle me-2" /> Agregar video</a></button></td>
                                        <div id="openModal2" className="modalDialog">
                                            <div>	<a href="#close" title="Close" className="close">X</a>
                                                <div >
                                                    <form onSubmit={() => handleVideoSubmit(estadoId)}><a href="#close" title="Close" className="close"></a>
                                                        <div >
                                                            <label >
                                                                Titulo</label>
                                                            <div >
                                                                <input
                                                                    onChange={(e) => { handleVideoChange(e) }}
                                                                    name="title"
                                                                    type="text"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div >
                                                            <label >
                                                                Profesor</label>
                                                            <div >
                                                                <input
                                                                    onChange={(e) => { handleVideoChange(e) }}
                                                                    name="profesor"
                                                                    type="text"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div >
                                                            <label >
                                                                url
                                                        </label>
                                                            <div >
                                                                <input
                                                                    onChange={(e) => { handleVideoChange(e) }}
                                                                    name="url"
                                                                    type="text"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div >
                                                            <label >
                                                                Duración
                                                        </label>
                                                            <div >
                                                                <input
                                                                    onChange={(e) => { handleVideoChange(e) }}
                                                                    name="duration"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div >
                                                            <label >
                                                                Imagen
                                                        </label>
                                                            <div >
                                                                <input
                                                                    onChange={(e) => { handleVideoChange(e) }}
                                                                    name="img"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <button type='submit'>
                                                                    Cargar video
                                                          </button>
                                                            </div>
                                                        </div>
                                                    </form><br />
                                                </div >
                                            </div>
                                        </div>
                                    </tr>)
                            })}
                    </tbody>
                </table>
            </div>
            <Link to='/'>
                <button type="button">
                    <i className="fas fa-home" />
                  Inicio
              </button>
            </Link>
            <Link to='/modules'>
                <button type="button">
                    <i className="fas fa-list" />
                     Lista de Modulos
              </button>
            </Link>
        </div >
    )
};

export default lectureList;