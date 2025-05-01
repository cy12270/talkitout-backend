const db = require('./db');

const init = async () => {
    await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
    console.log('Users table initialized');
};

const getUsers = async () => {
    const { rows } = await db.query('SELECT * FROM users');
    return rows;
};

const getUserById = async (id) => {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
};

const createUser = async (name, email) => {
    const { rows } = await db.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
    return rows[0];
};

const updateUser = async (id, name, email) => {
    const { rows } = await db.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
    );
    return rows[0];
};

const deleteUser = async (id) => {
    const { rows } = await db.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id]
    );
    return rows[0];
};

module.exports = {
    init,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};