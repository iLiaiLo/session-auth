const createUsersTable = `CREATE TABLE IF NOT EXISTS users_schema.users(
    id UUID UNIQUE NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);`;
export default createUsersTable;
