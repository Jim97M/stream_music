import React, { Fragment, useState } from "react";
import {Link, Redirect} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import {Fade} from 'react-reveal';
import {logout} from '../redux/actions/auth';
import {connect} from 'react-redux';


function Navigation({logout, isAuthenticated}){
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    }

    const guest_links = () => {
        <Fragment>
            <li className='nav-item'>
              <Link className='nav-link' to="/login">Login</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to="/signup">SignUp</Link>
            </li>
        </Fragment>
    }

    const authLinks = () => (
        <li className="nav-item" >
            <a className="nav-link" href='#!' onClick={logout_user}>Logout</a>
        </li>
    )
    return(
      <Fragment>
        <Fade top>
          <NavigationStyled>
              <div className="logo">
                <img src={logo} alt=""/>
              </div>
              <ul>
                  <li className='nav-item active'>
                      <Link className='nav-link' >Home <span className='sr-only'>(current)</span> </Link>
                  </li>
                  {isAuthenticated ? authLinks() : guest_links()}
              </ul>
           </NavigationStyled>
          </Fade>
          {redirect ? <Redirect to='/' /> : <Fragment> </Fragment>}
        </Fragment>
    )
}

const NavigationStyled = styled.nav`
    s
    display: flex;
    justify-content: space-between;
    height: 10vh;
    align-items: center;

    .logo{
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
    }

    ul{
        display: flex;
        justify-content: space-between;
        width: 40%;
    }

    li{

        color:white;
        border: 1px solid black;
        border-radius: 10%;
        font-size: 20px;
        padding: 20px  15px 20px 15px;
        font-family: sans-serif;
        background-color: white;
        font-weight: bold;
    }

    a{
        text-decoration: none;
        color: black;
    }
`;

const mapStatetoProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps, {logout})(Navigation);
