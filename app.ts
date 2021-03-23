import mongoose, { ConnectOptions } from "mongoose";
import express from "express";
import cors from "cors";
import users from "./routes/api/users";
import postings from "./routes/api/postings";
import requests from "./routes/api/requests";
import bookings from "./routes/api/bookings";
import bodyParser from "body-parser";
import passport from "passport";
const app = express();
import passportFn from "./config/passport";
passportFn(passport);

const uri: string | any = process.env.mongoURI;
const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options);

// .then(() => console.log("Connected to MongoDB successfully"))
// .catch((err: any) => console.log(err));

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

// "devDependencies": {
//   "@types/bcryptjs": "^2.4.2",
//   "@types/cors": "^2.8.10",
//   "@types/express": "^4.17.11",
//   "@types/multer": "^1.4.5",
//   "@types/node": "^14.14.35",
//   "@types/passport": "^1.0.6",
//   "@types/passport-jwt": "^3.0.5",
//   "@types/uuid": "^8.3.0",
//   "@types/validator": "^13.1.3",
//   "nodemon": "^2.0.4",
//   "ts-node": "^9.1.1",
//   "typescript": "^4.2.3"
// }

// "server": "nodemon -x ts-node app.ts",
