import React, { useState } from "react";
import { Search, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";

const Navbar = ({ tab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tab || "movies");
  const { contentType, setContentType } = useContentStore();
  // console.log(contentType);

  const { user, logout } = useAuthStore();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    console.log("Logout successful");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLink = ({ href, text, id, onClick }) => (
    <Link
      to={href}
      onClick={() => {
        setActiveTab(id);
        onClick && onClick();
      }}
      className={`${
        activeTab === id
          ? "text-red-500 border-b-2 border-red-500"
          : "text-white hover:text-red-500"
      } transition-colors font-medium px-1 py-2`}
    >
      {text}
    </Link>
  );

  // if (contentType === "movies") setActiveTab("movies");
  // if (contentType === "tvs") setActiveTab("tvshows");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Website Name */}
          <div className="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors cursor-pointer">
            MovieFlix
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-red-500 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            <NavLink
              href="/"
              text="Movies"
              id="movies"
              onClick={() => setContentType("movie")}
            />
            <NavLink
              href="/"
              text="TV Shows"
              id="tvshows"
              onClick={() => setContentType("tv")}
            />
            <NavLink href="/history" text="Search History" id="history" />
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/search">
              <button className="text-white hover:text-red-500 transition-colors">
                <Search size={24} />
              </button>
            </Link>
            <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
              <img
                src={user?.image || "/api/placeholder/32/32"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="text-white hover:text-red-500 transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden bg-black bg-opacity-95 px-4 py-2 space-y-4`}
        >
          <div className="flex flex-col space-y-4 py-2">
            <NavLink
              href="/"
              text="Movies"
              id="movies"
              onClick={() => setContentType("movie")}
            />
            <NavLink
              href="/"
              text="TV Shows"
              id="tvshows"
              onClick={() => setContentType("tv")}
            />
            <NavLink href="/history" text="Search History" id="history" />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-700">
            <NavLink to="/search">
              <button className="text-white hover:text-red-500 transition-colors">
                <Search size={24} />
              </button>
            </NavLink>
            <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
              <img
                src={user?.image || "/api/placeholder/32/32"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="text-white hover:text-red-500 transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
