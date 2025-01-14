import React, { useState } from "react";
import { Mail, Film, Tv, Star, ChevronRight } from "lucide-react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    navigate("/login?email=" + email);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Hero Section with Background */}
      <div className=" min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <nav className="flex justify-between items-center mb-16">
            <h1 className="text-4xl font-bold text-red-600">MovieVerse</h1>
            <Link to="/signup">
              <button className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition">
                Sign In
              </button>
            </Link>
          </nav>

          <div className="max-w-3xl mx-auto text-center mt-32">
            <h2 className="text-5xl font-bold mb-4">
              Unlimited Movies, TV Shows, and Star Info
            </h2>
            <p className="text-2xl mb-6">
              Get all the information you need about your favorite
              entertainment.
            </p>

            {/* Email Signup */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 md:flex-row md:justify-center"
            >
              <div className="relative w-screen md:w-96">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-12 py-4 bg-[#1a1a1a] rounded-md text-white placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                onSubmit={handleSubmit}
                className="w-full md:w-auto px-8 py-4 bg-red-600 rounded-md hover:bg-red-700 transition flex items-center justify-center gap-2 font-semibold"
              >
                Get Started
                <ChevronRight />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-16">
            Everything You Need to Know About Entertainment
          </h3>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Movies Feature */}
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Film className="w-16 h-16 text-red-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">Movies</h4>
              <p className="text-gray-400">
                Comprehensive information about movies from all genres. From
                classics to the latest releases, get details about plot, cast,
                reviews, and ratings.
              </p>
            </div>

            {/* TV Shows Feature */}
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Tv className="w-16 h-16 text-red-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">TV Shows</h4>
              <p className="text-gray-400">
                Stay updated with your favorite TV series. Access episode
                guides, season details, cast information, and upcoming releases.
              </p>
            </div>

            {/* Celebrities Feature */}
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Star className="w-16 h-16 text-red-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">Celebrities</h4>
              <p className="text-gray-400">
                Explore detailed profiles of your favorite stars. Learn about
                their filmography, awards, biography, and latest projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose MovieVerse?
          </h3>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="p-6 bg-[#1a1a1a] rounded-lg">
              <h4 className="text-xl font-bold mb-2">Comprehensive Database</h4>
              <p className="text-gray-400">
                Access our extensive collection of movies, TV shows, and
                celebrity information, updated daily.
              </p>
            </div>
            <div className="p-6 bg-[#1a1a1a] rounded-lg">
              <h4 className="text-xl font-bold mb-2">Detailed Information</h4>
              <p className="text-gray-400">
                Get in-depth details about plots, cast members, reviews,
                ratings, and more.
              </p>
            </div>
            <div className="p-6 bg-[#1a1a1a] rounded-lg">
              <h4 className="text-xl font-bold mb-2">Latest Updates</h4>
              <p className="text-gray-400">
                Stay informed about new releases, upcoming projects, and
                entertainment news.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default AuthScreen;
