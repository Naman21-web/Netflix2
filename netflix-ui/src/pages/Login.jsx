//this page is for login
import {  onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import styled from "styled-components"
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";

export default function Login(){
    const navigate = useNavigate();
    //const [showPassword,setShowPassword] = useState(false);
    //we have create a new state with object type containig email and password initially empty
    const [formValues,setFormValues] = useState({
        email:"",
        password:"",
    })

    //for handling the login we created a func
    const handleLogIn = async () => {
        try{
            const {email,password} = formValues;//destructuring email and password from formvalues i
            //.e.,taking email and password from formvalues in email and password 
            await signInWithEmailAndPassword(firebaseAuth,email,password);
            //signing in with username and password from our firebase
            //signInWithEmailAndPassword is function in firebaseAuth which is inbuilt
        }catch(err){
            console.log(err);//if it catches any error console the error
        }
    };

    //as soon as our auth state is changed 
    onAuthStateChanged(firebaseAuth,(currentUser)=> {//if current user exist navigate to home page
        if(currentUser) navigate("/")
    })

    //designing the login page
    return (
         <Container>
            {/* It contains the background image */}
            <BackgroundImage />
            <div className="content">
                <Header />
                <div className="form-container flex column a-center j-center">
                    <div className="form flex column a-center j-center">
                        <div className="title">
                            <h3>Login</h3>
                        </div>
                        <div className="container flex column">
                        <input type="email" placeholder="Email Address" name="email" value={formValues.email} 
                            onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})}/>
                            {/* grab event object set form value and destructure the current form value. 
                            e.target.name is email and set email as value of input*/}
                    
                        <input type="password" placeholder="Password" name="password" value={formValues.password}
                            onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})}/>
                    
                            {/* If we clicked on login button call func handleLogin
                            which will check the details using firebase auth andlog in if details ae correct */}
                            {/* Here we dont have passed theemailand password inside the handlelogin func 
                            it takes it from the state formValues in the func  */}
                        <button onClick={handleLogIn}>LogIn</button>
                    
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
};

//styling the login page

const Container = styled.div`
    position:relative;
    .content{
        position:absolute;
        top:0;
        left:0;
        background-color:rgba(0,0,0,0.5);
        height:100vh;
        width:100vw;
        display:grid;
        grid-template-rows:15vh 85vh;
        .form-container{
            gap: 1.75rem;
            height: 85vh;
            .form{
                padding:2rem;
                background-color:#000000b0;
                width: 25vw;
                gap: 1.8rem;
                color:white;
                .container{
                    gap:1.8rem;
                    input{
                        padding: 0.43rem 0.87rem;
                        width: 13rem;
                    }
                    button{
                        padding: 0.4rem 1rem;
                        background-color: #e50914;
                        border: none;
                        cursor:pointer;
                        color:white;
                        border-radius:0.2rem;
                        font-weight: bolder;
                        font-size: 1rem;
                    }
                }
            }
        }
    }
`;