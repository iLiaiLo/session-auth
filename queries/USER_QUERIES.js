const findUser = "SELECT * FROM users_schema.users WHERE email = $1";
const insertUser = `INSERT INTO users_schema.users (id,username, email, password) VALUES ($1, $2, $3, $4);`;
const findUserByid = `SELECT username FROM users_schema.users WHERE id=$1`;
export { insertUser, findUser, findUserByid };
