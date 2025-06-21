import React from 'react'

const modal = document.getElementById('modal')
const Modal = (props) => {
  if (props.opened){
    modal.style.display = "flex";
  }

  return (
	<div className="modal" id='modal'>
      <span className="close">&times;</span>
      <img src={props.img} alt="Image" />
  </div>
  )
}

export default Modal