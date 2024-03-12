const projectModel = require('../projects/projects.model');
const transactionModel = require('./transactions.model');

module.exports = {
    async createTransaction(req, res) {
        try {
            const transaction = await transactionModel.create(req.body);
            const project = await projectModel.findById(req.body.project);
            if (!project) {
                return res.status(404).json({ ok: false, data: 'Project not found' });
            }
            switch (transaction.type) {
                case 'income':
                    project.incomes.push(transaction._id);
                    break;
                case 'expense':
                    project.expenses.push(transaction._id);
                    break;
                default:
                    break;
            }
            await project.save();
            return res.status(201).json({ ok: true, data: transaction });
        } catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    },
    async getIncomesByProject(req, res) {
        try {
            const project = await projectModel.findById(req.params.id).populate('incomes');
            return res.status(200).json({ ok: true, data: project.incomes });
        }
        catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    },
    async getExpensesByProject(req, res) {
        try {
            const project = await projectModel.findById(req.params.id).populate('expenses');
            return res.status(200).json({ ok: true, data: project.expenses });
        } catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    },
    async updateTransaction(req, res) {
        try {
            const transaction = await transactionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!transaction) {
                return res.status(404).json({ ok: false, data: 'Transaction not found' });
            }
            return res.status(200).json({ ok: true, data: transaction });
        } catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    },
    async deleteTransaction(req, res) {
        try {
            
            const transaction = await transactionModel.findByIdAndDelete(req.params.id);
            if (!transaction) {
                return res.status(404).json({ ok: false, data: 'Transaction not found' });
            }
            const project = await projectModel.findById(transaction.project);
            switch (transaction.type) {
                case 'income':
                    project.incomes = project.incomes.filter(e => e.toString() !== transaction._id.toString());
                    break;
                case 'expense':
                    project.expenses = project.expenses.filter(e => e.toString() !== transaction._id.toString());
                    break;
                default:
                    break;
            }
            await project.save();
            return res.status(200).json({ ok: true, data: transaction });
        } catch (error)
        {
            return res.status(500).json({ ok: false, data: error.message });
        }
    }
}