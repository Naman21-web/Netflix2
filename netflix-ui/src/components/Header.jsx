//This is the header component
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png"

export default function Header(props){
    const navigate = useNavigate();
    return <Container className="flex a-center j-between">
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        {/* if login navigate to login page else navigate to signup page */}
        <button onClick={()=>navigate(props.login?"/login":"/signup")}>
            {/* if login show login text else show signup text */}
            {props.login ? "Log In" :"Sign In"}
        </button>
    </Container>
};

//styling of the header
const Container = styled.div`
    padding:0 4rem;
    .logo{
        img{
            height:5rem;
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
`;