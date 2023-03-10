const serverURL =
  process.env.NODE.ENV === "production"
    ? "https://bird-encounters-backend.vercel.app/"
    : "http://localhost:5000/";

export { serverURL };
