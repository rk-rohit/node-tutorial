const server = require("./app");

const PORT = 8000;
server.listen(PORT, ()=>{
    console.log(`server is listening at port ${PORT}`);
});
