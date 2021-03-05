DROP TABLE IF EXISTS owners CASCADE;
DROP TABLE IF EXISTS tenants CASCADE;
DROP TABLE IF EXISTS transactions;

CREATE TABLE owners (
    connected_acct_id VARCHAR PRIMARY KEY NOT NULL,
    property_address VARCHAR NOT NULL
);

CREATE TABLE tenants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    property_address VARCHAR NOT NULL,
    connected_acct_id VARCHAR NOT NULL,
    -- payment_method_id VARCHAR NOT NULL,
    monthly_cost INTEGER NOT NULL
);

CREATE TABLE transactions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    connected_acct_id REFERENCES owners(connected_acct_id) NOT NULL,
    tenant_id BIGINT REFERENCES tenants(id) NOT NULL,
    payment_method_id VARCHAR NOT NULL,
    payment_intent_id VARCHAR NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    payment_confirmed BOOLEAN NOT NULL
);
