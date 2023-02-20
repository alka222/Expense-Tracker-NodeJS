const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json({extended: true}));

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const Expense = require('./models/expenses');
const User = require('./models/users');

app.use(cors());

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()
.then(result => {
    app.listen(3000)
})
.catch(err => console.log(err));

