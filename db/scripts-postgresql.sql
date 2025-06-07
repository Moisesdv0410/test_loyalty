-- Crear base de datos
CREATE DATABASE loyalty_system;

-- Usar la base de datos
\c loyalty_system;

-- Tabla de usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de transacciones
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(10) NOT NULL CHECK (type IN ('earn', 'redeem')),
    points INTEGER NOT NULL,
    amount DECIMAL(10,2), -- Para compras
    reward_id UUID, -- Para redenciones
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

-- Índices para optimizar consultas
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_type ON transactions(type);

-- Insertar algunos usuarios de prueba
INSERT INTO users (name) VALUES 
('Juan Pérez'),
('María García'),
('Carlos López');