import React from 'react'

import axios from 'axios';

import {Newpost,PostList} from '../components/PostList';

import Landing from '../components/Landing';

import {useState} from 'react'




const Dashboard = () => {
	const [currentUser, setCurrentUser] = useState({});

	axios.get('/api/users/current', {headers:{authorization:localStorage.getItem('token')}})
	.then((res)=>{
		setCurrentUser(res.data);
	})
	.catch(err=>console.log(err));
	return (    
		<div className="feed">
		    {(currentUser.name)?<PostList currentUser={currentUser}/>:<Landing />}
		</div>		
	);
};

export default Dashboard;