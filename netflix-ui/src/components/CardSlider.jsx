//This is for showing 1 particular slider section like trending section,action movies section,etc. We call Card here
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import styled from 'styled-components'
import Card from './Card'

export default React.memo(function CardSlider({data,title}) {
    const [showControls,setShowControls] = useState(false);
    const [sliderPosition,setSliderPosition] = useState(0);
    // In general, we want to let React handle all DOM manipulation.
    // But there are some instances where useRef can be used without causing issues.
    // In React, we can add a ref attribute to an element to access it directly in the DOM.
    const listRef = useRef();

    //func handling the left and the right movement of the slider
    const handleDirection = (direction) => {
        //we will get the current distance //we will get the width of it
        let distance = listRef.current.getBoundingClientRect().x-70;//we will get x size and decrease it by70px
        //if we have clicked left and if the slider position is greater than zero the only we want tom ove left
        //as intially sliderPosition is 0 so ntmg will happen when we click left but once we click right 
        //slider psition is increased to 1 so now when we click left we will move left 
        if(direction === "left" && sliderPosition>0){
            //move to left by 230px
            listRef.current.style.transform = `translateX(${230+distance}px)`;
            //listRef.current.style.transform = `translateX(${1150+distance}px)`;
            setSliderPosition(sliderPosition-1)
        }
        //if we have clicked right and if the slider position is greater than 4 then only we want to move right
        //as when it is greater than 4 we have already moved slider by 3 position and
        // we want to limit slider to move only 4 time to right
        if(direction === "right" && sliderPosition<4){
            listRef.current.style.transform = `translateX(${-230+distance}px)`;
            //listRef.current.style.transform = `translateX(${-1150+distance}px)`;
            setSliderPosition(sliderPosition+1)
        }
    }
  return (
    <Container className='flex column' 
    //if we hover to any of the slider section setShowControls true so that we can show left right button in it
    onMouseEnter={()=> setShowControls(true)} onMouseLeave={()=> setShowControls(false)}>
    <h1>{title}</h1>
    <div className="wrapper">
        {/* if showControls is true than only show this icons as we dont want to show left and right icon if we dont
    hover on the particular section */}
        <div className={`slider-action left ${!showControls?"none":""} flex j-center a-center`}>
            <AiOutlineLeft onClick={()=>handleDirection("left")} />
        </div>
        <div className='flex slider' ref={listRef}>
      {
        //map all the cards
        //we have got the data prop from parent destructure it here and mapped it to call all the movies
        data.map((movie,index) => {
            return <Card movieData={movie} index={index} key={movie.id}/>
        })
      }
    </div>
    {/* if showControls is true than only show this icons as we dont want to show left and right icon if we dont
    hover on the particular section */}
    <div className={`slider-action right ${!showControls?"none":""} flex j-center a-center`}>
            <AiOutlineRight onClick={()=>handleDirection("right")} />
        </div>
    </div>
    </Container>
  )
})

const Container = styled.div`
    gap:1rem;
    position:relative;
    padding:2rem 0;
    h1{
        margin-left: 50px;
    }
    .wrapper{
        .slider{
            width:max-content;
            gap:1rem;
            transform: translateX(0px);
            transition:0.3s ease-in-out;
            margin-left:50px;
        }
        .slider-action{
            position:absolute;
            z-index:99;
            height:100%;
            top:0;
            bottom:0;
            width:50px;
            transition:0.3s ease-in-out;
            svg{
                font-size:2rem;
            }
        }
        .none{
            display:none;
        }
        .left{
            left:0;
        }
        .right{
            right: 0;
        }

    }
`