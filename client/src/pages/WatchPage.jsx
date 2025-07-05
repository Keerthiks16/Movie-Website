import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import TrailerSlider from "../components/TrailerSlider";
import Details from "../components/Details";
import { formatReleaseDate } from "../utils/dateFormat";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import SimilarContent from "../components/SimilarContent";

const WatchPage = () => {
  const { contentType } = useContentStore();
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [details, setDetails] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`, {
          withCredentials: true,
        });
        setDetails(res.data.details);
      } catch (error) {
        if (error.message.includes("404")) {
          setDetails(null);
          console.log("No details found for this movie: ", error);
        }
      }
    };
    getDetails();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarMovies = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`, {
          withCredentials: true,
        });
        setSimilarMovie(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarMovie([]);
          console.log("No similar movie found for this movie: ", error);
        }
      }
    };
    getSimilarMovies();
  }, [contentType, id]);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`, {
          withCredentials: true,
        });
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
          console.log("No trailers found for this movie: ", error);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    setActiveIndex(0);
  }, [contentType, id]);

  const roundToOneDecimal = (number) => {
    return Math.round(number * 10) / 10;
  };

  return (
    <div className="bg-black text-white">
      {contentType === "tv" ? <Navbar tab={"tvshows"} /> : <Navbar />}
      {!details ? (
        <div className=" text-3xl text-red-600 bg-black h-screen">
          <span className="mt-20 flex self-center">No content found</span>
        </div>
      ) : (
        <>
          <TrailerSlider
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            title={details.title || details.name}
            trailers={trailers}
          />
          <Details
            title={details.title || details.name}
            date={formatReleaseDate(
              details.release_date || details.first_air_date
            )}
            rating={roundToOneDecimal(details?.vote_average) + " ⭐"}
            description={details.overview}
            posterImage={ORIGINAL_IMG_BASE_URL + details.poster_path}
          />
          <SimilarContent similar={similarMovie} />
        </>
      )}
    </div>
  );
};

export default WatchPage;
