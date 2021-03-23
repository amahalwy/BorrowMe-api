import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import users from "./routes/api/users";
import postings from "./routes/api/postings";
import requests from "./routes/api/requests";
import bookings from "./routes/api/bookings";
import bodyParser from "body-parser";
import passport from "passport";
const app = express();
require("./config/passport")(passport);

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err: any) => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/api/users", users);
app.use("/api/postings", postings);
app.use("/api/requests", requests);
app.use("/api/bookings", bookings);
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
