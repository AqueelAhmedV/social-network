import {Link} from 'react-router-dom';


const navibar = (props) => {
	
	return (
		<div className="navibar">
			<Link to="/" className="link link_1">Social Network</Link>
			<ul>
				<li>{(props.currentUser.name)?<div className="photo"></div>:<Link to="/signin" className="link link_2" /*onClick={}*/>Sign In</Link>}</li>
				<li>{(props.currentUser.name)?<span className="name_head" width={"10%;"}><p  style={{"font-size":"0.5rem"}}>{"Welcome, "}</p><p style={{"color":"red"}}>{props.currentUser.name}</p></span>:<Link to="/signup" className="link link_3" /*onClick={}*/>Create An Account</Link>}</li>
			</ul>
		</div>
	);
};

export default navibar;