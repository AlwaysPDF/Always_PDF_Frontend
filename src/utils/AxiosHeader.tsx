import axios from "axios";
import UserToken from "./UserToken";
// Create an instance of Axios

export const axiosInstance = axios.create({
  baseURL: `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://always-pdf-backend.vercel.app"
  }/api/v1`, // Set your API base URL
  headers: {
    "Content-Type": "application/json", // Specify the content type header
  },
  withCredentials: true, // Set credentials to true
});

// Make a request with credentials enabled
export const axiosInstanceWithHeader = axios.create({
  baseURL: `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://always-pdf-backend.vercel.app"
  }/api/v1`, // Set your API base URL
  headers: {
    // Perform localStorage action
    Authorization: `Bearer ${UserToken()}`, // Set the Authorization header with the token
    "Content-Type": "application/json", // You can modify this header pe as needed
  },
  withCredentials: true, // Set credentials to true
});
