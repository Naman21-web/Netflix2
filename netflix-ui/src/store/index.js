//setup of redux store(redux toolkit setup)
//https://redux-toolkit.js.org/introduction/getting-started contains the details of each func used here

//First we have created the new redux store slice named NetflixSlice
//we have initialed empty array in it which contain the things which we want to add in slice and give its name as netfilx
//then we have configured the store and wehave passed property reducer inside it as  and pass our reducer named as netflix
//we can get this slice by the name netflix wherever we 
//In the netflix slice we contain 4 things or states i.e., movies array,genres array,bool isGenresLoaded,likedMovie

//Now we have create 5 thunks that will fetch data which is getGenres, fetchMovies, fetchDataByGenres, getUserLikedMovie,
//removeFromLikedMovie

//We have used getGenres as we have to get all the genres to use it in page to load movies and series by genres
//and thatswhy we also have created a state "genres"

//We have used fetchMovies as we want to fetch all the movies and series in the home section 
//and thatswhy we have created state "movies" which is array to get all movies
//We have used fetch movies with a parameter type as we want to fetch only movies and series in the movies and series page
//In homepage we have passed type as "all" as we want both movies and series in home page
//In movies and series page we have passed type as tv and movie resp to fetch only movie and series

//we have created fetchDataByGenres so that we can fetch th emovies and series by the genres 
//that we have selected in the movies and series pages
//this fetched movies will be stored in state "movies"
//here we need to note that "movies" state will contain only one of the thunkapi
//If we will load by genres then it will contain fetchDataByGenres data else it will contain fetchMovies data

//We have created usrlikedMovie to get all the liked movies by the user
//this fetched movie will be stored in userLiked array state of netflix slice

//We have created removeFromLikedMovies to remove a movie from likedMovie
//this fetched movie will be stored in likedMovie array
//now likedMovie array contain remaining movies after deletin this particular movie

//Now we will add extraReducer in the slice which have parameter builder which add cases
//we have added 5 cases for the 5 thunks which we have created
//thunk will be fulfilled when we dispatch the func of that thunk in the page i.r., Netfilx,Movies,etc page
//and then data will be stored in the particular state that we have added in in the reducer
//and we can get that data in the page by using that state

//First thunk is for loading the genres so we have added case for it
//when first thunk is dispatched in the main page it is then fulfilled
//When the first thunk is fulfilled which means we got the data i.e.,all the genres in the data in getGenres
//so we put it in netflix slice state "genres" and also do state "genresLoaded" to true

//Second thunk is for fetching the movies and series so we have added case for it
//when second thunk is dispatched in the page it is then fulfilled
//When the thunk is fulfilled which means we have got the data (i.e., movies and series) in fetchMovies
//so we put it in netflix slice state "movies" 

//Third thunk is for fetching the movies and series by the genres so we have added case for it
//when third thunk is dispatched in the page it is then fulfilled
//When the thunk is fulfilled which means we have got the data (i.e.,movies by genre we have selected in movies pages
// or series by the genre we have selected in the series page) in the fetchDataByGenre
//so we put that data in netflix slice state "movies"

//Fourth thunk is for getting all the liked movies so we have added case for it
//when fourth thunk isdispatched in thepage it is then fulfilled
//When the thunk is fulfilled which means we got the data (i.e., got all the liked movies) in getUserLikedMovies 
//which return movies array
//so we put that data in netflix slice state "likedMovie" 

//Fifth thunk is for removing the particular liked movie so we have added case for it
//when fifth thunk isdispatched in thepage it is then fulfilled
//When the thunk is fulfilled which means we got the data (i.e., got all the rest liked movies after removing
//particular movie) in removeFromLikedMovies 
//which return movies array
//so we put that data in netflix slice state "likedMovie" 

//Now when the thunk is fulfilled which is done when we dispatch that action in the page 
//we got our movies,genres,likedMovie array filled and isGenresLoaded becomes true

//We have also created 2 functions to fill the data in the array which we got from api 
//as api contain contains so many data and we dont want i.e.,we only wanted id,name,image,movies from it
//and also we want to liit the noof fetched movies and series

