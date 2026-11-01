import bcrypt from "bcrypt";
import { pool } from "../../db/connection.js";
import { regenerateSession, saveSession } from "../../utils/session.js";
import { findUser, insertUser } from "../../queries/USER_QUERIES.js";
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await pool.query(findUser, [email]);

    if (existingUser.rowCount) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = crypto.randomUUID();

    await pool.query(insertUser, [userId, username, email, hashedPassword]);

    await regenerateSession(req);

    req.session.userId = userId;

    await saveSession(req);

    return res
      .status(201)
      .json({ message: "user created successfully and logged in" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default signup;
