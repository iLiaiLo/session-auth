import { destroySession } from "../../utils/session.js";

const logout = async (req, res) => {
  try {
    await destroySession(req);
    res.clearCookie("sessionId", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "user successfully logged out",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default logout;
