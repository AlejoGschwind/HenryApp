import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Containers / Pages
import TalkList from "./components/TalkList";
import CardTalk from "./components/CardTalk";
import CreateUser from "./components/CreateUser";
/* import CreateUser from "./components/CreateUser"; */
import OneLecture from "./components/OneLecture";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import Lectures from "./containers/Lectures";
import GooglePage from "./containers/GooglePage";
import ModuleList from "./containers/CRUDmodules";
import HenryTalksCRUD from "./containers/HenryTalksCRUD";
import CreateTalk from "./components/CreateTalk";
import UserListPage from "./containers/UserListPage";
import Booms from "./components/Booms/Booms.jsx";
import Catalogo from "./components/Catalogo";
import LecturesPage from './containers/LecturesPage';
import LectureList from "./containers/LectureList";
import error from "./components/error/error";
import Payment from "./containers/Payment";
import Profile from "./components/Profile";
import LecturesListPage from "./containers/LecturesListPage";
import ModulesListPage from "./containers/ModulesListPage";

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* To do: Acá van las rutas del cliente.*/}
        <Route path='/' exact component={HomePage} />
        <Route path='/oauth/:token' exact component={GooglePage} />
        <Route path='/register' exact component={RegisterPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/users' component={UserListPage} />
        {/* <Route exact path='/createUser' component={CreateUser} /> */}
        <Route exact path='/lectures' component={LecturesListPage} />
        <Route exact path='/modules' component={ModulesListPage} />
        <Route exact path="/lecture/:lectureid/module/:moduleid" component={OneLecture} />
        <Route exact path='/modules/:moduloid' component={LecturesPage} />
        <Route exact path='/talk' component={CreateTalk} />
        <Route exact path='/talks' component={TalkList} />
        <Route exact path='/card-talk' component={CardTalk} />
        <Route exact path="/booms" component={Booms} />
        <Route exact path="/createTalk" component={CreateTalk} />
        <Route exact path="/error" component={error} />
        <Route exact path="/empleos" component={Catalogo} />
        <Route exact path="/payments" component={Payment} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
