//This is for designing the individual card
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import video from "../assets/video.mp4"
import styled from 'styled-components'
import {IoPlayCircleSharp} from 'react-icons/io5'
import {RiThumbUpFill, RiThumbDownFill} from 'react-icons/ri'
import {BsCheck} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import {BiChevronDown} from 'react-icons/bi'
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useDispatch } from 'react-redux';
import { removeFromLikedMovies } from '../store';

///React.memo renders the function only if any of the props is changed
export default React.memo(function Card({movieData,isLiked=false}) {
    const [isHovered,setIsHovered] = useState(false);//for hovering over the card
    const [email,setEmail] = useState(undefined);
    const navigate = useNavigate();//for navigating to theplayer when we click on the card
    const dispatch = useDispatch();

    onAuthStateChanged(firebaseAuth,(currentUser)=> {//if current user exist setEmail to the email of user
        if(currentUser) setEmail(currentUser.email);
        else navigate("/login");//else navigate to login page
    })

    //adding new movie to the list
    const addToList = async () => {
        try{
            //console.log(movieData);
            await axios.post("http://localhost:5000/api/user/add", {
                  email,
                  data: movieData,
                });//saving the data in our mongodb database with email and data as movieData
        }catch(err){
            console.log(err);
        }
    }

  return (
    //if we on hover on the particular card setIsHovered true for that card and onMouseLeave set to false
    <Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* for theimage card //url from the api*/}
        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="" />
        {
            // id isHovered is true then only this div will be showed and it will be applied
            //This is done to emlarge the image when we hover on it and play the video
            isHovered && (
                <div className="hover">
                    <div className="image-video-container">
                        {/* //on click of image we go to player  */}
                        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="" 
                            onClick={()=> navigate("/player")}/>
                        <video src={video} autoPlay loop muted onClick={()=> navigate("/player")} />
                    </div>
                    <div className="info-container flex column">
                        <h3 className='name' onClick={()=> navigate("/player")}>
                            {movieData.name}
                        </h3>
                        <div className="icons flex j-between">
                            <div className="controls flex">
                                <IoPlayCircleSharp title='play' onClick={()=> navigate("/player")}/>
                                <RiThumbUpFill title='Like'/>
                                <RiThumbDownFill title='Dislike' />
                                {
                                    isLiked ? (
                                        <BsCheck title='Remove from List' 
                                        onClick={()=>dispatch((removeFromLikedMovies({movieId:movieData.id,email})))}/> ) :
                                        //on click of remove fromliked button dispatching action removeFromLikedMovies
                                        //passing movieId and email as parameter 
                                        //This action will remove the movie with given id from the liked movie list
                                        //and return the movieData array with the movie being removed from array
                                        ( <AiOutlinePlus title='Add to my list' onClick={addToList}/>
                                        // Onclick of add to liked button saving the movie to database and adding it 
                                    )
                                }
                            </div>
                            <div className="info">
                                <BiChevronDown title='More Info' />
                            </div>
                            {/* <div className="genres flex">
                                <ul className='flex column '>
                                    {movieData.genres.map((genre) => {
                                        // we dont need to write return here as only 1 statement is present
                                        //in case of multiple statements we write return
                                        return <li key={genre}>{genre}</li>
                                    })}
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            )
        }
    </Container>
  )
})
const Container = styled.div`
    max-width: 230px;
    width: 230px;
    height: 100%;
    cursor:pointer;
    position:relative;
    img{
        border-radius:0.2rem;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    .hover{
        z-index: 90;
        height: max-content;
        width: 20rem;
        position: absolute;
        top: -18vh;
        left: 0;
        border-radius:0.3rem;
        box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
        background-color: #181818;
        transition:0.3s ease-in-out;
        .image-video-container{
            position: relative;
            height: 140px;
            img{
                width: 100%;
                height: 140px;
                object-fit:cover;
                border-radius: 0.3rem;
                top:0;
                z-index: 4;
                position: absolute;
            }
            video{
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius:0.3rem;
                top:0;
                z-index: 5;
                position: absolute;
            }
        }
        .info-container{
            padding: 1rem;
            gap:0.5rem;
            .icons{
                .controls{
                    display:flex;
                    gap: 1rem;
                }
                svg{
                    font-size: 2rem;
                    cursor:pointer;
                    transition:0.3s ease-in-out;
                    &:hover{
                        color: #b8b8b8;
                    }
                }
            }
            .genres{
                ul{
                    gap: 0.5rem;
                    li{
                        padding-right:0.7rem;
                        font-size:0.8rem;
                        &:first-of-type{
                            list-style-type: none;
                        }
                    }
                }
            }
        }
    }
`