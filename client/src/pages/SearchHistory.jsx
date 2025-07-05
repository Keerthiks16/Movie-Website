import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const SearchHistory = () => {
  const [history, setHistory] = useState([]); 
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  function formatDate(dateString) {
    // Create a Date object from the input date string
    const date = new Date(dateString);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Extract the month, day, and year from the Date object
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    // Return the formatted date string
    return `${month} ${day}, ${year}`;
  }

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/v1/search/history`, {
        withCredentials: true,
      });
        const searchHistory = res.data.searchHistory;

        // Flatten the array immediately when we get it from the response
        const flattenedHistory = searchHistory.flat();
        console.log("Original History: ", searchHistory);
        console.log("Flattened History: ", flattenedHistory);

        // Set the flattened history to state
        setHistory(flattenedHistory);
      } catch (error) {
        console.error("Error fetching search history:", error);
        setHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  const getTypeColor = (searchType) => {
    switch (searchType?.toLowerCase()) {
      case "person":
        return "bg-green-500";
      case "movie":
        return "bg-red-500";
      case "tv":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDelete = async (entry) => {
    try {
      await axios.get(`${SERVER_URL}/api/v1/search/history/${entry.id}`, {
        withCredentials: true,
      });
      setHistory(history.filter((item) => item.id !== entry.id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete search item");
    }
  };

  return (
    <div className="bg-black min-h-screen p-6">
      <Navbar tab={"history"} />

      <div className="mt-16 space-y-2">
        {history?.map((search) => (
          <div
            key={search.title}
            className="flex items-center justify-between bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img
                src={ORIGINAL_IMG_BASE_URL + search.image}
                alt={search.title}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">{search.title}</span>
                  <span
                    className={`px-2 py-0.5 text-xs text-white rounded-full ${getTypeColor(
                      search.searchType
                    )}`}
                  >
                    {search.type}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  {formatDate(search.createdAt)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                console.log(search);
                handleDelete(search);
              }}
              className="text-gray-400 hover:text-red-500 transition-colors p-2"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
