import React from 'react';
import styled from 'styled-components';
import bg from '../images/Sound Wave.svg';
import HeaderContent from './HeaderContent';
import Navigation from './Navigation';

function Home() {
    return(
        <HomeStyled>
            <div className="header-content">
                <Navigation />
                <HeaderContent />
            </div>
        </HomeStyled>
    )
}

const HomeStyled = styled.header`
 min-height: 100vh;
 width: 100%;
 background-image: url(${bg});
 background-repeat: no-repeat;
 background-size: cover;
 background-position-y: 100%;
 .header-content{
     padding: 0.18rem;
     @media screen and(max-width: 1374px){
         padding: 5rem 14rem;
     }
     @media screen and (max-width: 1186px){
         padding: 5rem 8rem;
     }
     @media screen and(max-width: 900px){
         padding: 5rem 4rem;
     }
 }
`;

export default Home;