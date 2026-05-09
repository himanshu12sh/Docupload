import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      })
    }

    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    )

    req.user = decoded

    next()
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    })
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin only",
    })
  }

  next()
}