import express from "express";
import cors from "cors";
import router from "./routes/test.js";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import passport from "passport";
import encounterRoutes from "./routes/encounterRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import { jwtStrategy } from "./config/passport.js";

const app = express();
const port = process.env.PORT || 5000;

const mongoDBConnection = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.DB);
    // console.log("Connection to Mongo DB established on port: " + port);
  } catch (error) {
    // console.log("Error connecting to MongoDB", error);
  }
};

const loadRoutes = () => {
  app.use("/api", router);
  app.use("/api/encounters", encounterRoutes);
  app.use("/api/users", userRoutes);
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

const addMiddlewares = () => {
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
  // app.use(cors(corsOptions));
  app.use(cors());
  cloudinaryConfig();
  app.use(passport.initialize());
  passport.use(jwtStrategy);
};

//IIFE
(async function controller() {
  await mongoDBConnection();
  addMiddlewares();
  loadRoutes();
  startServer();
})();
