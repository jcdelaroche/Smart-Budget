const express = require("express");
const { validateTransaction } = require("../middlewares/validateTransaction");

const {
    createTransaction,
    getIncomesByProject,
    getExpensesByProject,
    updateTransaction,
    deleteTransaction,
    } = require("./transactions.controller");

const router = express.Router();

router.route("").post(validateTransaction, createTransaction);
router.route("/:id").put(updateTransaction).delete(deleteTransaction);
router.route("/incomes/:id").get(getIncomesByProject);
router.route("/expenses/:id").get(getExpensesByProject);

module.exports = router;