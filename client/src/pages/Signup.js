
import {useEffect} from 'react'

import axios from 'axios'


const Signup = () => {
	var msgBox = null;
	useEffect(()=>{
		const msg = document.getElementById('msg');
		msgBox = msg;
	});

	function handleSignup(){
		const svg = document.getElementById("L9");
		const Ids = ["name","email","password","conf-password"];
		const mail_format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		var allFieldsFilled = true;
		var passMatch = false;
		var phoneValid = false;
		const phone_format = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
		const emailBox = document.getElementById('email');

		var emailValid = (mail_format).test(emailBox.value);
		const nameBox = document.getElementById("name");
		const phoneBox = document.getElementById("phone-no");
		const passBox = document.getElementById('password');
		const confPassBox = document.getElementById('conf-password');

		Ids.forEach((id)=>{
			if(!document.getElementById(id).value){
				allFieldsFilled = false;
			}
		});

		if(confPassBox.value===passBox.value){
			passMatch = true;
		}

		if(allFieldsFilled&&phoneBox.value){
			if(phone_format.test(phoneBox.value)){
				phoneValid = true;
			}
		}
		else if(allFieldsFilled&&(!phoneBox.value)) {
			phoneValid = true;
		} 

		function success(){ 
			svg.style = "display:block";
			return "";			
		}


		msgBox.innerHTML = (allFieldsFilled)?((emailValid)?((passMatch)?((phoneValid)?success():"Enter valid Phone No."):"Passwords do not match"):"Enter valid Email ID"):"Please fill in all required (*) fields";
		msgBox.style = (passMatch&&allFieldsFilled&&(emailValid))?((phoneValid)?"color:green":"color:red"):"color:red";

		const newUser = {
			name: nameBox.value,
			email: emailBox.value,
			phone: phoneBox.value,
			password: passBox.value
		};

		if(emailValid&&allFieldsFilled&&passMatch) {
			axios.post('/api/users/signup', newUser)
				.then(()=>setTimeout(() => {
						msgBox.innerHTML = "Account Created Successfully";
						svg.style = "display:none";
						setTimeout(()=>msgBox.innerHTML="",6000);
					},3000))
				.catch(err=>{
					setTimeout(() => {
						svg.style = "display:none;";
						msgBox.style="color:red"
						msgBox.innerHTML = "User already exists";
						setTimeout(()=>msgBox.innerHTML="",6000);
					},3000);

				});
		}


		
	}

	return (<div className="sign-up">
			<div className="form_head">
				<span className="form_head_main">Join us</span>
				<span className="form_head_sub">Create An Account</span>
			</div>
			<div className="form_box">
				<div className="msg-box">
					<span id="msg"></span>
				</div>
				<form id="review_form" action="">
					<div className="row">
						<div className="col-25">
							<label for="name">Name *</label>
						</div>
						<div className="col-75">
       					 	<input type="text" id="name" name="name" placeholder="Your name" />
      					</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label for="email">Email ID *</label>
						</div>
						<div className="col-75">
							<input type="email" id="email" placeholder="example@email.com" />
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label for="phone-no">Phone Number</label>
						</div>
						<div className="col-75">
							<input type="text" id="phone-no" name="phone-no" placeholder="1234567890" />
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label for="password">Your Password *</label>
						</div>
						<div className="col-75">
							<input type="password" id="password" name="password" placeholder="8-characters" />
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label for="conf-password">Confirm Password *</label>
						</div>
						<div className="col-75">
							<input type="password" id="conf-password" name="conf-password" placeholder="Re-enter your password" />
						</div>
					</div>  
					<div className="row_last"> 
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
						<input className= "submit_btn" type="reset" onClick={handleSignup} value="Create Account" />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;