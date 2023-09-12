const express = require("express");
const Movie = require("../schemas/movies");
const router = express.Router();

const movies = [];

router.get("/", async (req, res) => {
    const movies = await Movie.find({});
    res.send(movies);
});

router.post("/", (req, res) => {

    const body = req.body;

    if((!body.name) || (typeof body.name !== "string")){
        res.send({error: true, message: "The name of the movie does not match the schema"});
        return;
    }

    if((!body.description) || (typeof body.description !== "string")){
        res.send({error: true, message: "The description of the movie does not match the schema"});
        return;
    }

    if((!body.ticket_price) || (typeof body.ticket_price !== "number")){
        res.send({error: true, message: "The name of the ticket's price does not match the schema"});
        return;
    }

    const newMovie = new Movie({
        name: body.name,
        description: body.description,
        ticket_price: body.ticket_price
    });

    newMovie.save();

    res.send(newMovie);
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if(!id) {
        res.send({error: true, message: "id is not defined"});
        return;
    }

    if((!body.name) || (typeof body.name !== "string")){
        res.send({error: true, message: "The name of the movie does not match the schema"});
        return;
    }

    if((!body.description) || (typeof body.description !== "string")){
        res.send({error: true, message: "The description of the movie does not match the schema"});
        return;
    }

    if((!body.ticket_price) || (typeof body.ticket_price !== "number")){
        res.send({error: true, message: "The name of the ticket's price does not match the schema"});
        return;
    }

    const movie = await Movie.findOneAndUpdate({_id: id}, {...body}, {new: true});
    res.send(movie);

});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.send({error: true, message: "id is not defined"});
        return;
    }

    const result = await Movie.findByIdAndDelete(id);
    res.send(result);
});

module.exports = router;