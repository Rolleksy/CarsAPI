import { Request, Response, NextFunction } from 'express';

const ALLOWED_SORT_FIELDS = ['Make', 'Model', 'Year_from', 'Year_to'];
const DEFAULT_SORT_FIELD = 'Make';

export const sortingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { sort, order } = req.query;
  if (
    !sort ||
    typeof sort !== 'string' ||
    !ALLOWED_SORT_FIELDS.includes(sort)
  ) {
    sort = DEFAULT_SORT_FIELD;
  }
  if (
    !order ||
    typeof order !== 'string' ||
    (order !== 'asc' && order !== 'desc')
  ) {
    order = 'asc';
  }

  req.query.sort = sort;
  req.query.order = order;
  next();
};
