import { pool } from "../../db/connection.js";
import bcrypt from "bcrypt";
import { regenerateSession, saveSession } from "../../utils/session.js";
import { findUser } from "../../queries/USER_QUERIES.js";
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const result = await pool.query(findUser, [email]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    await regenerateSession(req);

    req.session.userId = user.id;

    await saveSession(req);

    return res.status(200).json({ message: "user logged in successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default login;
