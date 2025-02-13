import { Request, Response, NextFunction } from 'express';
import {
  registerUserValidationSchema,
  loginUserValidationSchema,
} from './userValidationSchema';
import { User } from '../../../types/User';

async function validateRegisterUser(user: User) {
  const userSchema = await registerUserValidationSchema();

  const { error, value } = userSchema.validate(user);

  if (error) {
    return {
      success: false,
      errors: error.details.map((e) => e.message),
    };
  }
  return { success: true, data: value };
}

export async function validateRegisterUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const validationResult = await validateRegisterUser(req.body);

    if (!validationResult.success) {
      res
        .status(400)
        .json({ error: `Validation error: ${validationResult.errors}` });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function validateLoginUser(user: Omit<User, 'username'>) {
  const userSchema = await loginUserValidationSchema();

  const { error, value } = userSchema.validate(user);

  if (error) {
    return {
      success: false,
      errors: error.details.map((e) => e.message),
    };
  }
  return { success: true, data: value };
}

export async function validateLoginUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const validationResult = await validateLoginUser(req.body);

    if (!validationResult.success) {
      res
        .status(400)
        .json({ error: `Validation error: ${validationResult.errors}` });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
}
