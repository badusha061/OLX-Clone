import React  , {useState , useContext} from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import FireBaseContext from '../../Context/FireBaseContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Login() {
  const history = useNavigate()
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const {FireBaseApp} = useContext(FireBaseContext)


  const handleRoute = () => {
    history('/signup')
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email.trim() === ""){
      Swal.fire({
        title: "The Internet?",
        text: "Must have Email",
        icon: "question"
      });
      return 
    }

    const email_check = new RegExp(/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/);
    if(!email_check.test(email)){
      Swal.fire({
        title: "The Internet?",
        text: "Strong Email",
        icon: "question"
      });
      return 
    }



    if(password.trim() === ""){
      Swal.fire({
        title: "The Internet?",
        text: "Must have Password",
        icon: "question"
      });
      return 
    }
    const password_check = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    if(!password_check.test(password)){
      Swal.fire({
        title: "The Internet?",
        text: "Strong Password",
        icon: "question"
      });
      return 
    } 

    FireBaseApp.auth().signInWithEmailAndPassword(email , password).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Are Successfully Logged",
        showConfirmButton: false,
        timer: 1500
      });
      history('/')
    }).catch((error) => {
      console.log(error.message)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Credintial!",
        });
      return 
    } )
  } 
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <button onClick={handleRoute}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Login;
