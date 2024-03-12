const express = require('express');

require('dotenv').config();
require('./db/connect')();

const app = express();
const usersRoute = require('./resources/users/users.route');
const projectsRoute = require('./resources/projects/projects.route');
const transactionsRoute = require('./resources/transactions/transactions.route');
const { authentification } = require('./resources/middlewares/authentification');

const getInfo = (req, res, next) => {
    console.log('Request Type:', req.method);
    console.log('Request URL:', req.originalUrl);
    console.log('Request body:', req.body);
    next();
};

const cors = require('cors');
app.use(cors({origin: '*'}));

app.use(express.json());
app.use(getInfo);
app.use('/api/users', usersRoute);
app.use('/api/projects', authentification, projectsRoute);
app.use('/api/transactions', authentification, transactionsRoute);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.clear();
    console.log(`Server is running on port ${port}`);
    }
);