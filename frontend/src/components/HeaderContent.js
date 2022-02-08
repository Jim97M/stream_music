import React from "react";
import styled from "styled-components";
import deejay from '../images/message_pink.svg';
import sharemusic from '../images/message_blue.svg';
import anim from '../images/imacon.jpg';
import {Fade} from 'react-reveal';

function HeaderContent(){
    return(
          <HeaderContentStyled>
            <Fade left cascade>
              <div className="left-contents">
                <div className="left-text-container">
                    <h1> Stream Music </h1>
                    <p className="white"> Share music among peers, stream music in a room and connect </p>       
                </div>
              </div>
              </Fade>
              <Fade right>
               <div className="right-content">
                  <img src={sharemusic} alt="" className="share"/>
                  <img src={deejay} alt="" className="deejay"/>  
               </div>
             </Fade>
            </HeaderContentStyled>
    )
}

const HeaderContentStyled = styled.div`
   display: grid
   grid-template-columns: repeat(2, 1fr);
   padding-top: 3rem;
   @media screen and(max-width: 700px){
     grid-template-columns: repeat(1, 1fr);
   }
   .left-content{
     display: flex;
     align-items: center;
     padding-right: 3rem;
     .white{
       color:white;
     }
   
   h1{
     font-size: 4rem;
     font-weight: 600;
     @media screen and(max-width: 700px){
       font-size: 3rem;
     }
   }

   .white{
      padding: 1.4rem 0;
      line-height: 1.8rem;
   }
  }

.right-content{
   position: relative;
   display: flex;
   justify-content: center;
     .sharemusic{
       width: 80%;
     }
   .deejay{
     position: absolute;
     bottom: 10%;
     right: 0;
     left: auto;
     animation: move2 20s infinite;
     transition: all .4s ease-in-out;
   }
 }

//Header Animations
  .imacon{
    @keyframes move{
      0%{
        transform: translateY(0) rotate(0) scale(1) translateX(0);
      }
      50%{
        transform: translateY(-10px) rotate(20deg) scale(1.1) translateX(10px);
      }
      100%{
        transform: translateY(0) rotate(0deg) scale(1) translateX(0)
      }
    }
  }
`;

export default HeaderContent;