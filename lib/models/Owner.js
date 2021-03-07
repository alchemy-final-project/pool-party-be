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
}
