import {useEffect} from 'react'
import axios from 'axios'

const Signin = () => {
	var msgBox = null;
	useEffect(()=>{
		const msg = document.getElementById('msg');
		msgBox = msg;
	});

	function handleSignin(){
		const emailBox = document.getElementById('email');
		const passBox = document.getElementById('password');
		const svg = document.getElementById('L9');
		const mail_format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		msgBox.innerHTML = (mail_format.test(emailBox.value))?((passBox.value)?"Loading":"Enter Password"):"Invalid Credentials";
		msgBox.style = ((mail_format.test(emailBox.value))&&(passBox.value))?"color:green":"color:red";
		
		const user = {
			email: emailBox.value,
			password: passBox.value
		};

		axios.post('/api/users/signin', user)
			.then((res) => {
				svg.style="display:block";
				if(res.data.success){
					setTimeout(()=>{
						svg.style="display:none";
						msgBox.innerHTML="Sign-in Successful";
						localStorage.setItem('token', res.data.token);
						setTimeout(()=>window.location = '/',2000);
					},3000);


				}
				else{
					setTimeout(()=>{
						svg.style="display:none;color:red;";
						msgBox.innerHTML="Invalid Credentials";
					},3000);
				}
			})


		setTimeout(()=>msgBox.innerHTML = "",5000);
		
	}

	return (<div className="sign-in">
			<div className="form_head">
				<span className="form_head_main">Sign In</span>
				<span className="form_head_sub">Stay connected with your friends</span>
			</div>
			<div className="form_box">
				<div className="msg-box">
					<span id="msg"></span>
				</div>
				<form id="review_form" action="">
					<div className="row">
						<div className="col-25">
							<label for="email">Email ID</label>
						</div>
						<div className="col-75">
							<input type="email" id="email" placeholder="example@email.com" />
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label for="password">Password</label>
						</div>
						<div className="col-75">
							<input type="password" id="password" name="password" placeholder="8-characters" />
						</div>
					</div> 
					<div className="row row_last">
						<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
					  viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
					    	<path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
					      		<animateTransform 
					        	 attributeName="transform" 
					        	 attributeType="XML" 
					        	 type="rotate"
					        	 dur="1s" 
					         	from="0 50 50"
					        	 to="360 50 50" 
					        	 repeatCount="indefinite" />
					 	 	</path>
						</svg>
						<input className= "submit_btn" type="reset" onClick={handleSignin} value="Log In" />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signin;