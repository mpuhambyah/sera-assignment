const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./app/routes/product.routes.js");
const swaggerUi = require('swagger-ui-express');
const apiDocumentation = require('./apidocs.json');


const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));
mongoose.connect("mongodb://localhost:27017/db_restful", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connected'));

app.use(cors());
app.use(express.json());
app.use('/api/products', route);

app.listen('3000', () => console.log('Server running at port: 3000'));