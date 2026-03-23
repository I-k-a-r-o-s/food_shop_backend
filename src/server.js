import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"

//server config
const server = express();
const port = process.env.PORT;

//middleware
server.use(express.json())
server.use(cors())


const serverStartLog = () => {
  console.log(`Server is running on Port:- ${port}`);
};
const startserver = async () => {
  try {
    server.listen(port, serverStartLog());
  } catch (error) {
    console.error("Error in startServer!:", error);
    process.exit(1);
  }
};
startserver();
