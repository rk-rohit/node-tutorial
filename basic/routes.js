const fs = require('fs');

const requestHandler = (req, res)=>{
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write('<html>');
        res.write("<head><title>This is node.js</title></head>");
        res.write("<body><form method='POST' action='/message'><input type='text' name='message'><button type='submit'>send</button></form></body>");
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const data = []
        req.on("data", (chunnk)=>{
            console.log("chunk", chunnk);
            data.push(chunnk);
        });

        return req.on("end", ()=>{
            const parseBody = Buffer.concat(data).toString();
            const message = parseBody.split("=")[1];
            fs.writeFileSync("message.txt", message);
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        })
        
    }
    res.setHeader("Content-Type", "text/html");
    res.write('<html>');
    res.write("<head><title>This is node.js</title></head>");
    res.write("<body>This is node.js first program</body>");
    res.write("</html>");
    res.end();
};

module.exports = requestHandler;