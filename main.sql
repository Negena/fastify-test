CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50),
    user_password VARCHAR(250),
    balance FLOAT
);

INSERT INTO clients (username,  user_password, email, balance) VALUES 
    ('user1', 'user1', 'email@g.com', 1000),
     ('user2', 'user2', 'email@g.com', 500);