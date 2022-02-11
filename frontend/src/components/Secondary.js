import React from 'react';
import styled from 'styled-components';
import arrow from '../images/arrow.svg';

function  SecondaryButton({name}) {
     return(
         <SecondaryButtonStyled>
                    {name}
              <img src={arrow} alt=""/>      
         </SecondaryButtonStyled>
     );
}

const SecondaryButtonStyled = styled.button`
      background-color: white;
      padding: 1rem 2rem;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      border-radius: 20px;
      outline: none;
      border: 1px solid black;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img{
          padding-left: .8rem;
      }
`;

export default SecondaryButton;
