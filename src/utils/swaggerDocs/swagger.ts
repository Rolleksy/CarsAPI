import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import dotenv from 'dotenv';
import {
  carSchema,
  createCarSchema,
  createCarSummarySchema,
  createMultipleCarsSchema,
} from './carSchema';
import { loginUserSchema, userSchema } from './userSchema';

dotenv.config();

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Dataset API',
      version: '0.0.0',
      description:
        'This is a simple API using express and sqlite for a car dataset, which data was imported from a CSV file',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
    components: {
      schemas: {
        Car: carSchema,
        CreateCar: createCarSchema,
        CreateCarSummary: createCarSummarySchema,
        CreateMultipleCars: createMultipleCarsSchema,
        RegisterUser: userSchema,
        LoginUser: loginUserSchema,
      },
    },
  },

  apis: ['./src/users/*.routes.ts', './src/cars/*.routes.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
