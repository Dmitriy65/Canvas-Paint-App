import React from 'react';
import './CanvasField.css';

function CanvasField({ canvas, errorMessage }) {

  console.log(errorMessage);
  
  return (
    <div className='canvas-field'>
      {!errorMessage && canvas 
        ? <pre style={{ fontSize: "1.5rem" }}>{canvas}</pre> 
        : <p style={{color: 'red'}}>{errorMessage}</p>}
    </div>
  );
}

export default CanvasField;
