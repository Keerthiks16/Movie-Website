import { fetchFromTMDB } from "../services/tmdb_service.js";

export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ content: randomTv });
  } catch (error) {
    console.log(`Error in getTrendingTv: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTvTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.status(200).json({ trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(`Error in getTvTrailers: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(`Error in getTvDetails: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSimilarTvs = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ similar: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(`Error in getSimilarTvs: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTvsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ content: data.results });
  } catch (error) {
    console.log(`Error in getTvsByCategory: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
