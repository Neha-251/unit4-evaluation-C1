const express = require("express");

const app = express();


app.use(logger, checkPermission);

app.get("/books", logger, (req, res) => {
    return res.send(
        { route: "/books", role: req.role, permission : req.response}
    );
})

app.get("/libraries", logger, checkPermission("librarian"), (req, res) => {
    return res.send(
        { route: "/libraries", role: req.role, permission : req.response}
    );
})

app.get("/authors", logger, checkPermission("author"), (req, res) => {
    return res.send(
        { route: "/authors", role: req.role, permission : req.response}
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

function checkPermission(Permission){

    return function logger(req, res, next){
        if(Permission == "author"){
            req.response = "true";
         } else if(Permission == "librarian") {
             req.response = "true";
         }
     
         console.log(req.path);
         next();
    }

    
}


app.listen("5000", ()=> {
    console.log("Server is running on 5000");
})