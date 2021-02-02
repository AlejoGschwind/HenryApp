import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Containers / Pages
import UserList from "./components/UserList/index"
import CreateUser from "./components/CreateUser/index"
import OneLecture from "./components/OneLecture/index"
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import Lectures from './containers/Lectures'
import GooglePage from './containers/GooglePage';
import lectureList from './containers/LectureList/index';//arreglar
import ModuleList from './containers/CRUDmodules/index';
import CreateTalk from './components/CreateTalk'

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* To do: Acá van las rutas del cliente.*/}
        <Route path='/' exact component={HomePage} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/oauth/:token' exact component={GooglePage} />
        <Route path='/register' exact component={RegisterPage} />
        <Route exact path='/users' component={UserList} />
        <Route exact path='/createUser' component={CreateUser} />
        <Route exact path='/lecture/:lectureid' component={OneLecture} />
        <Route exact path='/modulo/:moduloid' component={Lectures} />
        <Route exact path='/lecturesList' component={lectureList} />
        <Route exact path='/modules' component={ModuleList} />
        <Route exact path='/talk' component={CreateTalk}/>
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
