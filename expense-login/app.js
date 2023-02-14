const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json({extended: true}));

const userRoutes = require('./routes/user');

app.use(cors());

app.use('/user', userRoutes);

sequelize.sync()
.then(result => {
    app.listen(3000)
})
.catch(err => console.log(err));

