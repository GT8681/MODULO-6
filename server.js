const express = require('express');
const cors = require('cors');


const startServer = require('./database/index');


const authorRoutes = require('./modules/author/author.route');
const blogRoutes = require('./modules/blogPost/blog.route');
const userRoutes = require('./users/users.route');
const commentRoutes = require('./modules/comment/comment.route');


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





app.use("/", commentRoutes);
app.use("/", authorRoutes);
app.use("/", blogRoutes);
app.use("/", userRoutes);




startServer(PORT, app);