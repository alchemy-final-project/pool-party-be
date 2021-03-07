INSERT INTO owners (connected_acct_id, property_address) VALUES 
('acct_1IQL66IeCmjuYBJU', '8 Byte Drive Apt C, Loma Vista, CA 90210');

INSERT INTO tenants (name, email, password, property_address, connected_acct_id, monthly_cost) VALUES 
('tenant-A', 'tenant-A@gmail.com', '1234', '8 Byte Drive Apt C, Loma Vista, CA 90210', 'acct_1IQL66IeCmjuYBJU', 500),
('tenant-B', 'tenant-B@gmail.com', 'pswd', '8 Byte Drive Apt C, Loma Vista, CA 90210', 'acct_1IQL66IeCmjuYBJU', 400),
('tenant-C', 'tenant-C@gmail.com', 'hullo', '8 Byte Drive Apt C, Loma Vista, CA 90210', 'acct_1IQL66IeCmjuYBJU', 500);
