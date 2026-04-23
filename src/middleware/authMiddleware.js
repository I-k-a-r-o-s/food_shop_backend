import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token!",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body = req.body || {};
    req.body.userId = decode.id;
    next();
  } catch (error) {
    console.log("Error in authMiddleware!:", error.message);
    return res.status(401).json({
      success: false,
      message: "Token verification failed!",
    });
  }
};
