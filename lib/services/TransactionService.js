const Transaction = require('../models/Transaction');

module.exports = class TransactionService {
    static async create({ ownerId, tenantId, paymentMethodId, amount }) {
        //const rentYear =
        //const rentMonth =
        //const paymentIntentId = from Stripe(create)
        const transaction = await Transaction.insert({ ownerId, tenantId, paymentMethodId, paymentIntentId, rentYear, rentMonth, amount, paymentConfirmed: false });

        return transaction;
    }
}
