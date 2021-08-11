import {Link} from 'react-router-dom';


const Landing = (props) => {
	
	return (
		<div className="landing">
			<Link to="/" className="link link_1">Social Network</Link>
			<ul>
				<li><Link to="/signin" className="link link_2" /*onClick={}*/>Sign In</Link></li>
				<li><Link to="/signup" className="link link_3" /*onClick={}*/>Create An Account</Link></li>
			</ul>
		</div>
	);
};

export default Landing;