const express = require('express');
const cors = require('cors');


const startServer = require('./database/index');


const authorRoutes = require('./author/author.route');
const blogRoutes = require('./blogPost/blog.route');
const checkAuth = require('./middlewares/index');
const counterRichieste = require('./middlewares/counterRichieste');
const logDataRichiesta = require('./middlewares/logDataRichiesta');
const counterVisitator = require('./middlewares/counterVisitator');


const PORT = 4545;



const app = express();

app.use(cors());
app.use(express.json());
app.use(checkAuth);
app.use(counterRichieste);
app.use(logDataRichiesta);
app.use(counterVisitator);



app.use("/", authorRoutes);
app.use("/", blogRoutes);



startServer(PORT, app);