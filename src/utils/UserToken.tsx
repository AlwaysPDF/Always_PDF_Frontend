import Cookies from "js-cookie";

const UserToken = () => {
  if (typeof window === "undefined") {
    // Check if running on the server to prevent errors
    return null;
  }

  try {
    // Get the token from local storage
    const token = Cookies.get("UserToken");
    return token;
  } catch (error) {
    console.error("Error fetching token from local storage:", error);
    return null;
  }
};

export default UserToken;
