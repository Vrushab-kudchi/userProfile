import { useEffect, useState } from "react";
import axios from "axios";
import { getUserName } from '../helper/helper'

axios.defaults.baseURL = "http://localhost:3001";

export const useFetch = (query) => {
  const [data, setData] = useState({
    isLoading: false,
    serverError: undefined,
    status: null,
    apiData: {
      email: '',
      profile: '',
      username: '',
      _id: '',
      secret_key: ''
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        // Use a promise to get the username from getUserName function
        const usernamePromise = getUserName();
        const { username } = await usernamePromise;

        const response = query
          ? await axios.get(`/api/user/${query}`)
          : await axios.get(`/api/user/${username}`);

        setData((prev) => ({
          ...prev,
          apiData: {
            email: response.data.user.email,
            profile: response.data.user.profile,
            username: response.data.user.username,
            _id: response.data.user._id,
            secret_key: response.data.user.secret_key
          },
          status: response.status,
          isLoading: false,
        }));
      } catch (error) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error,
        }));
      }
    };
    fetchData();
  }, [query]);

  return data;
};
