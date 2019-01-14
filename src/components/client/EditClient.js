import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

class EditClient extends Component {
	constructor(props) {
		super(props)
		this.firstNameInput = React.createRef()
		this.lastNameInput = React.createRef()
		this.emailInput = React.createRef()
		this.phoneInput = React.createRef()
		this.balanceInput = React.createRef()
	}

	onSubmit = e => {
		e.preventDefault()
		const { Client, firestore, history } = this.props

		const updClient = {
			firstName: this.firstNameInput.current.value,
			lastName: this.lastNameInput.current.value,
			email: this.emailInput.current.value,
			phone: this.phoneInput.current.value,
			balance:
				this.balanceInput.current.value === ''
					? 0
					: this.balanceInput.current.value
		}

		firestore
			.update({ collection: 'Clients', doc: Client.id }, updClient)
			.then(history.push('/'))
	}

	render() {
		const { Client } = this.props

		if (Client) {
			return (
				<div>
					<div className="col">
						<Link to="/" className="btn btn-link ">
							<i className="fas fa-arrow-circle-left mr-2" />
							Back to dashboard
						</Link>
					</div>

					<div className="card">
						<div className="card-header">Edit Client</div>
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
												ref={this.firstNameInput}
												defaultValue={Client.firstName}
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
												ref={this.lastNameInput}
												defaultValue={Client.lastName}
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
										ref={this.emailInput}
										defaultValue={Client.email}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="phone">Phone Number</label>
									<input
										type="text"
										className="form-control"
										name="phone"
										onChange={this.onChange}
										ref={this.phoneInput}
										defaultValue={Client.phone}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="balance">Balance</label>
									<input
										type="text"
										className="form-control"
										name="balance"
										onChange={this.onChange}
										ref={this.balanceInput}
										defaultValue={Client.balance}
									/>
								</div>
								<input type="submit" className="btn btn-block btn-secondary" />
							</form>
						</div>
					</div>
				</div>
			)
		} else {
			return <Spinner />
		}
	}
}

EditClient.prototypes = {
	firestore: PropTypes.object.isRequired
}

export default compose(
	firestoreConnect(props => [
		{
			collection: 'Clients',
			storeAs: 'Client',
			doc: props.match.params.id
		}
	]),
	connect(({ firestore: { ordered } }, props) => ({
		Client: ordered.Client && ordered.Client[0]
	}))
)(EditClient)
