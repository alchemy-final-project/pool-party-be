const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('shorten-be routes', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
    });

    it('passes', () => {
        const response = 'true';
        expect(response).toEqual('true');
    });
});
