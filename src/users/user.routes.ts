import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import express from 'express';
import Database from 'better-sqlite3';
import {
  validateLoginUserMiddleware,
  validateRegisterUserMiddleware,
} from '../utils/middleware/validation/userValidate';

const router = express.Router();

/**
 * @swagger
 * tags: 1_User
 * components:
 *   schemas:
 *    $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */

export async function getUserRoutes(
  dbInstance: Database.Database,
): Promise<express.Router> {
  const userRepository = new UserRepository(dbInstance);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  router.post(
    '/register',
    validateRegisterUserMiddleware,
    userController.registerUser.bind(userController),
  );
  router.post(
    '/login',
    validateLoginUserMiddleware,
    userController.loginUser.bind(userController),
  );

  return router;
}
