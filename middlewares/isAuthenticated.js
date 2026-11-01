const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      message:
        "Your session has expired or is no longer valid. Please log in again.",
    });
  }

  next();
};

export default isAuthenticated;
