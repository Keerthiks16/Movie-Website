import React, { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType, setContentType } = useContentStore();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/v1/${contentType}/trending`, {
          withCredentials: true,
        });
        setTrendingContent(res.data.content);
      } catch (error) {
        console.error("Error fetching trending content:", error);
      }
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
