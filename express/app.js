const express = require('express');
const app = express();

const productRouter = require("./routes/product-route");

// middleware
app.use(express.json())
app.use((req, res, next)=>{
    req.requestedAt = new Date().toISOString();
    next();
})

//route
app.use("/api/v1/product", productRouter);

module.exports = app;