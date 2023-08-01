import titleBasics from "../model/titleBasicsDB.mjs";
import User from "../model/User.mjs";

/* Get a movie document by Tconst */
export const movieFetchTconst = async (req, res) => {
    try {

        const tconst = req.params['tconst']
        const getMovie = await titleBasics.find({ tconst: tconst });


        if (!getMovie) return res.status(400).json({ msg: "Movie does not exist. " });
        return res.status(200).json({ msg: `Movie Document`, getMovie });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

//Fetch Movie by Title and if provided Genre
export const movieFetchSearch = async (req, res) => {
    try {
        const name = req.body.name;
        const regex = new RegExp(name, 'i');
        let query = { primaryTitle: regex };

        // Check for  genre parameter and add to query
        const genre = req.body.genre;
        if (genre) {
            query.genres = { $regex: new RegExp(genre, 'i') };
        }

        const getMovie = await titleBasics.find(query).limit(10);

        // Return 10 instances of the match
        const movieMatch = getMovie.find(movie => movie.primaryTitle === name);
        if (movieMatch) {
            getMovie.splice(getMovie.indexOf(movieMatch), 1);
            getMovie.unshift(movieMatch);
        }

        return res.status(200).json({ msg: `Movie Document`, getMovie });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

/* Add a movie to a User's Favourite Array */
export const addMovieToFavourite = async (req, res) => {
    try {

        const tconst = req.params['tconst']
        const getMovie = await titleBasics.find({ tconst: tconst });
        if (!getMovie) return res.status(400).json({ msg: "Movie does not exist. " });


        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ msg: "User not found." });


        if (user.favourite.includes(tconst)) {
            return res.status(400).json({ msg: "Movie already favorited." });
        }

        user.favourite.push(tconst);
        await user.save();
        res.status(200).json({ msg: "Movie added to favourites.", user: user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

/* Remove a movie to a User's Favourite Array */
export const removeMovieFromFavourite = async (req, res) => {
    try {

        const tconst = req.params['tconst']
        const getMovie = await titleBasics.find({ tconst: tconst });
        if (!getMovie) return res.status(400).json({ msg: "Movie does not exist. " });


        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ msg: "User not found." });

        const index = user.favourite.indexOf(tconst);
        if (index > -1) {
            user.favourite.splice(index, 1);
            await user.save();
            res.status(200).json({ msg: "Movie removed from favourites." });
        } else {
            res.status(400).json({ msg: "Movie not found in favourites." });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};