const express = require('express');
const cors = require('cors');


const startServer = require('./database/index');
const app = express();

app.use(cors());
app.use(express.json());

//routers
const authorRoutes = require('./modules/author/author.route');
const blogRoutes = require('./modules/blogPost/blog.route');
const userRoutes = require('./users/users.route');
const commentRoutes = require('./modules/comment/comment.route');
const authRoutes = require('./modules/auth/auth.router');


// middelwares

const checkAuth = require('./middlewares/index');
const counterRichieste = require('./middlewares/counterRichieste');
const logDataRichiesta = require('./middlewares/logDataRichiesta');
const counterVisitator = require('./middlewares/counterVisitator');
const verifyToken = require('./middlewares/verifityToken')



const PORT = 4545;



//app.use(verifyToken);
//app.use(checkAuth);
//app.use(counterRichieste);
//app.use(logDataRichiesta);
//app.use(counterVisitator);



app.use("/", commentRoutes);
app.use("/", authorRoutes);
app.use("/blogPost", blogRoutes);
app.use("/auth", authRoutes);
app.use("/", userRoutes);


startServer(PORT, app);