const User = require("../models/UserModel");

//For getting the liked movies
module.exports.getLikedMovies = async (req, res) => {
  try {
    //get email from the params
    const { email } = req.params;
    //find user with the given email
    const user = await await User.findOne({ email });
    //if user exists
    if (user) {
        //show all liked movies of the user
      return res.json({ msg: "success", movies: user.likedMovies });
    }
    //If user doesnt exist show error
     else return res.json({ msg: "User with given email not found." });
  } catch (error) {//if any error occours
    return res.json({ msg: "Error fetching movies." });
  }
};

//For adding new movie to liked
module.exports.addToLikedMovies = async (req, res) => {
  try {
    //get email and data from the body
    //Here we have included data too because we want to modify the data and add new movie to data
    const { email, data } = req.body;
    //find the user with the email
    const user = await await User.findOne({ email });
    if (user) {//if user exists
        //get likedmovies of the user
      const { likedMovies } = user;
      //see if movie alredy liked by finding that the id we got from the data(i.r., id of the movie we want to add)
      // match with any of the liked movie id
      //if id matched that means movie already exist in the liked movie as every movie has unique id
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      //if id doesnt match
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(//find the user by the id and update 
          user._id,//finding user by the id of the user with the given email
          {
            likedMovies: [...user.likedMovies, data],//adding new data tothe likedmovie array
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });//if movie already present
    } else await User.create({ email, likedMovies: [data] });//if user doesnt exist create the user 
    //and adding movie to liked movie array
    //when the user with given email address like movie first time then the user doesnt exist in gthe database
    //so we create new user and the movie to movie array as only that movie(1 movie) will be present in liked movie
    //so we dont write like [...user.likedMovies, data] this
    return res.json({ msg: "Movie successfully added to liked list." });//return if user added
  } catch (error) {//if catch any error
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;//request email and movieId from body
    const user = await User.findOne({ email });//find user with that email
    if (user) {//if user exist
      const movies = user.likedMovies;//get all the liked movies
      const movieIndex = movies.findIndex(({ id }) => id === movieId);//find the index of movie to be deleted in array
      if (!movieIndex) {//if index not found that means movie doesnt exist in likedmovies
        res.status(400).send({ msg: "Movie not found." });
      }//else remove the movie with index
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(//now updating the liked movies after removing the given movie
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};