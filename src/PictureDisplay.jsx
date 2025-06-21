import React from 'react'

const PictureDisplay = (props) => {
	
  return (
	<div className='picture-frame'>
		<img src={props.img} alt="Image" className=''/>
	</div>
  )
}

export default PictureDisplay