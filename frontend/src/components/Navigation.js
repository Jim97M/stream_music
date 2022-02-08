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
                      <a href="">Pricing</a>
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

    ul{
        display: flex;
        justify-content: space-between;
        width: 40%;
    }
`;

export default Navigation;
