const Transaction = require('../models/Transaction');

module.exports = class TransactionService {
    static async create({ ownerId, tenantId, paymentMethodId, amount }) {
        //const rentYear = req.body
        //const rentMonth = req.body
        //const paymentIntentId = from Stripe(create)
        const transaction = await Transaction.insert({ ownerId, tenantId, paymentMethodId, paymentIntentId, rentYear, rentMonth, amount, paymentConfirmed: false });

        return transaction;
    }
}
