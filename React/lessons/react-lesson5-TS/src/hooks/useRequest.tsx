import axios from "axios";
import { useEffect, useState } from "react";

export const useRequest = (BASE_URL: string) => {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(BASE_URL);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL]);

  return { posts, isLoading, error };
};
