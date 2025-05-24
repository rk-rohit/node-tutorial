const http = require("http");
const fs = require("fs");
const url = require("url");


const productData = fs.readFileSync("./product.json", 'utf-8');
const productCard = fs.readFileSync("./template/product-card.html", 'utf-8');
const productList = fs.readFileSync("./template/product.html", 'utf-8');
const productDetails = fs.readFileSync("./template/product-detail.html", 'utf-8');
const notfoundPage = fs.readFileSync("./template/not-found.html", 'utf-8');

// Function to replace all {{key}} in the template with values
function applyTemplate(templateStr, data) {
    return templateStr.replace(/{{(.*?)}}/g, (match, key) => data[key.trim()] ?? '');
}

const productDataJSON = JSON.parse(productData)
const products = productDataJSON?.products;

const server = http.createServer((req, res)=>{
    const { pathname, query } = url.parse(req.url, true);
    if (pathname == "/" || pathname == '/product') {
        const productHtml = products.map(product=>applyTemplate(productCard, product)).join("");
        const productListHTML = productList.replace("{{productcard}}", productHtml)
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(productListHTML);
    } else if (pathname == "/product-detail") {
        const productHTML = applyTemplate(productCard, products.find(product => product.id == query.id) || products[0]);
        const productDetailHTML = productDetails.replace("{{productcard}}", productHTML);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(productDetailHTML);
    }  else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        res.end(notfoundPage);
    }  
});

server.listen(8000, "127.0.0.1", ()=>{
    console.log("server is running on port 8000");
});