import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload & { id: number; email: string };
  }
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }

  jwt.verify(
    token,
    process.env.SECRET as string,
    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
      if (err) {
        res
          .status(401)
          .json({ error: 'Unauthorized: Invalid or expired token' });
        return;
      }

      if (!decoded) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
        return;
      }

      req.user = decoded as JwtPayload & { id: number; email: string };
      next();
    },
  );
};
