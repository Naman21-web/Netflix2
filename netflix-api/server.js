const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

//use express
const app = express();

//use cors
app.use(cors());
//use json
app.use(express.json());

//connect to mongoose database //database will be created with the name netflix
mongoose
  .connect("mongodb://localhost:27017/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })//if database connected successfully
  .then(() => {
    console.log("DB Connetion Successfull");
  })//if any error occoured
  .catch((err) => {
    console.log(err.message);
  });

//use "/api/user" this link to use the routes
app.use("/api/user", userRoutes);

//server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});

//we can get data in frontend using the link 
// "http://localhost:5000/api/user/add"
// ""http://localhost:5000" this link is for the port
// we added "/api/user" after it because we have used this as route
// we have created 3 routes in userRoutes so after that we wiil add any of the 3 link to use respective route in frontend
// "http://localhost:5000/api/user/add" for adding new movie
// "http://localhost:5000/api/user/remove" for removing the movie
// "http://localhost:5000/api/user/liked/:email" for getting all the liked movies