const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const productRoutes = require("./routes/productRoutes");
const shopRoutes = require("./routes/shopRoutes");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use("/admin", productRoutes);
app.use("/", shopRoutes);

app.use(express.static(path.join(__dirname, "public")))

//error page
app.use((req, res)=>{
    res.render("error");
})

app.listen(3000);