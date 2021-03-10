const Owner = require('../models/Owner');
const Tenant = require('../models/Tenant');
const Transaction = require('../models/Transaction');

const stripe = require('stripe')('sk_test_51IQLH1AlZQgGODSJGfr0Py4pIVWNOGSXJYuJyFEnoqbXOLORfwRdMIsf21nzXlkk3T8AUCK2u39mqv4TH32edFri00wIslVheu');

module.exports = class TransactionService {
  static async create({ ownerId, tenantId, paymentMethodId, amount, rentYear, rentMonth }) {

    const owner = await Owner.findById(ownerId);

    const response = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      payment_method: paymentMethodId,
      amount,
      currency: 'usd',
      transfer_data: {
        destination: owner.connectedAcctId
      }
    });

    const paymentIntentId = response.id;

    const transaction = await Transaction.insert({ ownerId, tenantId, paymentMethodId, paymentIntentId, rentYear, rentMonth, amount, paymentConfirmed: false });

    const pool = await Tenant.findByOwnerId(ownerId);
    const pooledPayments = await Transaction.findByPaymentPool(rentMonth, rentYear, ownerId);

    if (pool.length === pooledPayments.length) {

      await Promise.all(pooledPayments.map(payment => {
        return Promise.all([
          Transaction.confirmById(payment.id),
          stripe.paymentIntents.confirm(
            payment.paymentIntentId,
            { payment_method: payment.paymentMethodId }
          )
        ]);
      }));
    }

    return transaction;
  }
};
