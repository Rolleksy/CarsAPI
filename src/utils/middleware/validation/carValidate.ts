import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import {
  getCarJoiSchema,
  getCarMakeSchema,
  getCarModelSchema,
  getCarYearSchema,
} from './carValidationSchema';

async function validateCriteria(criteria: object[]) {
  const schema = Joi.array()
    .items(await getCarJoiSchema())
    .options({ abortEarly: false }); // false will return all errors, true will stop and return only the first one

  const { error, value } = schema.validate(criteria);

  if (error) {
    return {
      success: false,
      errors: error.details.map((e) => e.message),
    };
  }
  return { success: true, data: value };
}

export async function validateCriteriaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const validationResult = await validateCriteria(req.body);

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

async function validateSingleCar(car: object) {
  const schema = await getCarJoiSchema();
  schema.options({ abortEarly: false }); // false will return all errors, true will stop and return only the first one

  const { error, value } = schema.validate(car);

  if (error) {
    return {
      success: false,
      errors: error.details.map((e) => e.message),
    };
  }
  return { success: true, data: value };
}

export async function validateSingleCarMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const validationResult = await validateSingleCar(req.body);

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

async function validateDeleteMultipleCars(payload: { ids: number[] }) {
  const schema = Joi.object({
    ids: Joi.array().items(Joi.number().required()).required(),
  });

  const { error, value } = schema.validate(payload);

  if (error) {
    return {
      success: false,
      errors: error.details.map((e) => e.message),
    };
  }
  return { success: true, data: value };
}

export async function validateDeleteMultipleCarsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const validationResult = await validateDeleteMultipleCars(req.body);

    if (!validationResult.success) {
      res
        .status(400)
        .json({ error: `Validation error: ${validationResult.errors}` });
      return;
    }
    next();
    /* eslint-disable-next-line */
  } catch (error: Error | any) {
    throw new Error(error);
    return;
  }
}

async function validateId(payload: number) {
  const schema = Joi.number().required();
  const { error, value } = schema.validate(payload);

  if (error) {
    return {
      success: false,
      errors: error.details.map((e) => e.message),
    };
  }
  return { success: true, data: value };
}

export async function validateIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const validationResult = await validateId(parseInt(req.params.id));

    if (!validationResult.success) {
      res
        .status(400)
        .json({ error: `Validation error: ${validationResult.errors}` });
      return;
    }
    next();
    /* eslint-disable-next-line */
  } catch (error: Error | any) {
    throw new Error(error);
    return;
  }
}

async function validateGetCarsByMake(payload: string) {
  const schema = await getCarMakeSchema();

  const { error, value } = schema.validate(payload);

  if (error) {
    return {
      success: false,
      errors: error.details.map((e) => e.message),
    };
  }
  return { success: true, data: value };
}

export async function validateGetCarsByMakeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const validationResult = await validateGetCarsByMake(req.params.make);

    if (!validationResult.success) {
      res
        .status(400)
        .json({ error: `Validation error: ${validationResult.errors}` });
      return;
    }
    next();
    /* eslint-disable-next-line */
  } catch (error: Error | any) {
    throw new Error(error);
    return;
  }
}

async function validateGetCarsByModel(payload: string) {
  const schema = await getCarModelSchema();

  const { error, value } = schema.validate(payload);

  if (error) {
    return {
      success: false,
      errors: error.details.map((e) => e.message),
    };
  }
  return { success: true, data: value };
}

export async function validateGetCarsByModelMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const validationResult = await validateGetCarsByModel(req.params.model);

    if (!validationResult.success) {
      res
        .status(400)
        .json({ error: `Validation error: ${validationResult.errors}` });
      return;
    }
    next();
    /* eslint-disable-next-line */
  } catch (error: Error | any) {
    throw new Error(error);
    return;
  }
}

async function validateGetCarYear(payload: number) {
  const schema = await getCarYearSchema();

  const { error, value } = schema.validate(payload);

  if (error) {
    return {
      success: false,
      errors: error.details.map((e) => e.message),
    };
  }
  return { success: true, data: value };
}

export async function validateGetCarYearMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const validationResult = await validateGetCarYear(
      parseInt(req.params.year),
    );

    if (!validationResult.success) {
      res
        .status(400)
        .json({ error: `Validation error: ${validationResult.errors}` });
      return;
    }
    next();
    /* eslint-disable-next-line */
  } catch (error: Error | any) {
    throw new Error(error);
    return;
  }
}
