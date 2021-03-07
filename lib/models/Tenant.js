const pool = require('../utils/pool');

module.exports = class Tenant {
    id;
    name;
    email;
    password;
    propertyAddress;
    connectedAcctId;
    monthlyCost;

    constructor(row) {
        this.id = String(row.id);
        this.name = row.name;
        this.email = row.email;
        this.password = row.password;
        this.propertyAddress = row.property_address;
        this.connectedAcctId = row.connected_acct_id;
        this.monthlyCost = row.monthly_cost;
    }

    static async insert({ name, email, password, propertyAddress, connectedAcctId, monthlyCost }) {
        const { rows } = await pool.query(
            `INSERT INTO tenants (name, email, password, property_address, connected_acct_id, monthly_cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, email, password, propertyAddress, connectedAcctId, monthlyCost]
        );

        return new Tenant(rows[0]);
    }
}
