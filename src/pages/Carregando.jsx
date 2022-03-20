import React, { Component } from 'react';
import styled, { keyframes } from "styled-components";


// import backgroundImage from '../images/2.jpg';

const moving1 = keyframes`
  0% {
    transform: translateY(0em);
  };

  15% {
  transform: translateY(-0.5em);
  };

  30% {
    transform: translateY(0em);
  };
`;

const moving2 = keyframes`
  15% {
    transform: translateY(0em);
  };

  30% {
    transform: translateY(-0.5em);
  };

  60% {
  transform: translateY(0em);
  };
`;

const moving3 = keyframes`
  30% {
    transform: translateY(0em);
  };

  45% {
    transform: translateY(-0.5em);
  };

  75% {
  transform: translateY(0em);
  };
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* position:fixed; */

  .loading-container {
    width: 14em;
    margin: auto;
    padding: 0 1em;
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(0.2em);
    color: rgb(226, 234, 255, 1);
    display: flex;
    border-radius: 3px;
    
  }

  span {
    font-size: 2em;
  }

  .point-one {
    animation: ${moving1} 3s ease-out infinite;
  }

  .point-two {
    animation: ${moving2} 3s ease-out infinite;
  }

  .point-three {
    animation: ${moving3} 3s ease-out infinite;
  }
`;

export default class Carregando extends Component {
  render() {
    return (
      <StyledDiv>
        <div className="loading-container">
          <span>Carregando</span>
          <span className="point-one">.</span>
          <span className="point-two">.</span>
          <span className="point-three">.</span>
        </div>
      </StyledDiv>
    );
  }
}
