import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { firestoreConnect } from 'react-redux-firebase'

import PropTypes from 'prop-types'

class AddClient extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		balance: ''
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit = e => {
		e.preventDefault()

		const newClient = {
			...this.state,
			balance: this.state.balance === '' ? 0 : this.state.balance
		}

		const { firestore } = this.props

		firestore
			.add({ collection: 'Clients' }, newClient)
			.then(() => this.props.history.push('/'))
	}

	render() {
		const { disableBalanceOnAdd } = this.props.settings

		return (
			<div>
				<div className="col">
					<Link to="/" className="btn btn-link ">
						<i className="fas fa-arrow-circle-left mr-2" />
						Back to dashboard
					</Link>
				</div>

				<div className="card">
					<div className="card-header">Add Client</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-row">
								<div className="col">
									<div className="form-group">
										<label htmlFor="firstName">First Name</label>
										<input
											type="text"
											className="form-control"
											name="firstName"
											minLength="2"
											required
											onChange={this.onChange}
											value={this.state.firstName}
										/>
									</div>
								</div>
								<div className="col">
									<div className="form-group">
										<label htmlFor="lastName">Last Name</label>
										<input
											type="text"
											className="form-control"
											name="lastName"
											minLength="2"
											required
											onChange={this.onChange}
											value={this.state.lastName}
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email Address</label>
								<input
									type="text"
									className="form-control"
									name="email"
									onChange={this.onChange}
									value={this.state.email}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="phone">Phone Number</label>
								<input
									type="text"
									className="form-control"
									name="phone"
									onChange={this.onChange}
									value={this.state.phone}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="balance">Balance</label>
								<input
									type="text"
									className="form-control"
									name="balance"
									onChange={this.onChange}
									value={this.state.balance}
									disabled={disableBalanceOnAdd}
								/>
							</div>
							<input type="submit" className="btn btn-block btn-secondary" />
						</form>
					</div>
				</div>
			</div>
		)
	}
}

AddClient.propTypes = {
	firestore: PropTypes.object.isRequired,
	settings: PropTypes.object.isRequired
}

export default compose(
	firestoreConnect(),
	connect((state, props) => ({
		settings: state.settings
	}))
)(AddClient)
