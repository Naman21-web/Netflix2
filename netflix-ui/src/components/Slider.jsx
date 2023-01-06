//This component is for calling CardSlider //we create multiple slider here
import React from 'react'
import CardSlider from './CardSlider'

export default React.memo(function Slider({movies}) {
    const getMoviesFromRange = (from,to) =>{
        return movies.slice(from,to);
    }
  return (
    <div>
        {/* //we have created a card.jsx to design the individual cards and we have mapped all the 
        individual cards of a particular section inside the cardSlider with the help of data here 
        //and we have called the slider here and passed props data to provide themovies
        //here we have created the multipleslider
        //we can create more slider by adding more CardSlider here */}

      <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)}/>
      <CardSlider title="New Releases" data={getMoviesFromRange(10,20)}/>
      <CardSlider title="Blockbusters" data={getMoviesFromRange(20,30)}/>
      <CardSlider title="Popular on Netflix" data={getMoviesFromRange(30,40)}/>
      <CardSlider title="Action" data={getMoviesFromRange(40,50)}/>
      <CardSlider title="Epics" data={getMoviesFromRange(50,60)}/>
    </div>
  )
})