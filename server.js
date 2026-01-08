const express = require('express');
const cors = require('cors');



const startServer = require('./database/index');
const authorRoutes = require('./author/author.route');
const blogRoutes = require('./blogPost/blog.route');


const PORT = 4545;


const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authorRoutes);
app.use("/", blogRoutes);



startServer(PORT, app);