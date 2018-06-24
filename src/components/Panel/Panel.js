import React from 'react';

const panel = (props) => (
  <div className={props.className} >
    {props.children}
  </div>
);

export default panel;
