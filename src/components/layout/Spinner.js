import React from 'react'
import spinner from '../layout/Spinner1.gif'

export default function Spinner() {
	return (
		<div>
			<img
				src={spinner}
				alt="loading..."
				style={{ width: '200px', margin: 'auto', display: 'block' }}
			/>
		</div>
	)
}
