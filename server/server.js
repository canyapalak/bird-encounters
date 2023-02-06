import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
