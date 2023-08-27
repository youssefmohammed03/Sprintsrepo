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


const http = require("http");
const fs = require("fs");
const path = require("path");

const todos = [];

const listAllTodos = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(todos));
}

const addNewTodoItem = (req, res) => {
    let body = [];

        req.on("data", (chunk) => {
            body.push(chunk);
        }).on("end", () => {
            const newItem = JSON.parse(Buffer.concat(body).toString());
            todos.push(newItem);
            res.end();
        });
}

const check = (req, res) => {
    let body = [];

    req.on("data", (chunk) => {
    body.push(chunk);
    }).on("end", () => {
    const data = JSON.parse(Buffer.concat(body).toString());
    let id = data.number;
    let status = data.done;

    for (let i = 0; i<todos.length; i++){
        if(id === todos[i].number){
            todos[i].done = status;
        }
    }
    res.end();
    });
}


const deleteTask = (req, res) => {
    let body = [];

    req.on("data", (chunk) => {
    body.push(chunk);
    }).on("end", () => {
    const data = JSON.parse(Buffer.concat(body).toString());
    let number = data.number;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].number === number) {
        todos.splice(i, 1);
        break;
        }
    }

    res.end();
    });
}

const notFound = (req, res) => {
    res.setHeader("Content-Type", "text/html");
    const filePath = path.join(__dirname, "index.html");
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
}

const requestListenner = (req, res) => {
    const method = req.method;
    const route = req.url;

    if(method === "GET" && route === "/list"){
        listAllTodos(req, res);
    } else if(method === "POST" && route === "/add"){
        addNewTodoItem(req, res);
    } else if(method === "PATCH" && route === "/check"){
        check(req, res);
    } else if(method === "DELETE" && route === "/delete"){
        deleteTask(req, res);
    } else{
        notFound(req, res)
    }
}

const server = http.createServer(requestListenner);

server.listen(3000, "localhost", () => {
    console.log("server is up and running on http://localhost:3000");
});