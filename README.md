# Node Tutorial

This project demonstrates a basic HTTP server built using Node.js. It includes file system operations and routing for displaying a product list and product details.

## Folder: `http-server`

### Features

1. **HTTP Server**
   - Created a custom HTTP server using Node.js.

2. **File System Integration**
   - Used the file system module to read template files and a JSON file containing product data.

3. **Routing**
   - `/product`: Displays the list of all products.
   - `/product-detail?id={id}`: Displays the details of a specific product based on the provided `id`.

### How to Run

Open your terminal and run the following commands:

```bash
cd http-server
node index.js
```

Then open your browser and visit:

- [http://localhost:8000/product](http://localhost:8000/product) – Product List
- [http://localhost:8000/product-detail?id=2](http://localhost:8000/product-detail?id=2) – Product Detail (example with `id=2`)
