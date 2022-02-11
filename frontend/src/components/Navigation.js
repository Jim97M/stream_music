import React from "react";
import styled from 'styled-components';
import logo from '../images/logo.svg';
import {Fade} from 'react-reveal';

function Navigation(){
    return(
        <Fade top>
          <NavigationStyled>
              <div className="logo">
                <img src={logo} alt=""/>
              </div>
              <ul>
                  <li>
                      <a href="">Home</a>
                  </li>
                  <li>
                      <a href="">Features</a>
                  </li>
                  <li>
                      <a href="">Sign Up</a>
                  </li>
              </ul>
              
          </NavigationStyled>
        </Fade>
    )
}

const NavigationStyled = styled.nav`
    
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

export default Navigation;
