import express from "express";
// import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js"
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use(cors());

// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("Welcome to MERN Stack Tutorial")
});

app.use("/books", booksRoute);

mongoose.connect(process.env.MONGODBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch(() => {
        console.log(error);
    });