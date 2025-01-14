import React from "react";
import { useAuthStore } from "../store/authUser";
import Navbar from "../components/Navbar";
import TrendingContent from "../components/TrendingContent";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

const HomeScreen = () => {
  return (
    <>
      <Navbar />
      <TrendingContent />
      <Categories />
    </>
  );
};

export default HomeScreen;
