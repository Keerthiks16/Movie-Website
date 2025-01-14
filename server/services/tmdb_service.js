import axios from "axios";

//   fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };
  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB " + response.statusText);
  }

  return response.data;
};
