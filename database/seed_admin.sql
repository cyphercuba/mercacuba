-- Seed Admin User for MercadoCuba
-- Email: admin@mercacuba.com
-- Password: admin123
-- Password Hash (SHA-256): 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9

INSERT OR IGNORE INTO users (id, first_name, last_name, email, phone, password_hash, role) 
VALUES (
  'admin-id-001', 
  'Administrador', 
  'MercadoCuba', 
  'admin@mercacuba.com', 
  '+1 000-000-0000', 
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 
  'admin'
);
