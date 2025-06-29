import React from 'react'

const PictureDisplay = (props) => {
	
  return (
	<div className='picture-frame'>
		<img src={props.img} className=''/>
	</div>
  )
}

export default PictureDisplay