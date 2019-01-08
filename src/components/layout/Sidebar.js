import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
	return (
		<div>
			<Link to="/client/add" className="btn btn-success btn-block">
				<i className="fas fa-plus">
					<span className="ml-2">New</span>
				</i>
			</Link>
		</div>
	)
}
