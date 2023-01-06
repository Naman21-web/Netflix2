//This is for calling all the pages and this App.jsx is called inside index.js
import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";
import UserLiked from "./pages/UserLiked";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        {/* path is same as given in the navbar page array that we created */}
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/signup" element={<Signup />}/>
        <Route exact path="player" element={<Player />}/>
        <Route exact path="/movies" element={<Movies />}/>
        <Route exact path="/tv" element={<TVShows />}/>
        <Route exact path="mylist" element={<UserLiked />}/>
        <Route exact path="/" element={<Netflix />}/>
      </Routes>
    </BrowserRouter>
  );
}