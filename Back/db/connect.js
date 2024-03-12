const mongoose = require('mongoose');

module.exports = async () => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@smartbudget.vw7vftz.mongodb.net/?retryWrites=true&w=majority&appName=SmartBudget`;
    try {
        await mongoose.connect(uri);
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
}; 

