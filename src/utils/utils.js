export const getApiBaseUrl = () => {
    if (process.env.NODE_ENV === "production") {
      return "https://csci4177-group19-project-2-git-develop-alexprokh.vercel.app";
    } else {
      return "http://localhost:3000"; // Replace 3000 with any number during development
    }
  };
  