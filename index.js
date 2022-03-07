const express = require("express");

const app = express();


app.use(logger, checkPermission);

app.get("/books", (req, res) => {
    return res.send(
        { route: "/books", role: req.role, Permission : req.response}
    );
})

app.get("/libraries", logger, checkPermission, (req, res) => {
    return res.send(
        { route: "/libraries", role: req.role, Permission : req.response}
    );
})

app.get("/authors", logger, checkPermission, (req, res) => {
    return res.send(
        { route: "/authors", role: req.role, Permission : req.response}
    );
})



function logger(req, res, next) {
    if(req.path === "/books"){
        req.role = "book";
    } else if(req.path == "/libraries"){
        req.role = "libraries";
    } else if(req.path === "/authors"){
        req.role = "authors";
    } else {
        req.role = "another";
    }

    console.log("called");

    next();
}

function checkPermission(req, res, next){

    if(req.path == "/authors"){

       req.response = "true";
    } else if(req.path == "/libraries") {
        req.response = "true";
    } else {
        req.response = "false";
    }

    console.log(req.path);
    next();
}


app.listen("4000", ()=> {
    console.log("Server is running on 4000");
})