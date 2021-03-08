const pool = require('../utils/pool');

module.exports = class Owner {
    id;
    connectedAcctId;
    propertyAddress;

    constructor(row) {
        this.id = String(row.id);
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

    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT FROM owners WHERE id=$1`,
            [id]
        );

        if (!rows[0]) throw new Error(`No owner with Connected Acct Id: ${id}`);

        return new Owner(rows[0]);
    }

    //use connectedAcct vs BIGINT since might just change props?
    static async update({ connectedAcctId, propertyAddress }) {
        const { rows } = await pool.query(
            `UPDATE owners
            SET connected_acct_id=$1,
            property_address=$2
            RETURNING *`,
            [connectedAcctId, propertyAddress]
        );

        if (!rows[0]) throw new Error(`No owner with Connected Acct Id: ${connectedAcctId}`);

        return new Owner(rows[0]);
    }

    //use BIGINT id vs connectedAcct?
    static async delete(connectedAcctId) {
        const { rows } = await pool.query(
            'DELETE FROM owners WHERE connected_acct_id=$1 RETURNING *',
            [connectedAcctId]
        );

        if (!rows[0]) throw new Error(`No owner with Connected Acct Id: ${connectedAcctId}`);

        return new Owner(rows[0]);
    }
}
