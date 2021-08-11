import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { BrowserRouter as Router ,Route, Switch } from 'react-router-dom';

import {useState} from 'react';
import axios from 'axios';


export default () => {
	const [currentUser, setCurrentUser] = useState({});

	axios.get('/api/users/current', {headers:{authorization: localStorage.getItem('token')}}).then(res=>{
		setCurrentUser(res.data);
	})
	.catch(err=>alert(err));

	return (
		<Router >
			<Navbar currentUser={currentUser}/>
			<div className="app">
				<Switch>
					<Route exact path="/">
						<Dashboard />
					</Route>
					<Route path="/signin">
						<Signin />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}