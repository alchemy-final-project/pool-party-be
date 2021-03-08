const pool = require('../utils/pool');

module.exports = class Tenant {
    id;
    name;
    email;
    passwordHash;
    propertyAddress;
    ownerId;
    monthlyCost;

    constructor(row) {
      this.id = String(row.id);
      this.name = row.name;
      this.email = row.email;
      this.passwordHash = row.password_hash;
      this.propertyAddress = row.property_address;
      this.ownerId = row.owner_id;
      this.monthlyCost = row.monthly_cost;
    }

    //will insert include connectedAcctId or is that derived from propAddress? -- will have a GET request eventually hooked up to input, but for now tenant will enter
    static async insert({ name, email, passwordHash, propertyAddress, ownerId, monthlyCost }) {
      const { rows } = await pool.query(
        'INSERT INTO tenants (name, email, password_hash, property_address, owner_id, monthly_cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, email, passwordHash, propertyAddress, ownerId, monthlyCost]
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
            `SELECT FROM tenants WHERE email=$1`,
            [email]
        );

        if (!rows[0]) throw new Error(`There is no tenant with email ${email}`);

      return new Tenant(rows[0]);
    }

    //will update include connectedAcctId or is that derived from propAddress?
    static async update(id, { name, email, passwordHash, propertyAddress, ownerId, monthlyCost }) {
      const { rows } = await pool.query(
        `UPDATE tenants
            SET name=$1,
            email=$2,
            password_hash=$3,
            property_address=$4,
            owner_id=$5,
            monthly_cost=$6
            WHERE id=$7
            RETURNING *`,
        [name, email, passwordHash, propertyAddress, ownerId, monthlyCost, id]
      );

      if(!rows[0]) throw new Error(`There is no tenant with id ${id}`);

      return new Tenant(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM tenants WHERE id=$1 RETURNING *',
        [id]
      );

      if(!rows[0]) throw new Error(`There is no tenant with id ${id}`);

      return new Tenant(rows[0]);
    }

    toJSON() {
      const json = { ...this };
      delete json.passwordHash;
      return json;
    }

};
