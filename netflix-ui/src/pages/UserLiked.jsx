import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import NotAvailable from '../components/NotAvailable';
import {  getUserLikedMovies } from '../store';
import { firebaseAuth } from '../utils/firebase-config';

export default function UserLiked() {
    const navigate = useNavigate();

    //we pass which object we want to subscribe in the useSelector
    //we get the changed value automatically whenever the data is changed. we dont have to request it again and again
    //we pass whole state inside the useSelector and we return the state we want to subscribe
    //here we have subscribed movies in the netflix in the state
    //so whenever state of the movies array is changed it will automatically be detected amd changed in const movies

    //const movies = useSelector((state) => state.netflix.movies);
    const movies = useSelector((state) => state.netflix.likedMovie);

    const dispatch = useDispatch();//useDisptch is the hook in reduxtoolkit to dispatch action

    const[isScrolled,setIsScrolled] = useState(false);//to see if page is scrolled
    const [email,setEmail] = useState(undefined);//for the email of the user currently logged in
    //we want email of the user because in database we have stored liked movies by the email of the user
    //sowe will fetch the liked movies by the email of the user

    onAuthStateChanged(firebaseAuth,(currentUser)=> {//if current user exist setEmail to the email of user
        if(currentUser) setEmail(currentUser.email);//if user exists get its email and set it
        else navigate("/login");//else navigate to login page
    })

    useEffect(() => {
        if(email){
            dispatch(getUserLikedMovies(email))//if email exists dispatch this 
            //and we will get all the liked movies in the {movies}
        }
    },[email]);//dispatch everytime email is changed

    window.onscroll = () => {//whenever we scroll thw page we have registered event listener if page scroll height 
        //is more than zero then we set isScrolled to true
        setIsScrolled(window.pageYOffset===0?false:true);
        return () => (window.onscroll=null);//this is going to be a function
    }

  return (
    <Container>
      <Navbar isScrolled={isScrolled}/>
      <div className="content flex column">
            <h1>My List</h1>
            <div className="grid flex">
                {
                movies.length ?
                    movies.map((movie,index) => {//mapping of all the liked movies as movies array contains all the liked mov
                    return <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
                })
                :<NotAvailable />}
             
            </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
    .content{
        margin: 2.3rem;
        margin-top: 8rem;
        gap: 3rem;
        h1{
            margin-left:3rem;
        }
        .grid{
            flex-wrap:wrap;
            gap:1rem;
        }
    }
`