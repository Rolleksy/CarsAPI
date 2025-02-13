import { CarRepository } from '../src/cars/car.repository';
import Database from 'better-sqlite3';
import CSVImporter from '../src/data/carCSVImporter';
import path from 'path';
import { Car } from '../src/types/Car';

describe('CarRepository', () => {
  let db: Database.Database;
  let carRepository: CarRepository;
  let csvImporter: CSVImporter;
  const testCsvPath = path.join(__dirname, 'test.csv');

  beforeEach(async () => {
    db = new Database(':memory:');
    csvImporter = new CSVImporter();
    await csvImporter.importCsv(db, testCsvPath, 'cars');
    carRepository = new CarRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  test('should create a new car and return it with an ID', async () => {
    const newCar = {
      Make: 'Honda',
      Model: 'Civic',
      Generation: 'X',
      Year_from: 2016,
      Year_to: 2021,
      Series: 'Sedan',
      Trim: '1.5 Turbo',
      Body_type: 'Sedan',
      number_of_seats: 5,
      length_mm: 4500,
      width_mm: 1790,
      height_mm: 1430,
      wheelbase_mm: 2700,
      load_height_mm: 700,
      front_track_mm: 1540,
      rear_track_mm: 1550,
      curb_weight_kg: 1300,
      fuel_tank_capacity_l: 47,
    } as unknown as Omit<Car, 'id'>;
    const result = await carRepository.createCar(newCar);

    expect(result).toHaveProperty('id');
    expect(result.Make).toBe(newCar.Make);
    expect(result.Model).toBe(newCar.Model);
    expect(result.Generation).toBe(newCar.Generation);
  });

  test('should update an existing car', async () => {
    const carToUpdate = await carRepository.getCarById(1);
    const updatedCar = {
      ...carToUpdate,
      Make: 'UpdatedMake',
      Model: 'UpdatedModel',
      Generation: 'UpdatedGeneration',
    };
    const result = await carRepository.updateCar(carToUpdate.id, updatedCar);
    if (!result) {
      throw new Error('Car not found');
    }
    expect(result?.id).toBe(carToUpdate.id);
    expect(result?.Make).toBe(updatedCar.Make);
    expect(result?.Model).toBe(updatedCar.Model);
    expect(result?.Generation).toBe(updatedCar.Generation);
  });

  test('should delete an existing car', async () => {
    await carRepository.deteleCar(1);
    const result = await carRepository.getCarById(1);

    expect(result).toBeUndefined();

    const allCars = await carRepository.getAllCars(10, 0);
    expect(allCars.cars).toHaveLength(0);
  });

  test('should get all cars', async () => {
    const result = await carRepository.getAllCars(10, 0);

    expect(result.cars).toHaveLength(1);
    expect(result.totalCount).toBe(1);
  });

  test('should get a car by ID', async () => {
    const result = await carRepository.getCarById(1);

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
  });

  test('should get cars by make', async () => {
    const result = await carRepository.getCarsByMake('AC', 10, 0);

    expect(result.cars).toHaveLength(1);
    expect(result.totalCount).toBe(1);
  });

  test('should get cars by model', async () => {
    const result = await carRepository.getCarsByModel('ACE', 10, 0);

    expect(result.cars).toHaveLength(1);
    expect(result.totalCount).toBe(1);
  });

  test('should get cars since year', async () => {
    const result = await carRepository.getCarsSinceYear(1992, 10, 0);

    expect(result.cars).toHaveLength(1);
    expect(result.totalCount).toBe(1);
  });

  test('should get cars until year', async () => {
    const result = await carRepository.getCarsUntilYear(2000, 10, 0);

    expect(result.cars).toHaveLength(1);
    expect(result.totalCount).toBe(1);
  });

  test('should get cars by year', async () => {
    const result = await carRepository.getCarsByYear(1994, 10, 0);

    expect(result.cars).toHaveLength(1);
    expect(result.totalCount).toBe(1);
  });
});
