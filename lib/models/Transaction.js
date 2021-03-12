
const Tenant = require('../services/TenantService');
const pool = require('../utils/pool');

module.exports = class Transaction {
  id;
  ownerId;
  tenantId;
  paymentMethodId;
  paymentIntentId;
  rentYear;
  rentMonth;
  amount;
  paymentConfirmed;

  constructor(row) {
    this.id = String(row.id);
    this.ownerId = row.owner_id;
    this.tenantId = row.tenant_id;
    this.paymentMethodId = row.payment_method_id;
    this.paymentIntentId = row.payment_intent_id;
    this.rentYear = row.rent_year;
    this.rentMonth = row.rent_month;
    this.amount = row.amount;
    this.paymentConfirmed = row.payment_confirmed;
  }

  static async insert({ ownerId, tenantId, paymentMethodId, paymentIntentId, rentYear, rentMonth, amount, paymentConfirmed }) {
    const { rows } = await pool.query(
      'INSERT INTO transactions (owner_id, tenant_id, payment_method_id, payment_intent_id, rent_year, rent_month, amount, payment_confirmed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [ownerId, tenantId, paymentMethodId, paymentIntentId, rentYear, rentMonth, amount, paymentConfirmed]
    );

    return new Transaction(rows[0]);
  }

  static async findByOwnerId(ownerId) {
    const { rows } = await pool.query(
      'SELECT * FROM transactions WHERE owner_id=$1',
      [ownerId]
    );
    return rows.map(row => new Transaction(row));
  }

  static async findByPaymentPool(rentMonth, rentYear, ownerId) {
    const { rows } = await pool.query(
      `SELECT * FROM transactions 
      WHERE rent_month=$1
      AND
      rent_year=$2
      AND owner_id=$3`,
      [rentMonth, rentYear, ownerId]
    );
    return rows.map(row => new Transaction(row));
  }

  static async confirmById(id) {
    const { rows } = await pool.query(
      `UPDATE transactions 
      SET payment_confirmed=true
      WHERE id=$1
      RETURNING *`,
      [id]
    );

    return new Transaction(rows[0]);
  }

  static async getPaymentStatus(ownerId) {
    const { rows } = await pool.query(
      `SELECT 
        tenants.id,
        tenants.name,
        tenants.monthly_cost,
        transactions.payment_confirmed,
        transactions.rent_year,
        transactions.rent_month 
      FROM tenants 
      LEFT JOIN transactions
      ON tenants.id = transactions.tenant_id
      WHERE tenants.owner_id=$1`,
      [ownerId]
    );

    return rows;
  }
};
