import React from 'react';

const GoogleButton = ({ onClick = null, children, disabled = false }) => {
  return (
    <button onClick={onClick} className="ui red google button" disabled={disabled} style={{ width: "100%" }}>
      <i className="google icon"></i>
      {children}
    </button>
  );
};

export default GoogleButton;