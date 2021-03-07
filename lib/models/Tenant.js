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

    //will insert include connectedAcctId or is that derived from propAddress?
    static async insert({ name, email, password, propertyAddress, connectedAcctId, monthlyCost }) {
        const { rows } = await pool.query(
            `INSERT INTO tenants (name, email, password, property_address, connected_acct_id, monthly_cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, email, password, propertyAddress, connectedAcctId, monthlyCost]
        );

        return new Tenant(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM tenants'
        );

        return rows.map(row => new Tenant(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT FROM tenants WHERE id=$1`,
            [id]
        );

        if (!rows[0]) throw new Error(`There is no tenant with id ${id}`);

        return new Tenant(rows[0]);
    }

    //will update include connectedAcctId or is that derived from propAddress?
    static async update(id, { name, email, password, propertyAddress, connectedAcctId, monthlyCost }) {
        const { rows } = await pool.query(
            `UPDATE tenants
            SET name=$1,
            email=$2,
            password=$3,
            property_address=$4,
            connected_acct_id=$5,
            monthly_cost=$6
            WHERE id=$7
            RETURNING *`,
            [name, email, password, propertyAddress, connectedAcctId, monthlyCost, id]
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
}
