import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from './middleware/auth.js';
import { register } from "./controllers/auth.js";
import { createPost } from './controllers/posts.js'
import User from './models/User.js';
import Post from './models/Post.js';
import { users, posts } from './data/index.js'

/* CONFIGURATIONS */

//calling the fileURLToPath() funciton converts a file URL to a file Path, import.meta.url gives the URL of the current module
const __filename = fileURLToPath(import.meta.url);
//path.dirname() function returns the directory of the file, and extracts the directory path of the current script file.
const __dirname = path.dirname(__filename);
//reads a .env file in the root directory of the project and makes the key-value pairs available as environment variables. This way, you can access the variables with the process.env object, as if they were set in the environment.
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/*FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /*Add Data One Time */
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => console.log(`${error} did not connect`));
mongoose.set('strictQuery', true);

/*
Notes:
1. const app = express(); creates an instance of the Express application.
2. app.use(express.json()); is a middleware that parses incoming requests with JSON payloads. It allows you to access the JSON data in the request body via req.body.
3. app.use(helmet()); is a middleware that adds various HTTP headers to the response to help secure the application. It provides a middleware layer that sets HTTP headers to help protect the application from some well-known web vulnerabilities by setting HTTP headers appropriately.
4. app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })) is a middleware that enables the cross-origin resource policy. It allows your application to make requests to a different origin, which can be useful for building a single-page application (SPA) that makes requests to an API on a different domain.
5. app.use(morgan("common")) is a middleware that adds a logger to the application. It allows you to log incoming requests and other useful information, such as request method, URL, status code, and response time.
6. app.use(bodyParser.json({ limit: "30mb", extended: true })) is a middleware that parses incoming requests with JSON payloads. It allows you to access the JSON data in the request body via req.body. It also sets a limit of 30MB on the size of the payload, and allows for sending complex data structures.
7. app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })) is a middleware that parses incoming requests with URL-encoded payloads. It allows you to access the data in the request body via req.body. It also sets a limit of 30MB on the size of the payload, and allows for sending complex data structures.
8. app.use(cors()) is a middleware that enables cross-origin resource sharing (CORS). It allows the browser to access resources from different origins and enables your application to accept requests from different origins.
9. app.use("/assets", express.static(path.join(__dirname, 'public/assets'))) is a middleware that serves static files. It allows you to serve files from a specific directory, in this case the 'public/assets' directory. This is useful for serving images, stylesheets, and other static assets.

10. multer.diskStorage() is used to configure the storage engine for handling the uploaded files. The configuration options provided to multer.diskStorage are used to determine where to store the uploaded files, and how to name them.

All these middlewares are prepared to be used in the application, they all perform different tasks, but all of them are used to make the application more secure, robust and easy to develop.  
*/