import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret key
    // console.log(verifiedUser);
    req.user = verifiedUser; // Attach the user to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

export { authenticateToken };
