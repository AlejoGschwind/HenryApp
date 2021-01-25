import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const UserList = () => {
    const [allUsers, setAllUsers] = useState([{
        first_name: "",
        last_name: "",
        email: "",
        rol: "",
        _id: ""
    }]);
    const [selectedRole, setSelectedRole] = useState("");

    useEffect(() => {
        if (selectedRole === "") {
            return getUsers();
        } else {
            return getUsersRole(selectedRole);
        }
    }, [selectedRole]);

    const getUsers = () => {
        axios.get("http://localhost:5000/users")
            .then(res => {
                setAllUsers(res.data);
            })
    };

    const getUsersRole = (role) => {
        axios.get(`http://localhost:5000/users/${role}`)
            .then(res => setAllUsers(res.data));
    };


    const handleDelete = (id) => {
        if (confirm("¿Quiere eliminar al usuario?") === true) {
            axios.delete(`http://localhost:5000/users/${id}`)
                .then(res => getUsers());
        };
    };

    const roleHandler = (role) => {
        setSelectedRole(role)
    };

    return (
        <div >
            <h2><i class="fas fa-users" />    Usuarios</h2>
            <div>
                <button onClick={() => roleHandler("")}>Todos los usuarios</button>
                <button onClick={() => roleHandler("instructor")}>Instructores</button>
                <button onClick={() => roleHandler("student")}>Estudiantes</button>
                <button onClick={() => roleHandler("guest")}>Invitados</button>
                <button onClick={() => roleHandler("banned")}>banned</button>
            </div>
            <table >
                <thead >
                    <tr >
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Email</th>
                        <th scope="col">Rol</th>
                    </tr>
                </thead>
                {<tbody>
                    {
                        allUsers.map((user, index) => {
                            const { first_name, last_name, email, role, _id } = user;
                            return (
                                <tr key={index}>
                                    <td >{first_name}</td>
                                    <td>{last_name}</td>
                                    <td>{email}</td>
                                    <td>{role}</td>
                                    <td >
                                        <button type="submit"> <a href="#openModal"><i class="fas fa-user-edit" /></a>
                                            <div id="openModal" class="modalDialog">
                                                <div>	<a href="#close" title="Close" class="close">X</a>
                                                    <h2>Editar Usuario</h2>
                                                    <form>
                                                        <p>
                                                            Nombre  <input value={first_name}></input>
                                                        </p>
                                                        <p>
                                                            Apellido  <input value={last_name}></input>
                                                        </p>
                                                        <p>
                                                            Email  <input value={email}></input>
                                                        </p>
                                                        <p>
                                                            Rol  <input value={role}></input>
                                                        </p>
                                                    </form>

                                                </div>
                                            </div>
                                        </button>
                                        <button type="submit" onClick={() => handleDelete(_id)} ><i class="fas fa-trash-alt" /></button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>}
            </table>
        </div>

    );
};

export default UserList;