// import { compose } from 'redux'
// import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import React, { Component } from 'react'

class Login extends Component {
	state = {
		email: '',
		password: ''
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit = e => {
		e.preventDefault()
		const { email, password } = this.state
		const { firebase } = this.props

		firebase.login({ email, password }).catch(err => alert('invalid email'))
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h1 className="text-center pb-4 pt-3">
								<span className="text-primary">
									{' '}
									<i className="fas fa-lock" />
									Login
								</span>
							</h1>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										type="text"
										className="form-control"
										name="email"
										required
										value={this.state.email}
										onChange={this.onChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input
										type="text"
										className="form-control"
										name="password"
										required
										value={this.state.password}
										onChange={this.onChange}
									/>
								</div>
								<input type="submit" className="btn btn-block" value="login" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Login.PropTypes = {
	firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login)
