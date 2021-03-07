const pool = require('../utils/pool');

module.exports = class Owner {
    connectedAcctId;
    propertyAddress;

    constructor(row) {
        this.connectedAcctId = row.connected_acct_id;
        this.propertyAddress = row.property_address;
    }

    static async insert({ connectedAcctId, propertyAddress }) {
        const { rows } = await pool.query(
            'INSERT INTO owners (connected_acct_id, property_address) VALUES ($1, $2) RETURNING *',
            [connectedAcctId, propertyAddress]
        );

        return new Owner(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM owners'
        );

        return rows.map(row => new Owner(row));
    }

    static async findById(connectedAcctId) {
        const { rows } = await pool.query(
            `SELECT FROM owners WHERE connected_acct_id=$1`,
            [connectedAcctId]
        );

        if (!rows[0]) throw new Error(`No owner with Connected Acct Id: ${connectedAcctId}`);

        return new Owner(rows[0]);
    }
}
