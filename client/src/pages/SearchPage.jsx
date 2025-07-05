import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useContentStore } from "../store/content";
const SearchPage = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [activeTab, setActiveTab] = useState("Movies");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [type, setType] = useState("movie");
  const [result, setResult] = useState();

  const { contentType, setContentType } = useContentStore();

  useEffect(() => {
    const handleType = () => {
      if (activeTab === "Movies") {
        setType("movie");
        setContentType("movie");
      }
      if (activeTab === "TV Shows") {
        setType("tv");
        setContentType("tv");
      }
      if (activeTab === "People") {
        setType("person");
      }
    };
    handleType();
  }, [activeTab]);

  const handleSearch = async (query) => {
    try {
      setSearchQuery(query);
      const results = await axios.get(
        `${SERVER_URL}/api/v1/search/${type}/${searchQuery}`,
        {
          withCredentials: true,
        }
      );
      const content =
        results.data.movie || results.data.tv || results.data.people;
      console.log("Content: ", content);
      setResult(content);
    } catch (error) {
      console.log("Error: ", error);
    }

    console.log("Type: ", type);
    console.log("Query: ", query);
  };

  const performSearch = (query) => {
    const results = sampleData[activeTab].filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchResults([]);
    setResult([]);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen h-full bg-black">
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-6 pt-6">
        <nav className="flex space-x-4">
          {["Movies", "TV Shows", "People"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Search Input */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && performSearch(searchQuery)
              }
              className="w-full bg-gray-800 text-white px-4 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <button
            onClick={() => handleSearch(searchQuery)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(searchResults.length > 0 ? searchResults : result)?.map((item) => {
            if (!item.poster_path && !item.profile_path) return null;
            return (
              <React.Fragment key={item.id}>
                {activeTab === "People" ? (
                  <Link to={`/actor/${item.id}`}>
                    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105">
                      <img
                        src={ORIGINAL_IMG_BASE_URL + item.profile_path}
                        alt={item.title || item.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-white font-medium text-center">
                          {item.title || item.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link to={`/watch/${item.id}`}>
                    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105">
                      <img
                        src={ORIGINAL_IMG_BASE_URL + item.poster_path}
                        alt={item.title || item.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-white font-medium text-center">
                          {item.title || item.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
