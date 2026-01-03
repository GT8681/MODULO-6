const express = require('express');
const cors = require('cors');


const startServer = require('./database/index');
const authorRoutes = require('./author/author.route');

const PORT = 4545;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", authorRoutes);



startServer(PORT, app);