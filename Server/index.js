import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import dbConnection from "./Utils/index.js";
import routes from "./Routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
