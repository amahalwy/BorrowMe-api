const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./routes/api/users");
const postings = require("./routes/api/postings");
const requests = require("./routes/api/requests");
const bookings = require("./routes/api/bookings");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./config/passport")(passport);
const path = require("path");

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
app.use("/api/users", users);
app.use("/api/postings", postings);
app.use("/api/requests", requests);
app.use("/api/bookings", bookings);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
