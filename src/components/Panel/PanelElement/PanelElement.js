import React from 'react';

const panelElement = (props) => (
  <p className={props.className}>
    {props.children}
  </p>
);

export default panelElement;
