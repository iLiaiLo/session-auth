import { pool } from "../../db/connection.js";
import { findUserByid } from "../../queries/USER_QUERIES.js";

const greetUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    const userData = await pool.query(findUserByid, [userId]);

    const { username } = userData.rows[0];
    return res.status(200).json({ message: `hello ${username}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default greetUser;