import {configureStore,createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { API_KEY, TMBD_BASE_URL } from "../utils/constants";
import axios from "axios"

//our initialstate
const initialState = {//empty array replaced by genres
    movies: [],
    genresLoaded: false,
    genres: [], 
    likedMovie: [],
};

//Thunk is the middleware in the redux.It is the normal fucn and we return a new func inside it which must be async
//reduxtoolkit contains already configured thunkand we dont need to configure it
//we pass identifier first inside the createAsyncThunk and second parameter contains the async func
//thunk is normally used when we want to fetch api as we cant fetch api directly in the reducer in reduxtoolkit
export const getGenres = createAsyncThunk("netflix/genres",async()=>{
    const {data:{genres}} = await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
});

const createArrayFromRawData = (array,moviesArray,genres) => {
    //for each movie in the array
    array.forEach((movie) => {
        //create empty array
        const movieGenres = [];
        //for each genre in the genre_ids
        movie.genre_ids.forEach((genre)=> {
            //find the given genre in the genres
            const name = genres.find(({id})=> id===genre);
            // if the genre exist the push it in movieGenres array
            if(name) movieGenres.push(name.name);
        });
        //backdrop_path is the poster of the movie if ir exists
        if(movie.backdrop_path){
            moviesArray.push({
                id:movie.id,
                //if original name exist then pass original name else the title
                name:movie?.original_name ? movie.original_name : movie._title,
                image:movie.backdrop_path,
                //we can have the multiple genres but we only need the first 3 genres thatswhy 
                genres:movieGenres.slice(0,3),
            })
        }
    });
};

//here we have created the raw adat fromthe api and called the func createArray to create the array of movies 
//from the raw data which we fetched here
//getRawData contains the api from which we generate the result and passit into func to create the array of that data
//and genres is pass tosort acc to the genres
//and if we have multiple pages then paging is donr it in to show resultin multiplepages
const getRawData = async (api,genres,paging) => {
    const moviesArray = [];//this array will store all our movies
    //we wan trmoviesArray tohave minimum no of movies as 60
    //but thisloop should only loop through 10 times if i value increases by 10 then this loop cond will be false
    //we need 60 movies and every api will get minimum of 20 movies so loop will run 3 times
    //if we sometimes get backdrop path as 0 then the count of mvies willdecrease
    //so we dont wan tot run it infinite times so we pass cond i<10
    for(let i=1;moviesArray.length<60 && i<10;i++){
        //if paging is true we pass &page=${i} else nthng
        const {data : {results}} = await axios.get(`${api}${paging? `&page=${i}`:""}`
       // here we get the results from the api
       );
       console.log(results);
       //pass results int the func and empty moviedsArray which will contain the array of movies after func call
       //and the genres
       createArrayFromRawData(results,moviesArray,genres);
    }
    //returning the moviesArray
    return moviesArray;
}//paging is not needed in fetch movies but whenever we are fetching series 
//we would need paging because we want to fetch it by different pages

export const fetchMovies = createAsyncThunk("netflix/trending",async({type},thunkApi)=> {
    //fromthunkapi we want current state and fromcurrent state we want genres 
    //we can write anything instead of thunkApi
    //we get netflix slice fromthunkApi and from netflix slice we want genres
    const {netflix:{genres},} = thunkApi.getState();//get state fromthunk api this would contain all the state 
    //and from state we want netflix and from netflix we want genres\
    //const data = getRawData(`${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,genres,true)
    //console.log(data);
    return getRawData(`${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,genres,true)
    //get trending by week
})//first arg inside async is arguement that are passed from caliing func

export const fetchDataByGenre = createAsyncThunk("netflix/moviesByGenres",async({genre,type},thunkApi)=> {
    //fromthunkapi we want current state and fromcurrent state we want genres 
    //we can write anything instead of thunkApi
    //we get netflix slice fromthunkApi and from netflix slice we want genres
    const {netflix:{genres},} = thunkApi.getState();//get state fromthunk api this would contain all the state 
    //and from state we want netflix and from netflix we want genres\
    return getRawData(`${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,genres)
    //get trending by week
})//first arg inside async is arguement that are passed from caliing func

//return getRawData(`${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`) 
//api to get by genres
//type are different movies tv series

//For getting all the liked movies from the database
export const getUserLikedMovies = createAsyncThunk("netflix/getLiked",async (email) => {
      const {data: { movies },} = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
      //we will get all the likedmovies of the user with this email fromthemongodb database
      //database contain 2 things email and movies array amd we will get the array from it and return it
      return movies;
    }
  );
  
//for removing a movie from liked list
export const removeFromLikedMovies = createAsyncThunk("netflix/deleteLiked",async ({ movieId, email }) => {
      const {data: { movies },} = await axios.put("http://localhost:5000/api/user/remove", {
        email,
        movieId,
      });
      //we will delete the movie with the given movieId fromthe database of the given email and return movie array
      return movies;
    }
  );

//created a new slice with name NetflixSlice
//object is passed inside the createSlice
const NetflixSlice = createSlice({
    name:"Netflix",
    initialState,
    //reducers are functions through which we mutate the app
    //reducers are pure function i.e.,do not change the data outside the func(it dont have any side effect)
    //reducers change the state
    //reducer have 2 parameters 1st is state and 2nd action
    //func(state,action)
    //state is the initialState i.e.,empty array 
    //we create the functions inside the reducer to change the state
    //extraReducer is a func and we have builder inside it
    //we add csse inside the builder
    extraReducers:(builder) => {
        //if fulfilled action is dispatched inside getgenres thunk
        //createAsyncThunk contains actions fulfilled,rejected,pending

        //for calling getgenres
        builder.addCase(getGenres.fulfilled,(state,action)=> {
            //return [...state,action.payload] earlier we used to write like this
            //we have to create new array and change state in that in reduxcore
            // but from reduxtoolkit we can directly change the state of array without creating new array
            //we can directly mutate the state here in reduxtoolkit
            //we can dothis because we are inside the createSlice functon
            //inside action we have payload which contains genres
            state.genres = action.payload;
            state.genresLoaded = true;
            //if the getGenres is fullfilled we load the value of getGenre in genres and do genresLoaded to true 
        })
        //forcalling fetchMovies
        builder.addCase(fetchMovies.fulfilled,(state,action)=> {
            //we get the movies from the api and that is stored in our redux store
            state.movies = action.payload;
            //if fetchMovies is fulfilled we load the value which we get from fetchMovies to movies
        })
        //for calling fetchDataByGenres
        builder.addCase(fetchDataByGenre.fulfilled,(state,action) => {
            //we get the movies by the genres from api which is stored in the redux store
            state.movies = action.payload;
            //if fetchDataByGenre is fulfilled we load the value which we gotfrom it to movies
        })
        //for calling getUserLikedMovies
        builder.addCase(getUserLikedMovies.fulfilled,(state,action) => {
            //we get all the liked movies from the api
            //and we will store that in movies state
            //state.movies = action.payload;
            state.likedMovie = action.payload;
        })
        //for calling removeFromLikedMovies
        builder.addCase(removeFromLikedMovies.fulfilled,(state,action) => {
            //we get all the liked movies from the api after removing movie with particular if
            //and we will store that in movies state
            //state.movies = action.payload;
            state.likedMovie = action.payload;
        })
    },
});

//configuring the store // registering the store
//passing property reducer inside the configureStore
export const store = configureStore({
    reducer:{
        //give name netflix to the reducer and give netflixSlice in it
        //we can pass as many reducers as we want in it like
        //cart:CartSlice.reducer,
        //product:ProductSlice.reducer,
        //here NetflixSlice is the name of our reducer
        netflix:NetflixSlice.reducer,
    },
})

//We have created the slice which will store the values fetched from the api and we can use it in the page

//Simply we have stored the fetched movies and series fetched from thunk in movies array
//and fetched genres in the genres array and used it in page

//url for searching a series or movie
// `${TMBD_BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`

// export const fetchSearch = createAsyncThunk("netflix/search",async({search},thunkApi)=> {
//     console.log(search);
//     const {netflix:{genres},} = thunkApi.getState();
//     console.log(genres);
//     const moviesArray = [];
//     //const movies = getRawData(`${TMBD_BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${search}
//    // &page=1&include_adult=false`,genres,true)
//     //console.log(movies);
//     //return movies
//     const {data:{results}} = await axios.get(`${TMBD_BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${search}
//     &page=1&include_adult=false`)
//     results.forEach((movie) => {
//         //create empty array
//         //backdrop_path is the poster of the movie if ir exists
//         if(movie.backdrop_path){
//             moviesArray.push({
//                 id:movie.id,
//                 //if original name exist then pass original name else the title
//                 name:movie?.original_name ? movie.original_name : movie._title,
//                 image:movie.backdrop_path,
//                 //we can have the multiple genres but we only need the first 3 genres thatswhy 
//                 //genres:movieGenres.slice(0,3),
//             })
//         }
//     });
//     //createArrayFromRawData(results,moviesArray,genres);
//     console.log(moviesArray);
//     return moviesArray;
// })//first arg inside async is arguement that are passed from caliing func