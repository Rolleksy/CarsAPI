import { CarRepository } from './car.repository';
import { Car } from '../types/Car';
import { CSVValues } from '../utils/middleware/validation/types/csvValues';

export class CarService {
  private carRepository: CarRepository;

  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  async createCar(car: Car): Promise<Car> {
    return this.carRepository.createCar(car);
  }

  async createMultipleCars(cars: Omit<Car, 'id'>[]): Promise<Car[]> {
    const createdCars: Car[] = [];

    for (const car of cars) {
      const createdCar = await this.carRepository.createCar(car);
      createdCars.push(createdCar);
    }
    return createdCars;
  }

  async updateCar(id: number, car: Car): Promise<Car> {
    const updatedCar = this.carRepository.updateCar(id, car);
    if (!updatedCar) {
      throw new Error('Car not found');
    }
    return updatedCar as Car | unknown as Car;
  }

  async updateMultipleCars(
    ids: number[],
    cars: Omit<Car, 'id'>[],
  ): Promise<Car[]> {
    const updatedCars: Car[] = [];
    const carsWithId = cars.map((car, index) => ({
      id: Number(ids[index]),
      car: car,
    }));

    for (const carWithId of carsWithId) {
      const updatedCar = await this.carRepository.updateCar(
        carWithId.id,
        carWithId.car,
      );
      updatedCars.push(updatedCar as Car);
    }
    return updatedCars;
  }

  async deleteCar(id: number | bigint): Promise<void> {
    return this.carRepository.deteleCar(id);
  }

  async deleteMultipleCars(ids: number[] | bigint[]): Promise<void> {
    for (const id of ids) {
      await this.carRepository.deteleCar(id);
    }
  }

  async getAllCars(
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    return this.carRepository.getAllCars(limit, offset);
  }

  async getCarById(id: number): Promise<Car> {
    return this.carRepository.getCarById(id);
  }

  async getCarsByMake(
    make: string,
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    return this.carRepository.getCarsByMake(make, limit, offset);
  }

  async getCarsByModel(
    model: string,
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    return this.carRepository.getCarsByModel(model, limit, offset);
  }

  async getCarsSinceYear(
    fromYear: number,
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    return this.carRepository.getCarsSinceYear(fromYear, limit, offset);
  }

  async getCarsUntilYear(
    toYear: number,
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    return this.carRepository.getCarsUntilYear(toYear, limit, offset);
  }

  async getCarsByYear(
    year: number,
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    return this.carRepository.getCarsByYear(year, limit, offset);
  }

  async multiSearchFilter(
    criteria: CSVValues[],
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    return this.carRepository.multiSearchFilter(criteria, limit, offset);
  }
}
