import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

class Clients extends Component {
	state = {
		totalOwed: null
	}

	static getDerivedStateFromProps(props, state) {
		const { clients } = props

		if (clients) {
			const totals = clients.reduce((total, client) => {
				return total + parseFloat(client.balance.toString())
			}, 0)
			return { totalOwed: totals }
		}
		return null
	}
	render() {
		const { clients } = this.props
		const { totalOwed } = this.state

		if (clients) {
			return (
				<div>
					<div className="row">
						<div className="col-md-6">
							<h2>
								<i className="fa fas-users" />
								Clients
							</h2>
						</div>
						<div className="col-md-6">
							<h5 className="text-right text-secondary">
								Totals Owed:
								<span className="text-primary">
									${parseFloat(totalOwed).toFixed(2)}
								</span>
							</h5>
						</div>
					</div>
					<table className="table table-striped">
						<thead className="thead-striped">
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Balance</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{clients.map(client => (
								<tr key={client.id}>
									<td>
										{client.firstName} {client.lastName}
									</td>
									<td>{client.email}</td>
									<td>R{parseFloat(client.balance).toFixed(2)}</td>
									<td>
										<Link
											to={`/client/${client.id}`}
											className="btn btn-secondary btn-sm"
										>
											<i className="fas fa-arrow-circle-right mr-2" />
											Details
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)
		} else {
			return <Spinner />
		}
	}
}

Clients.propTypes = {
	firestore: PropTypes.object.isRequired,
	clients: PropTypes.array
}

export default compose(
	firestoreConnect([{ collection: 'Clients' }]),
	connect((state, props) => ({
		clients: state.firestore.ordered.Clients
	}))
)(Clients)
