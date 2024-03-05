import React, { useState , useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import FireBaseContext from '../../Context/FireBaseContext';
import Swal from 'sweetalert2';


export default function Signup() {
    // links
    const history = useNavigate();

    //Hooks
    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [phone , setPhone] = useState("")
    const [ password, setPassword] = useState("")
    const {FireBaseApp} = useContext(FireBaseContext)

    // validation
    const email_check = new RegExp(/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/);
    const phone_check = new RegExp(/^\d{10}$/);
    const password_check = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

    
    const handleRoute = () =>{
      history('/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
          const methods = await FireBaseApp.auth().fetchSignInMethodsForEmail(email);
          console.log(methods)
          if (methods.length > 0) {
              Swal.fire({
                  title: "The Internet?",
                  text: "Email is already in use. If you have an account, please login or reset your password.",
                  icon: "question"
              });
              return;
          }
      } catch (error) {
          console.error('Error checking email availability:', error.message);
          Swal.fire({
              title: "The Internet?",
              text: "Error checking email availability",
              icon: "question"
          });
          return;
      }


        // validation
        if(username.trim() === ""){
          Swal.fire({
            title: "The Internet?",
            text: "Must have Username",
            icon: "question"
          });
          return 
        }
        if(email.trim() === ""){
          Swal.fire({
            title: "The Internet?",
            text: "Must have email",
            icon: "question"
          });
          return 
        }
        if(phone.trim() === ""){
          Swal.fire({
            title: "The Internet?",
            text: "Must have Phone number",
            icon: "question"
          });
          return 
        }

        if(!phone_check.test(phone)){
          Swal.fire({
            title: "The Internet?",
            text: "Must have contain 10 nuramic",
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


        if (!email_check.test(email)){
          Swal.fire({
            title: "The Internet?",
            text: "Strong Email",
            icon: "question"
          });
          return 
        }

        if(!password_check.test(password)){
          Swal.fire({
            title: "The Internet?",
            text: "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters",
            icon: "question"
          });
          return  
        }

        
        FireBaseApp.auth().createUserWithEmailAndPassword(email,password).then((result) =>{
          result.user.updateProfile({displayName:username}).then(() => {
            console.log('username and email');
            FireBaseApp.firestore().collection('users').add({
              id:result.user.uid,
              username:username,
              phone:phone
            })
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully Created Acoount",
              showConfirmButton: false,
              timer: 1500
            });
            history('/login')
          });
        }).catch((error) => {
          console.log("the error message is the",error.message);
          Swal.fire({
            title: "The Internet?",
            text: "Error creating user",
            icon: "question"
        });
        })
    }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <button onClick={handleRoute} type='submit'>Login</button>
      </div>
    </div>
  );
}
