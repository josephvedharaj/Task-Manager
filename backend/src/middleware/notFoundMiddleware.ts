import { Request, Response, NextFunction } from "express"

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  throw new Error(`Route not found - ${req.originalUrl}`)
}

export default notFound