import express from 'express';
import { UserDBService } from './data/UserDatabase';
import { getCarRoutes } from './cars/car.routes';
import { getUserRoutes } from './users/user.routes';
import CarDBService from './data/CarDatabase';
import { setupSwagger } from './utils/swaggerDocs/swagger';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const carTableName = 'cars';
const pathToCarsDb = `./data/${carTableName}.db`;
const userTableName = 'users';
const pathToUsersDb = `./data/${userTableName}.db`;

async function startServer() {
  try {
    const userDbInstance = await UserDBService.getInstance(pathToUsersDb);
    const userRoutes = await getUserRoutes(userDbInstance);

    const carDbInstance = await CarDBService.getInstance(pathToCarsDb);
    const carRoutes = await getCarRoutes(carDbInstance);

    setupSwagger(app);

    app.use(express.json());
    app.use(cookieParser());

    app.use('/api', carRoutes);

    app.use('/auth', userRoutes);

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
