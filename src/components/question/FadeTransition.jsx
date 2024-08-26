import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const FadeTransition = ({ in: inProp, children }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={inProp}
      timeout={300}
      classNames="fade"
      nodeRef={nodeRef}
    >
      <div ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default FadeTransition;
