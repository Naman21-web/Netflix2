//This page is for signing up of the new user
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import styled from "styled-components"
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";

export default function Signup(){
    const navigate = useNavigate();//for navigating to a particular page
    const [showPassword,setShowPassword] = useState(false); //state used for showing (pasword or get started) button
    //if it is true then password section will be showed else getstarted button will be shown
    const [formValues,setFormValues] = useState({//form for maintaining the values
        //This is used for getting the values of email and password entered by the user which is then destructured(used)
    //by the handleSignIn func to create new user 
        email:"",
        password:"",
    })

    //handler to handle the sign in
    const handleSignIn = async () => {
        try{
            const {email,password} = formValues;//destructuring email and password from formvalues 
            //i.e.,taking email and password from formvalues in email and password 
            await createUserWithEmailAndPassword(firebaseAuth,email,password);
            //adding username and password in our firebase
            //authenticating username and password with firebase
            //createUserWithEmailAndPassword is inbuilt func in firebaseAuth to create new user
            //firebaseAuth is imported fromfirebase-config which is thepointing of our app
            //we have created firebaseAuth function
        }catch(err){
            console.log(err);//if it catches any error
        }
    };

    //as soon as our auth state is changed //This hook is provided by firebase(firebase inbuilt hook)
    onAuthStateChanged(firebaseAuth,(currentUser)=> {//if current user exist navigate to home page
        if(currentUser) navigate("/")
    })

    return (
        //we passed showPassword prop inside the container which it will use to see if showPassword is true or false
        //if it is true then password field is shown else getStarted button is shown
         <Container showPassword={showPassword}>
            <BackgroundImage />
            <div className="content">
            <Header login/>
            <div className="body flex column a-center j-center">
                <div className="text flex column">
                    <h1>Unlimites movies, TV shows and more</h1>
                    <h4>Watch anywhere. Cancel anytime.</h4>
                    <h6>Ready to watch? Enter your email to create or restart membership</h6>
                </div>
                <div className="form">
                    <input type="email" placeholder="Email Address" name="email" value={formValues.email} 
                    onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})}/>
                    {/* here we are changing only name rest things remain same i.e.,password remain same */}
                    {/* grab event object ,set form value and destructure the current form value. 
                    e.target.name is email and set email as value of input*/}
                    {
                        showPassword && <input type="password" placeholder="Password" name="password" value={formValues.password}
                        onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})}/>
                        //if showPassword true them show this input
                    }
                    {
                        !showPassword && <button onClick={() => setShowPassword(true)}>Get Started</button>
                        //if showpassword false then show this button and 
                        //on click of that button set showpassword to true and our password input will be shown
                    }
                </div>
                {/* on clicking the button handleSignIn func will be called which will add new user to the firebase */}
                <button onClick={handleSignIn}>Sign Up</button>
            </div>
            </div>
        </Container>
    )
};

//for styling the page
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
        .body{
            gap:1rem;
            .text{
                gap:1rem;
                text-align:center;
                font-size:1.67rem;
                h1{
                    padding:0 20rem;
                }
            }
            .form{
                display: grid;
                grid-template-columns: ${({showPassword})=>showPassword ? "1fr 1fr":"2fr 1fr"};//if showpassword true "1fr 1fr" else "2fr 1fr"             
                width: 60%;
                input{
                    color: black;
                    border: none;
                    padding: 1.2rem;
                    font-size: 1rem;
                    border: 1px solid black;
                    &:focus{
                        outline: none;
                    }
                }
                button{
                    padding: 0.4rem 1rem;
                    background-color: #e50914;
                    border: none;
                    cursor:pointer;
                    color:white;
                    font-weight: bolder;
                    font-size: 1rem;
                }
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
`;