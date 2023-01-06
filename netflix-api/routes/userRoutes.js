const {
    addToLikedMovies,
    getLikedMovies,
    removeFromLikedMovies,
  } = require("../controllers/UserController");
  
  const router = require("express").Router();
  
  //creating the routes

  //when get request is made from the frontend with given link then getLikedMovies module will be implemented
  //and we will get all liked movies in frontend
  router.get("/liked/:email", getLikedMovies);
  //when post request is made from the frontend with given link then addToLikedMovies module will be implemented
  //and we will add new liked movie in the liked movies array in database
  router.post("/add", addToLikedMovies);
  //when put request is made from the frontend with given link then removeFromLikedMovies module will be implemented
  //and given movie will be deleted from the liked movies array in database
  router.put("/remove", removeFromLikedMovies);
  
  //export the router
  module.exports = router;
  