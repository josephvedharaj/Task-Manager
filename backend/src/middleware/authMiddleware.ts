import { Request, Response, NextFunction } from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"

import User from "../models/User"
import { JwtPayload } from "../types/interfaces"

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

      req.user = await User.findById(decoded.id).select("-password")

      next()

    } else {
      res.status(401)
      throw new Error("Unauthorized")
    }
  }
)

export default protect