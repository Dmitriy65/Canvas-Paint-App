import React from "react";
import './ButtonGroup.css'

function ButtonGroup({ handleInputFile, link }) {

  return (
    <div className="btn-block">
      <label className="custom-file-upload" htmlFor="input-file">
        Click to upload your txt file
        <input type="file" id="input-file" onChange={(evt) => {
          handleInputFile(evt.target.files[0]);
          evt.target.value = null;
        }}></input>
      </label>
      <br></br>
      {link ? <a href={link} className="active-link" download="output.txt">Click to download your txt file</a>
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        : <a href="#" className="disabled-link">You can`t download you file. Correct file required!</a>}
    </div>
  )
};
export default ButtonGroup; 