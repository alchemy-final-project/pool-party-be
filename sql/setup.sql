DROP TABLE IF EXISTS owners CASCADE;
DROP TABLE IF EXISTS tenants CASCADE;
DROP TABLE IF EXISTS transactions;

CREATE TABLE owners (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    connected_acct_id VARCHAR NOT NULL,
    property_address VARCHAR NOT NULL
);

CREATE TABLE tenants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL,
    -- property_address VARCHAR NOT NULL,
    owner_id BIGINT REFERENCES owners(id),
    -- payment_method_id VARCHAR NOT NULL,
    monthly_cost INTEGER NOT NULL
);

CREATE TABLE transactions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id BIGINT REFERENCES owners(id),
    tenant_id BIGINT REFERENCES tenants(id),
    payment_method_id VARCHAR NOT NULL,
    payment_intent_id VARCHAR NOT NULL,
    rent_year INTEGER NOT NULL,
    rent_month INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    payment_confirmed BOOLEAN NOT NULL
);
