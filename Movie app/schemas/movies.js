const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    ticket_price: {type: Number, required: true},
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()},
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;