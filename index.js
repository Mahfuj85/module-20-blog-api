import "dotenv/config";
import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./src/config/config.js";
import app from "./App.js";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database Connection Error`, error);
  });
