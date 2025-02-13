import { Request, Response, NextFunction } from 'express';

interface Pagination {
  page: number;
  limit: number;
  offset: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    pagination?: Pagination;
  }
}

export const paginateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const maxLimit = 100;
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 10, maxLimit);
  const offset = (page - 1) * limit;

  req.pagination = {
    page,
    limit,
    offset,
  };

  next();
};
