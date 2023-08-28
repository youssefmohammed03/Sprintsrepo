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