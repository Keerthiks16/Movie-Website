import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb_service.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ people: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(`Error in searchPerson: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ movie: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(`Error in searchPerson: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ tv: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log(`Error in searchPerson: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ searchHistory: req.user.searchHistory });
  } catch (error) {
    console.log(`Error in getSearchHistory: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteItemFromSearchHistory = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { searchHistory: { id: id } },
    });

    res.status(200).json({ message: "Item deleted from search history" });
  } catch (error) {
    console.log(`Error in deleteItemFromSearchHistory: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
