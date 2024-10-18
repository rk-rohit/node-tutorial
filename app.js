const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use("/add-product", (req,res, next)=>{
    res.send("<html><form method='post' action='/product'><input name='message'><button type='submit'>Send</button></form>");
});

app.post("/product", (req, res, next)=>{
    console.log("body", req.body);
    res.redirect("/");
})

app.use("/", (req, res, next)=>{
    res.send("<h1>this is node express</h1>")
})

app.listen(3000);