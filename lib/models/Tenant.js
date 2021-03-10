const pool = require('../utils/pool');

module.exports = class Tenant {
  id;
  name;
  email;
  passwordHash;
  ownerId;
  monthlyCost;

  constructor(row) {
    this.id = String(row.id);
    this.name = row.name;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.ownerId = row.owner_id;
    this.monthlyCost = row.monthly_cost;
  }

  //will insert include connectedAcctId or is that derived from propAddress? -- will have a GET request eventually hooked up to input, but for now tenant will enter
  static async insert({ name, email, passwordHash, ownerId, monthlyCost }) {
    const { rows } = await pool.query(
      'INSERT INTO tenants (name, email, password_hash, owner_id, monthly_cost) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, passwordHash, ownerId, monthlyCost]
    );

    return new Tenant(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM tenants'
    );

    return rows.map(row => new Tenant(row));
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM tenants WHERE email=$1',
      [email]
    );

    if (!rows[0]) throw new Error(`There is no tenant with email ${email}`);

    return new Tenant(rows[0]);
  }

  static async findByOwnerId(ownerId) {
    const { rows } = await pool.query(
      'SELECT * FROM tenants WHERE owner_id=$1',
      [ownerId]
    );

    return rows.map(row => new Tenant(row));
  }

  static async findConnectedAcct(email) {
    const { rows } = await pool.query(
      `SELECT * FROM tenants 
      JOIN owners
      ON owners.id = tenants.owner_id
      WHERE email=$1`,
      [email]
    );

    return new Tenant(rows[0]);
  }

  //will update include connectedAcctId or is that derived from propAddress?
  static async update(id, { name, email, passwordHash, ownerId, monthlyCost }) {
    const { rows } = await pool.query(
      `UPDATE tenants
            SET name=$1,
            email=$2,
            password_hash=$3,
            owner_id=$4,
            monthly_cost=$5
            WHERE id=$6
            RETURNING *`,
      [name, email, passwordHash, ownerId, monthlyCost, id]
    );

    if (!rows[0]) throw new Error(`There is no tenant with id ${id}`);

    return new Tenant(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM tenants WHERE id=$1 RETURNING *',
      [id]
    );

    if (!rows[0]) throw new Error(`There is no tenant with id ${id}`);

    return new Tenant(rows[0]);
  }

  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    return json;
  }

};
