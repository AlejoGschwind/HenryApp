import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from "../../redux/actions/authActions";

import { ReactComponent as HamburgerIcon } from "../../assets/icons/hamburgerlogo.svg";
import { ReactComponent as ConsoleIcon } from "../../assets/icons/consolelogo.svg";
import {
  AvatarWrapper,
  HamburgerWrapper,
  LogoWrapper,
  LogInWrapper,
  HeaderWrapper,
  MenuWrapper,
  MenuItem,
  LinksWrapper
} from './styles';

import henryLogo from "../../assets/images/henry.png";

const Header = () => {

  const { isAuth, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <HeaderWrapper>
      <HamburgerWrapper>
        <HamburgerIcon />
      </HamburgerWrapper>

      <LogoWrapper>
        <Link to="/">
          <img src={henryLogo} alt="Henry Logo" />
        </Link>
      </LogoWrapper>

      {
        isAuth ?
          <LogInWrapper>
            <ConsoleIcon />
            <span>{user.firstName} {user.lastName}</span>
            <AvatarWrapper>
              {
                user.avatar &&
                <img src={user.avatar} alt={user.firstName + " " + user.lastName} />
              }
            </AvatarWrapper>
            <MenuWrapper>
              <MenuItem>
                <Link to="/profile">Perfil</Link>
              </MenuItem>
              {user.isSuperAdmin === true || user.role === 'instructor'
              ?
                <div> <MenuItem>
                  <Link to="/users">Usuarios</Link>
                </MenuItem>
                  <MenuItem>
                    <Link to="/modules">Módulos</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/lecturesList">Clases</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/talks">Henry Talks</Link>
                  </MenuItem>
                </div>
                :
                <MenuItem>
                  <Link to="/payments">Estado de cuenta</Link>
                </MenuItem>
              }
              <MenuItem>
                <Link to="/empleos">Bolsa de trabajo</Link>
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                Salir
              </MenuItem>
            </MenuWrapper>
          </LogInWrapper>
          :
          <LinksWrapper>
            <Link to="/login">Ingresar</Link>/
            <Link to="/register"> Registrate</Link>
          </LinksWrapper>
      }
    </HeaderWrapper>
  );
};

export default Header;
