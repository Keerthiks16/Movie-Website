import React from "react";
import { useAuthStore } from "../store/authUser";
import Navbar from "../components/Navbar";
import TrendingContent from "../components/TrendingContent";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import { useContentStore } from "../store/content";

const HomeScreen = () => {
  const { contentType } = useContentStore();
  return (
    <>
      {contentType === "tv" ? <Navbar tab={"tvshows"} /> : <Navbar />}
      <TrendingContent />
      <Categories />
    </>
  );
};

export default HomeScreen;
