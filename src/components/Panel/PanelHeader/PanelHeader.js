import React from 'react';

const panelHeader = (props) => (
  <h1 className={props.className}>
    {props.children}
  </h1>
);

export default panelHeader;
