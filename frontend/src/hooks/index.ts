import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string;
  author: {
    name: string;
  };
  title: string;
  content: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        });
        // console.log(response.data.id);
        
        setBlog(response.data?.id);
      } catch (e) {
        console.log("cannot fetch blogs: ", e);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        });
        setBlogs(response.data?.blogs);
        setLoading(false);
      } catch (e) {
        console.log("cannot fetch blogs: ", e);
      }
    }

    getData();
  }, []);

  return {
    loading,
    blogs,
  };
};
