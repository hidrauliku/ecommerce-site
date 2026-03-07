import React from 'react';
import './../App.css'; 

const PageBackground = ({ children }) => {
  return (
    <div className="page-background">
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;