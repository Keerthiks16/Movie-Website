import { fetchFromTMDB } from "../services/tmdb_service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ content: randomMovie });
  } catch (error) {
    console.log(`Error in getTrendingMovie: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    res.status(200).json({ trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(`Error in getMovieTrailers: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(`Error in getMovieDetails: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ similar: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(`Error in getSimilarMovies: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ content: data.results });
  } catch (error) {
    console.log(`Error in getMoviesByCategory: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
