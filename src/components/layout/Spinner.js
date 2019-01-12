import React from 'react'
import Spinner from '../layout/spinner.gif'

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
