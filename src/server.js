import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectMongoDB } from "./config/mongodb.js";
import foodRouter from "./routes/foodRoutes.js";

//server config
const server = express();
const port = process.env.PORT;

//middleware
server.use(express.json());
server.use(cors());

//routers
server.use("/api/food", foodRouter);
server.use("/images", express.static("src/uploads"));

//connect to db and start server
const startServer = async () => {
  try {
    await connectMongoDB(); //mongodb connection
    server.listen(port, () => {
      console.log(`Server is running on Port:- ${port}`);
    });
  } catch (error) {
    console.error("Error in startServer!:", error);
    process.exit(1);
  }
};
startServer();
