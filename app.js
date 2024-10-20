const path = require("path");
const express = require("express");
const app = express();

const productRoutes = require("./routes/productRoutes");
const shopRoutes = require("./routes/shopRoutes");

app.use("/admin", productRoutes);
app.use("/", shopRoutes);

app.use(express.static(path.join(__dirname, "public")))

//error page
app.use((req, res)=>{
    res.status(400).sendFile(path.join(__dirname, "view", "error.html"));
})

app.listen(3000);