const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');

router.post('/addexpense', expenseController.addExpense);
router.get('/getexpenses', expenseController.getExpense);
router.delete('/deleteexpense/:expenseId', expenseController.deleteExpense);

module.exports = router;