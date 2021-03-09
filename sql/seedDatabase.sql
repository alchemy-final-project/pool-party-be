INSERT INTO owners (connected_acct_id, property_address) VALUES 
('acct_1IQL66IeCmjuYBJU', '8 Byte Drive Apt C, Loma Vista, CA 90210'),
('acct_1IQL66Ie12345678', '807 Bit Apt 1, Incline Village, NV 89451'),
('acct_1IQL66Ie91011121', '711 Code Ave, Portland, OR 97214');

INSERT INTO tenants (name, email, password_hash, property_address, owner_id, monthly_cost) VALUES 
('tenant-A', 'tenant-A@gmail.com', 'hashed1234', '8 Byte Drive Apt C, Loma Vista, CA 90210', 1, 500),
('tenant-B', 'tenant-B@gmail.com', 'hashedpswd', '8 Byte Drive Apt C, Loma Vista, CA 90210', 1, 400),
('tenant-C', 'tenant-C@gmail.com', 'hashedhullo', '8 Byte Drive Apt C, Loma Vista, CA 90210', 1, 500),
('tenant-D', 'tenant-D@gmail.com', 'hashednice', '807 Bit Apt 1, Incline Village, NV 89451', 2, 1200);
