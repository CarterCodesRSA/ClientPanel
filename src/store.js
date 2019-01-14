import { createStore, combineReducers, compose } from 'redux'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

import notifyReducer from './Reducers/notifyReducer'
import settingsReducer from './Reducers/SettingsReducer'

const firebaseConfig = {
	apiKey: 'AIzaSyDafco-arVfd1Eq-pb-j-pfzoTyZP-4aPM',
	authDomain: 'clientpanel-13a8c.firebaseapp.com',
	databaseURL: 'https://clientpanel-13a8c.firebaseio.com',
	projectId: 'clientpanel-13a8c',
	storageBucket: 'clientpanel-13a8c.appspot.com',
	messagingSenderId: '42007894981'
}

const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true
}

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()

const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig),
	reduxFirestore(firebase)
)(createStore)
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	notify: notifyReducer,
	settings: settingsReducer
})

//Check for settings in local storage

if (localStorage.getItem('settings') == null) {
	const defaultSettings = {
		disableBalanceOnAdd: true,
		disableBalanceOnEdit: false,
		allowRegistration: false
	}

	//set to local storage

	localStorage.setItem('settings', JSON.stringify(defaultSettings))
}

// Create Initial State

const initialState = {
	settings: JSON.parse(localStorage.getItem('settings'))
}

const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

export default store
