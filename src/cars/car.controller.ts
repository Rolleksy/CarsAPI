import { Request, Response } from 'express';
import { CarService } from './car.service';

export class CarController {
  private carService: CarService;

  constructor(carService: CarService) {
    this.carService = carService;
  }

  async createCar(req: Request, res: Response) {
    try {
      const car = req.body;
      const newCar = await this.carService.createCar(car);
      res.status(200).json(newCar);
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async createMultipleCars(req: Request, res: Response) {
    try {
      const cars = req.body;
      const newCars = await this.carService.createMultipleCars(cars);
      res.status(200).json(newCars);
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      if (!res.headersSent) {
        res.status(500).json({ error: `${error.message}` });
      }
    }
  }

  async updateCar(req: Request, res: Response) {
    try {
      const car = req.body;
      const id = Number(req.params.id);
      const updatedCar = await this.carService.updateCar(id, car);
      res.status(200).json(updatedCar);
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async updateMultipleCars(req: Request, res: Response) {
    try {
      const { ids, cars } = req.body;

      const updatedCars = await this.carService.updateMultipleCars(ids, cars);
      res.status(200).json(updatedCars);
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async deleteCar(req: Request, res: Response) {
    try {
      const carId = parseInt(req.params.id);
      await this.carService.deleteCar(carId);
      res.status(200).send('Car deleted');
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async deleteMultipleCars(req: Request, res: Response) {
    try {
      const carIds = req.body.ids;
      await this.carService.deleteMultipleCars(carIds);
      res.status(200).send('Cars deleted');
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async getAllCars(req: Request, res: Response) {
    try {
      const { page, limit, offset } = req.pagination || {
        page: 1,
        limit: 10,
        offset: 0,
      };

      const cars = await this.carService.getAllCars(limit, offset);
      const carList = cars.cars;
      const totalCount = cars.totalCount;

      res.json({
        carList,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      });
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async getCarById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const car = await this.carService.getCarById(id);
      if (car) {
        res.json(car);
      } else {
        res.status(404).send('Car not found');
      }
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async getCarsByMake(req: Request, res: Response) {
    try {
      const make = req.params.make;
      const { page, limit, offset } = req.pagination || {
        page: 1,
        limit: 10,
        offset: 0,
      };
      const response = await this.carService.getCarsByMake(make, limit, offset);
      const cars = response.cars;
      const totalCount = response.totalCount;
      res.json({
        cars,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      });
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async getCarsByModel(req: Request, res: Response) {
    try {
      const model = req.params.model;
      const { page, limit, offset } = req.pagination || {
        page: 1,
        limit: 10,
        offset: 0,
      };
      const response = await this.carService.getCarsByModel(
        model,
        limit,
        offset,
      );
      const cars = response.cars;
      const totalCount = response.totalCount;
      res.json({
        cars,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      });
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async getCarsSinceYear(req: Request, res: Response) {
    try {
      const fromYear = parseInt(req.params.year);
      const { page, limit, offset } = req.pagination || {
        page: 1,
        limit: 10,
        offset: 0,
      };
      const response = await this.carService.getCarsSinceYear(
        fromYear,
        limit,
        offset,
      );
      const cars = response.cars;
      const totalCount = response.totalCount;
      res.json({
        cars,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      });
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async getCarsUntilYear(req: Request, res: Response) {
    try {
      const toYear = parseInt(req.params.year);
      const { page, limit, offset } = req.pagination || {
        page: 1,
        limit: 10,
        offset: 0,
      };
      const response = await this.carService.getCarsUntilYear(
        toYear,
        limit,
        offset,
      );
      const cars = response.cars;
      const totalCount = response.totalCount;
      res.json({
        cars,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      });
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async getCarsByYear(req: Request, res: Response) {
    try {
      const year = parseInt(req.params.year);
      const { page, limit, offset } = req.pagination || {
        page: 1,
        limit: 10,
        offset: 0,
      };
      const response = await this.carService.getCarsByYear(year, limit, offset);
      const cars = response.cars;
      const totalCount = response.totalCount;
      res.json({
        cars,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      });
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async multiSearchFilter(req: Request, res: Response) {
    try {
      const criteria = req.body;
      const { page, limit, offset } = req.pagination || {
        page: 1,
        limit: 10,
        offset: 0,
      };
      const cars = await this.carService.multiSearchFilter(
        criteria,
        limit,
        offset,
      );
      const carList = cars.cars;
      const totalCount = cars.totalCount;
      res.json({
        carsList: carList,
        page,
        limit,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      });
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }
}
