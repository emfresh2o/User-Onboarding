import React, { Component } from 'react';
import './styles.css';
import Form from './Form';
import styled from 'styled-components';

const mainCont = styled.div`
   background-image: url(https://drive.google.com/file/d/1rdg0VTRdZIsrmIEWwiRuz17LOzq2-ujv/view?usp=sharing);
   bacgkround-size: cover;
   background-repeat: no-repeat;
   height: 750px;
   `;

function App() {
  return (
    <mainCont className="fantasy">
        <h1>Fantasia User Sign-up</h1>
        <Form />
    </mainCont>
  );
}

export default App;
