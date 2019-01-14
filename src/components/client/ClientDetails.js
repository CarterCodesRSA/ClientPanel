import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

class ClientDetails extends Component {
	state = {
		showBalanceUpdate: false,
		balanceUpdateAmount: ''
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	balanceSubmit = e => {
		e.preventDefault()

		const { Client, firestore } = this.props
		const { balanceUpdateAmount } = this.state

		const clientUpdate = {
			balance: parseFloat(balanceUpdateAmount)
		}

		firestore.update({ collection: 'Clients', doc: Client.id }, clientUpdate)

		this.setState({
			showBalanceUpdate: !this.state.showBalanceUpdate,
			balanceUpdateAmount: ''
		})
	}
	render() {
		const { Client } = this.props
		const { showBalanceUpdate, balanceUpdateAmount } = this.state

		let BalanceForm = ''

		if (showBalanceUpdate) {
			BalanceForm = (
				<form onSubmit={this.balanceSubmit}>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							name="balanceUpdateAmount"
							placeholder="Add New Balance"
							value={balanceUpdateAmount}
							onChange={this.onChange}
						/>
						<div className="input-group-append">
							<input
								type="submit"
								value="Update"
								className="btn btn-secondary"
							/>
						</div>
					</div>
				</form>
			)
		} else {
			BalanceForm = null
		}

		if (Client) {
			return (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/" className="btn btn-link">
								<i className="fas fa-arrow-circle-left pr-3" />
								Back to Dashboard
							</Link>
						</div>
						<div className="col-md-6">
							<div className="btn-group float-right">
								<Link to={`client/edit.${Client.id}`} className="btn btn-dark">
									Edit
								</Link>
								<button className="btn btn-danger">Delete</button>
							</div>
						</div>
					</div>
					<hr />
					<div className="card">
						<h3 className="card-header">
							{Client.firstName} {Client.lastName}
						</h3>
						<div className="card-body">
							<div className="row">
								<div className="col-md-8 col-sm-6">
									<h4>
										Client ID:{' '}
										<span className="text-secondary">{Client.id}</span>
									</h4>
								</div>
								<div className="col-md-4 col-sm-6">
									<h3 className="pull-right">
										Balance:
										<span
											className={
												parseFloat(Client.balance) > 0
													? 'text-danger'
													: 'text-success'
											}
										>
											{' '}
											${parseFloat(Client.balance).toFixed(2)}
										</span>
										<small>
											<a
												href="#!"
												onClick={() => {
													this.setState({
														showBalanceUpdate: !this.state.showBalanceUpdate
													})
												}}
											>
												{' '}
												<i className="fas fa-pencil-alt" />
											</a>
										</small>
									</h3>
									{BalanceForm}
								</div>
							</div>

							<hr />
							<ul className="list-group">
								<li className="list-group-item">
									Contact Email: {Client.email}
								</li>
								<li className="list-group-item">
									Phone Number: {Client.phone}
								</li>
							</ul>
						</div>
					</div>
				</div>
			)
		} else {
			//retrieving data gif should be added
			return <Spinner />
		}
	}
}

ClientDetails.prototypes = {
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
)(ClientDetails)
