//This is the home page of Netflix
import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import {AiOutlineInfoCircle} from "react-icons/ai"
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";

export default function Netflix(){
    const navigate = useNavigate();//To navigate to a page

    //we pass which object we want to subscribe in the useSelector
    //we get the changed value automatically whenever the data is changed. we dont have to request it again and again
    //we pass whole state inside the useSelector and we return the state we want to subscribe
    //here we have subscribed genresLoaded in the netflix reducer in the state
    const genresLoaded = useSelector((state)=> state.netflix.genresLoaded);
    //here we have subscribed movies in the netflix in the state
    const movies = useSelector((state) => state.netflix.movies);

    const[isScrolled,setIsScrolled] = useState(false);//to see if page is scrolled

    const dispatch = useDispatch();//useDisptch is the hook in reduxtoolkit to dispatch action

    useEffect(() => {
        //we dispatched the getGenres action that we created in store when the page is first time loaded
        dispatch(getGenres());
        //Now after dispatching getGenres, genres array is filled and isGenresLoaded becomes true
        //in the netflix slice that we have created 
        //when isGenresLoaded becomes true, it is detected by our useSelector as we have subscribed it and 
        //genresLoaded also become true;
    },[]);

    useEffect(() => {
        //if genres isloaded dispatch the fetchMovies 
        //if we want to change the store we have to dispatch the action
        if(genresLoaded) dispatch(fetchMovies({type:"all"}));
        //When fetchMovies is dispatched,movies array in the netflix slice becomes filled
        //As we have subscribed to the movies state of netflix slice by useSelector so when movies array is filled
        //it is detected that movies array is changed (i.e.,store is changed) and
        //Then we got the data in the movies (movies is the name by which we have subscribed the state)

    },[genresLoaded]);//whenever genresLoaded is changed we dispatch the func

    window.onscroll = () => {//whenever we scroll thw page we have registered event listener if page scroll height 
        //is more than zero then we set isScrolled to true
        setIsScrolled(window.pageYOffset===0?false:true);
        return () => (window.onscroll=null);//this is going to be a function
    }

    return (<Container>
        {/* we passes isScrolled prop inside the Navbar we can destructure it in navbar component*/}
        {/* so whenever our page is scrolled isScrolled is set true and when it is true navbar adds scrolled class in it
         due towhich navbar backgrouncolour changes from transparent to black*/}
        <Navbar isScrolled={isScrolled}/>
        <div className="hero">
            <img src={backgroundImage} alt="background" className="background-image" />
            <div className="container">
                <div className="logo">
                    <img src={MovieLogo} alt="movielogo" />
                </div>
                <div className="buttons flex">
                    <button className="flex j-center a-center" onClick={() => navigate("/player")}><FaPlay /> Play</button>
                    <button className="flex j-center a-center"><AiOutlineInfoCircle /> More Info</button>
                </div>
            </div>
        </div>
        {/* Slider to show movies which we got from the api by the useSeelector */}
        {/* we pass movies as a prop inside the Slider which we will destructure in the Slider.jsx 
        and use it to show movies */}
        <Slider movies={movies}/>
    </Container>)
};

const Container = styled.div`
    background-color:black;
    .hero{
        position:relative;
        .background-image{
            filter: brightness(60%);
        }
        img{
            height:100vh;
            width:100vw;
        }
        .container{
            position:absolute;
            bottom:5rem;
            .logo{
                img{
                    width:100%;
                    height:100%;
                    margin-left:5rem;
                }
            }
            .buttons{
                margin: 5rem;
                gap: 2rem;
                button{
                    font-size:1.4rem;
                    gap: 1rem;
                    border-radius:0.2rem;
                    padding: 0.5rem;
                    padding-left: 2rem;
                    padding-right: 2.4rem;
                    border:none;
                    cursor:pointer;
                    transition: 0.3s ease-in-out;
                    &:hover{
                        opacity: 0.8;
                    }
                    &:nth-of-type(2){
                        background-color: rgba(109,109,110,0.7);
                        color:white;
                        svg{
                            font-size:1.8rem;
                        }
                    }
                }
            }
        }
    }
`;