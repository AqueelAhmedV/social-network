import {useState,useEffect} from 'react'
import axios from 'axios'



const Newpost = (props) => {
	const [content,setContent]=useState('');

	const [currentUser,setCurrentUser]=useState('');

	axios.get('/api/users/current', {
		headers: {
			authorization: localStorage.getItem('token')
		}
	})
	.then(res=>{
		setCurrentUser(res.data);
	})
	.catch(err=>{
		window.history.pushState({},'/Signin');

	})

	return (
		<div className="new-post-box">
		
		<div className="new-post">
		<div className="new-post-middle">
			<textarea id="inputbox" className="new-post-content" placeholder={"Post publicly as "+currentUser.name} onInput={(e) => setContent(e.target.value)}/>

			<button id="share-btn" className="new-post-btn" 
			onClick={()=>props.handleNewpost(content,setContent)}>

			{"Share"}
			</button>
			</div>
		</div>
		</div>
	);
};




const Post = (props) => {
	const [likes,setLikes] = useState(props.likes);
	
	

	return (
		<div className="post" key={props.id} id={props.id}>
			
				<div className="post-head">
					<span className="post-head-left">
						<h5>{/*postUser.name*/}</h5>
					</span>
					<button className="del-btn" onClick={()=>props.handleDelete(props.id)}>
						{"Delete"}
					</button>
					{(!props.editMode)?<button className="edit-btn" onClick={()=>props.handleEdit(props.id)}>
						{"Edit"}
					</button>:''}
				</div>
				<div className="post-content">
					{props.content}
				</div>
				<div className="post-foot">
					<button className="like-btn" onClick={() => setLikes(likes+1)}>
						&#128402;{' '+likes.toString()+((likes===1)?" Like":" Likes")}
					</button>
					<button className="dislike-btn">
					&#128403;
					</button>
				</div>
			</div>
	);
}


const PostList = (props) => {
	
	const [posts,setPosts] = useState([]);
	const [length,setLength] = useState(posts.length);
	const [editMode,setEditMode] = useState(false);
	var alertBox = null;
	const currentUser = props.currentUser;

	useEffect(()=>{
		const alert = document.getElementById('alert');
		alertBox = alert;
		setTimeout(()=>alertBox.innerHTML = "",6000);
	});

	const handleNewpost = (content,setContent) => {
		const inputBox = document.getElementById('inputbox');

		alertBox.innerHTML = (!editMode)?((content)?"New post added":"Type something"):"Post edited";
		alertBox.style = (editMode)?"color:blue":"color:green";
		setEditMode(false);
		
		if((inputBox.value)){
			setContent(inputBox.value);
			content = inputBox.value;
		}
		inputBox.value = '';
		document.getElementById('share-btn').innerHTML = "Share";

		const newPost = {
			body:{
				text: content,
				name: currentUser.name,
			},
			likes: [],
			user: currentUser,
			
		};

		if(content){
			posts.unshift(newPost);
			axios.post('/api/posts', newPost)
				.then((res)=>{
					alert(res.data+"here");
				})
				.catch(err=>alert(err+" postError"));
			setContent(content);
		}
		setLength(posts.length);
		setPosts(posts);
		setContent('');
	}



	function handleEdit(id){
		const inputBox = document.getElementById('inputbox');
		const shareBtn = document.getElementById('share-btn');
		setEditMode(true);
		const edit = posts.filter((post)=>post.id===id)[0];
		inputBox.value = edit.content;
		inputBox.focus();
		shareBtn.innerHTML = "Edit";
		handleDelete(id); 
	}



	function handleDelete(id){
		const newPosts = posts.filter((post)=>post.id!==id);
		setPosts(newPosts);
		setLength(newPosts.length);
		alertBox.innerHTML = "Post deleted";
		alertBox.style = "color:red";
	}

	axios.get('/api/posts')
		.then(res=>alert(res.data+" getPostSuccess"))
		.catch(err=>alert(err.data+" getPostError"));

	return (
		<div className="post-list">
			<div className="alert-box">
				<span id="alert" ></span>
			</div>
			<Newpost handleNewpost={handleNewpost}/>
			<hr style={{marginTop: "5vh", width: "95%"}}/>

			{(length!==0)?posts.map((post,i) => (
				<Post editMode={editMode} content={post.text} likes={post.likes.length} id={i} handleDelete={handleDelete} handleEdit={handleEdit} />
			)):<div className="no-posts"><span>No Posts Yet</span></div>}
			</div>
		);
}

export {Newpost,PostList};
