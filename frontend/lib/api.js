import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getBlogs = (params) => API.get("/blogs", { params });
export const getBlogBySlug = (slug) => API.get(`/blogs/${slug}`);
export const getCategories = () => API.get("/blogs/categories");
export const getTags = () => API.get("/blogs/tags");

export default API;
