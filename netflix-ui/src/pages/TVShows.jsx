//This page is for loading all the tvshows and also loading shows by the genres 
//we have just changes the type from movie to tv in the movies.jsx
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';
import Slider from '../components/Slider';
import { fetchMovies, getGenres } from '../store';
import { firebaseAuth } from '../utils/firebase-config';

export default function TVShows() {
    const navigate = useNavigate();

    //we pass which object we want to subscribe in the useSelector
    //we get the changed value automatically whenever the data is changed. we dont have to request it again and again
    //we pass whole state inside the useSelector and we return the state we want to subscribe
    //here we have subscribed genresLoaded in the netflix reducer in the state
    const genresLoaded = useSelector((state)=> state.netflix.genresLoaded);
    //here we have subscribed movies in the netflix in the state
    const movies = useSelector((state) => state.netflix.movies);
    //here we have subscribed genres in the netflix in the state
    const genres = useSelector((state) => state.netflix.genres);

    const[isScrolled,setIsScrolled] = useState(false);//to see if page is scrolled

    const dispatch = useDispatch();//useDisptch is the hook in reduxtoolkit to dispatch action

    useEffect(() => {
        //we dispatched the getGenres action that we created in store when the page is first time loaded
        dispatch(getGenres());
    },[]);

    useEffect(() => {
        //if genres isloaded dispatch the fetchMovies 
        //if we want tochange the store we have to dispatch the action
        if(genresLoaded) dispatch(fetchMovies({type:"tv"}));
    },[genresLoaded]);//we dispatch it everytime genres is loaded

    window.onscroll = () => {//whenever we scroll thw page we have registered event listener if page scroll height 
        //is more than zero then we set isScrolled to true
        setIsScrolled(window.pageYOffset===0?false:true);
        return () => (window.onscroll=null);//this is going to be a function
    }

    onAuthStateChanged(firebaseAuth,(currentUser)=> {//if current user exist navigate to home page
        // if(currentUser) navigate("/")
    })
  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={isScrolled} />
        </div>
        <div className="data">
        {/* Pass genres as the prop and type as the movie */}
        <SelectGenre genres={genres} type="tv"/>
            {
                // If movies with particular genre exist showSlider with  all that genres moviesmovies 
                //and if movies not available show NotAvailable
                movies.length ? <Slider movies={movies}/> :
                <NotAvailable />
            }
        </div>
    </Container>
  )
}

const Container = styled.div`
    .data{
        margin-top:8rem;
        .not-available{
            text-align:center;
            color:white;
            margin-top:4rem;

        }
    }
`