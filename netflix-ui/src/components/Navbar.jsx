//This is the navbar component
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import {FaPowerOff, FaSearch} from 'react-icons/fa';
import { useDispatch } from 'react-redux';

//propis always destructured using the curly braces
export default function Navbar({isScrolled}) {//destructuring isScrolled prop which we passed in the parent page
  const dispatch = useDispatch();
    const navigate = useNavigate();//to navigate to a page
    const links = [
        {name:"Home",link:"/"},
        {name:"TV Shows",link:"/tv"},
        {name:"Movies",link:"/movies"},
        {name:"My List",link:"/mylist"}
    ];//links array to link to a aprticular pageon clicking it

    const [showSearch,setShowSearch] = useState(false);//to show search div 
    //i.e.,input field when we click on search button
    const [inputHover,setInputHover] = useState(false);//whenever we hover in a search div set it to true

    //if state is changed of currentuser
    onAuthStateChanged(firebaseAuth,(currentUser)=> {//if current user doesnot exist navigate to login page
        if(!currentUser) navigate("/login")
    })
    
  return (
    <Container>
      {/* if isScrolled true add scrolled class else nthng in nav */}
      {/* In scrolled class we change the navbar background color from transparent to black
      so that whenever we scroll down navbar background coloris changed to black 
      else isScrolled is false and background color is transparent */}
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
            <div className="brand flex a-center j-center">
                <img src={logo} alt="" />
            </div>
            <ul className="links flex">
                {
                  //we use links array and map it. We destructure the name and link from the array
                  //If we have not destructured link and name then we could simply pass link(or any other name) inside
                  //the map and call link.name and link.link
                  //map will add all the elements in the links array in the ul one by one
                  //to destructure anything inreact we have to wrap it inside the curly braces
                    links.map(({name,link})=>{//wrapping name and link inside curly braces is important to destructure it
                        return (
                          //in mapping we have to pass unique key to each eement so we used its name as key
                          //"to" will direct it to link address we provided to it when we click on link
                        <li key={name}><Link to={link}>{name}</Link></li>
                        );
                    })
                }
            </ul>
        </div>
        <div className="right flex a-center">
            {/* if showSearch true add show-search class else nthng in nav*/}
             <div className={`search ${showSearch?"show-search":""}`}> 
                {/* on clicking button setting show search to true so that we can get search container and 
                on leaving it if inputHover is not false setting it to false */}
                 <button onFocus={()=>setShowSearch(true)} 
                    onBlur={() => {if(!inputHover) setShowSearch(false)}}>
                        <FaSearch />
                </button> 
                {/* on placing mouse on input field setInputHover to true that means we want to hover on input
                or write something on input  */}
                {/* on leaving mouse we dont want to hover input it so set false*/}
                {/* if not focused on input that means we dont want to write something in it or searh so we set both to false*/}
                 <input type="text" 
                       placeholder='Search' 
                       onMouseEnter={() => setInputHover(true)}
                       onMouseLeave={() => setInputHover(false)}
                       onBlur={()=> {
                            setShowSearch(false); 
                            setInputHover(false);
                        }
                      }
                      // onChange={(e) => dispatch(fetchSearch({search:e.target.value}))}
                     // onChange={(e) => setValue(e.target.value)}
                />
            </div>  
            {/* on clicking the button signout the user. signout is inbuilt func in firebaseAuth */}
            <button onClick={()=> signOut(firebaseAuth)}>
                <FaPowerOff />
            </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
.scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 3.7rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 1.8rem;
      .brand {
        img {
          height: 3.7rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 1.8rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1.2rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1rem;
        }
      }
      .search {
        display: flex;
        gap: 0.35rem;
        align-items: center;
        justify-content: center;
        padding: 0.17rem;
        padding-left: 0.43rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.05rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
