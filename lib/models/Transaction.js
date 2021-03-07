const pool = require('../utils/pool');

module.exports = class Transaction {
    id;
    connectedAcctId;
    tenantId;
    paymentMethodId;
    paymentIntentId;
    rentYear;
    rentMonth;
    amount;
    paymentConfirmed;

    constructor(rows) {
        this.id = String(row.id);
        this.connectedAcctId = row.connected_acct_id;
        this.tenantId = row.tenant_id;
        this.paymentMethodId = row.payment_method_id;
        this.paymentIntentId = row.payment_intent_id;
        this.rentYear = row.rent_year;
        this.rentMonth = row.rent_month;
        this.amount = row.amount;
        this.paymentConfirmed = row.payment_confirmed;
    }

    static async insert({ connectedAcctId, tenantId, paymentMethodId, paymentIntentId, rentYear, rentMonth, amount, paymentConfirmed }) {
        const { rows } = await pool.query(
            `INSERT INTO transactions (connected_acct_id, tenant_id, payment_method_id, payment_intent_id, rent_year, rent_month, amount, payment_confirmed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [connectedAcctId, tenantId, paymentMethodId, paymentIntentId, rentYear, rentMonth, amount, paymentConfirmed]
        );

        return new Transaction(rows[0]);
    }
}
