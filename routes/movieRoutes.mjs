import express from "express";
import { movieFetchTconst, movieFetchSearch, addMovieToFavourite, removeMovieFromFavourite } from "../controller/movieMethods.mjs";
import { isLogged } from "../middleware/isLogged.mjs";

const router = express.Router();

// (Fetching a movie by tconst)
router.get("/fetch/:tconst", movieFetchTconst);
// (Fetching a movie by name)
router.get("/fetch", movieFetchSearch);
// (Adding a Movie to a User's Favourite)
router.post("/add_favourite/:tconst", isLogged, addMovieToFavourite);
// (Removing a Movie to a User's Favourite)
router.post("/remove_favourite/:tconst", isLogged, removeMovieFromFavourite);


export default router;