const express = require("express");
const expressConfig = require('./config/express');
const router = require("./controllers/auth");


start();

async function start() {
    const app = express();

    expressConfig(app);

    app.use(router)
    app.get("/", (req,res)=>{
        res.render("home")
    })

    app.listen(3000, ()=> 'Server running on port 3000')
}
