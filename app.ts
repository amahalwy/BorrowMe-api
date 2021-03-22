const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
require("./config/passport")(passport);

import usersRouter from "./routes/api/users";
import requestsRouter from "./routes/api/requests";
import postingsRouter from "./routes/api/postings";
import bookingsRouter from "./routes/api/bookings";

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use("/api/users", usersRouter);
app.use("/api/postings", postingsRouter);
app.use("/api/requests", requestsRouter);
app.use("/api/bookings", bookingsRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
