import React from 'react'

const Background = (props) => {
  return (
	<div>
		<img src={props.img} alt="Background" className='background-img'/>
	</div>
  )
}

export default Background