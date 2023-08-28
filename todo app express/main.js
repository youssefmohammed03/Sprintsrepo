/*
This is a ToDo app that allows the user using extensions like Thunder Client to:

1- Add task using route= "/add" and method= "POST"
2- change the status of the task using route= "/check" and method= "PATCH"
3- List tasks using route= "/list" and method= "GET"
4- Delete task using route= "/delete" and method= "DELETE"

notes:

1- when adding task you have to send json contains these two parameters (number, done):
{
    "number": 1,
    "done": false
}

2- when change status of a task you have to send json contains these two parameters (number, done):
{
    "number": 1,
    "done": false
}

3- when deleting a task you have to send json contains parameter (number):
{
    "number": 1
}
*/

const path = require("path");
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let todos = [];

app.get('/list', (req, res) => {
    res.send(todos);
})

app.post("/add", (req, res) => {
    let body = req.body;
    todos.push(body);

    res.end();
});

app.patch("/check", (req, res) => {
    let body = req.body;
    let id = body.number;
    let status = body.done;

    for (let i = 0; i<todos.length; i++){
        if(id === todos[i].number){
            todos[i].done = status;
        }
    }

    res.end();
});

app.delete("/delete", (req, res) => {
    let body = req.body;
    let number = body.number;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].number === number) {
        todos.splice(i, 1);
        break;
        }
    }

    res.end();
})



app.listen (3000, "localhost", () => {
    console.log("server is up and running on http://localhost:3000");
})