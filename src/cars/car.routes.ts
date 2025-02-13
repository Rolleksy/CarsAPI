import { CarController } from './car.controller';
import { CarRepository } from './car.repository';
import { CarService } from './car.service';
import express from 'express';
import {
  validateCriteriaMiddleware,
  validateDeleteMultipleCarsMiddleware,
  validateGetCarsByMakeMiddleware,
  validateGetCarsByModelMiddleware,
  validateGetCarYearMiddleware,
  validateIdMiddleware,
  validateSingleCarMiddleware,
} from '../utils/middleware/validation/carValidate';
import { paginateMiddleware } from '../utils/middleware/pagination/paginationMiddleware';
import Database from 'better-sqlite3';
import { authMiddleware } from '../utils/middleware/auth/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management and retrieval
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve a list of cars
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination, default is 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page, default is 10
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCar'
 *     responses:
 *       201:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 * /api/cars/multiple:
 *   post:
 *     summary: Create multiple cars
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#components/schemas/CreateCar'
 *     responses:
 *       201:
 *         description: Cars created successfully
 */

/**
 * @swagger
 * /api/cars/update/{id}:
 *   put:
 *     summary: Update a car by ID
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCar'
 *     responses:
 *       200:
 *         description: Car updated successfully
 */
/**
 * @swagger
 * /api/cars/updatemultiple:
 *   put:
 *     summary: Update multiple cars
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: number
 *               cars:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Cars updated successfully
 */

/**
 * @swagger
 * /api/cars/delete/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 */

/**
 * @swagger
 * /api/cars/delete/multiple:
 *   post:
 *     summary: Delete multiple cars
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Cars deleted successfully
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Retrieve a car by ID
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Car ID
 *     responses:
 *       200:
 *         description: A car object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 * /api/cars/make/{make}:
 *   get:
 *     summary: Retrieve cars by make
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: make
 *         schema:
 *           type: string
 *         required: true
 *         description: Car make
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 * /api/cars/model/{model}:
 *   get:
 *     summary: Retrieve cars by model
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: model
 *         schema:
 *           type: string
 *         required: true
 *         description: Car model
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 * /api/cars/year/{year}:
 *   get:
 *     summary: Retrieve cars by year
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Car year
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 * /api/cars/year/since/{year}:
 *   get:
 *     summary: Retrieve cars since a specific year
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Car year
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 * /api/cars/year/until/{year}:
 *   get:
 *     summary: Retrieve cars until a specific year
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Car year
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 * /api/cars/search:
 *   post:
 *     summary: Search cars by criteria, e.g. Make, Model, all fields are NOT required
 *     tags: [Cars]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/CreateCar'
 *     responses:
 *       200:
 *         description: A list of cars matching the criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
export async function getCarRoutes(
  dbInstance: Database.Database,
): Promise<express.Router> {
  const carRepository = new CarRepository(dbInstance);
  const carService = new CarService(carRepository);
  const carController = new CarController(carService);

  router.get(
    '/cars',
    authMiddleware,
    paginateMiddleware,
    carController.getAllCars.bind(carController),
  );

  router.post(
    '/cars',
    authMiddleware,
    validateSingleCarMiddleware,
    carController.createCar.bind(carController),
  );

  router.post(
    '/cars/multiple',
    authMiddleware,
    carController.createMultipleCars.bind(carController),
  );

  router.put(
    '/cars/update/:id',
    authMiddleware,
    validateIdMiddleware,
    carController.updateCar.bind(carController),
  );

  router.put(
    '/cars/updatemultiple',
    authMiddleware,
    carController.updateMultipleCars.bind(carController),
  );

  router.delete(
    '/cars/delete/:id',
    authMiddleware,
    validateIdMiddleware,
    carController.deleteCar.bind(carController),
  );

  router.post(
    '/cars/delete/multiple',
    authMiddleware,
    validateDeleteMultipleCarsMiddleware,
    carController.deleteMultipleCars.bind(carController),
  );

  router.get(
    '/cars/:id',
    authMiddleware,
    validateIdMiddleware,
    carController.getCarById.bind(carController),
  );

  router.get(
    '/cars/make/:make',
    authMiddleware,
    validateGetCarsByMakeMiddleware,
    paginateMiddleware,
    carController.getCarsByMake.bind(carController),
  );

  router.get(
    '/cars/model/:model',
    authMiddleware,
    validateGetCarsByModelMiddleware,
    paginateMiddleware,
    carController.getCarsByModel.bind(carController),
  );

  router.get(
    '/cars/year/:year',
    authMiddleware,
    validateGetCarYearMiddleware,
    paginateMiddleware,
    carController.getCarsByYear.bind(carController),
  );

  router.get(
    '/cars/year/since/:year',
    authMiddleware,
    validateGetCarYearMiddleware,
    paginateMiddleware,
    carController.getCarsSinceYear.bind(carController),
  );

  router.get(
    '/cars/year/until/:year',
    authMiddleware,
    validateGetCarYearMiddleware,
    paginateMiddleware,
    carController.getCarsUntilYear.bind(carController),
  );

  router.post(
    '/cars/search',
    authMiddleware,
    validateCriteriaMiddleware,
    paginateMiddleware,
    carController.multiSearchFilter.bind(carController),
  );

  return router;
}
