require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const moviesRouter = require("./routes/movies.js");

const PORT = process.env.PORT || 3000;

const app = express();

const logger = (req, res, next) => {
    const method = req.method;
    const route = req.path;
    const time = new Date();

    console.log(`The method is: ${method}    The route is: ${route}    The time is: ${time}`);

    let data = `The method is: ${method}    The route is: ${route}    The time is: ${time}\n`;

    fs.appendFile(path.join(__dirname, "log.txt"), data, (error) => {
        if (error) {
            console.log(error);
        }
    });

    next(); 
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger);

mongoose
    .connect(process.env.CONNECTION_STRING, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.log(e);
    });

app.use('/movies', moviesRouter)

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})