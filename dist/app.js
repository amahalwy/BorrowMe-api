"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var users_1 = __importDefault(require("./routes/api/users"));
var postings_1 = __importDefault(require("./routes/api/postings"));
var requests_1 = __importDefault(require("./routes/api/requests"));
var bookings_1 = __importDefault(require("./routes/api/bookings"));
var body_parser_1 = __importDefault(require("body-parser"));
var passport_1 = __importDefault(require("passport"));
var app = express_1.default();
var passport_2 = __importDefault(require("./config/passport"));
passport_2.default(passport_1.default);
var uri = process.env.mongoURI;
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default.connect(uri, options);
// .then(() => console.log("Connected to MongoDB successfully"))
// .catch((err: any) => console.log(err));
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
app.use("/api/users", users_1.default);
app.use("/api/postings", postings_1.default);
app.use("/api/requests", requests_1.default);
app.use("/api/bookings", bookings_1.default);
var port = process.env.NODE_ENV === "production" ? process.env.PORT : 5000;
app.listen(port, function () { return console.log("Server is running on port " + port); });
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
