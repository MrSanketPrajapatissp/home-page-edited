
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './fadeTransition.css'; // Make sure to create this CSS file

const FadeTransition = ({ in: inProp, children }) => (
  <CSSTransition
    in={inProp}
    timeout={600}
    classNames="fade"
    unmountOnExit
  >
    {children}
  </CSSTransition>
);

export default FadeTransition;
