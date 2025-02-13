import Joi from 'joi';
import { CSVValues } from './types/csvValues';
import fs from 'fs';

const validateValuesPath =
  './src/utils/middleware/validation/optimized_values.json';
let validateValues: CSVValues;

try {
  validateValues = JSON.parse(fs.readFileSync(validateValuesPath, 'utf-8'));
} catch (error) {
  console.error('Error reading file:', error);
  process.exit(1);
}

export async function getCarJoiSchema() {
  return Joi.object({
    id_trim: Joi.number()
      .min(validateValues.id_trim.min)
      .max(validateValues.id_trim.max),
    Make: Joi.string().valid(...validateValues.Make.values),
    Model: Joi.string().valid(...validateValues.Model.values),
    Generation: Joi.string().valid(...validateValues.Generation.values),
    Year_from: Joi.number()
      .min(validateValues.Year_from.min)
      .max(validateValues.Year_from.max),
    Year_to: Joi.number()
      .min(validateValues.Year_to.min)
      .max(validateValues.Year_to.max),
    Series: Joi.string().valid(...validateValues.Series.values),
    Trim: Joi.string().valid(...validateValues.Trim.values),
    Body_type: Joi.string().valid(...validateValues.Body_type.values),
    load_height_mm: Joi.number()
      .min(validateValues.load_height_mm.min)
      .max(validateValues.load_height_mm.max),
    number_of_seats: Joi.number()
      .min(validateValues.number_of_seats.min)
      .max(validateValues.number_of_seats.max),
    length_mm: Joi.number()
      .min(validateValues.length_mm.min)
      .max(validateValues.length_mm.max),
    width_mm: Joi.number()
      .min(validateValues.width_mm.min)
      .max(validateValues.width_mm.max),
    height_mm: Joi.number()
      .min(validateValues.height_mm.min)
      .max(validateValues.height_mm.max),
    wheelbase_mm: Joi.number()
      .min(validateValues.wheelbase_mm.min)
      .max(validateValues.wheelbase_mm.max),
    front_track_mm: Joi.number()
      .min(validateValues.front_track_mm.min)
      .max(validateValues.front_track_mm.max),
    rear_track_mm: Joi.number()
      .min(validateValues.rear_track_mm.min)
      .max(validateValues.rear_track_mm.max),
    curb_weight_kg: Joi.number()
      .min(validateValues.curb_weight_kg.min)
      .max(validateValues.curb_weight_kg.max),
    wheel_size_r14: Joi.number()
      .min(validateValues.wheel_size_r14.min)
      .max(validateValues.wheel_size_r14.max),
    ground_clearance_mm: Joi.number()
      .min(validateValues.ground_clearance_mm.min)
      .max(validateValues.ground_clearance_mm.max),
    trailer_load_with_brakes_kg: Joi.number()
      .min(validateValues.trailer_load_with_brakes_kg.min)
      .max(validateValues.trailer_load_with_brakes_kg.max),
    payload_kg: Joi.number()
      .min(validateValues.payload_kg.min)
      .max(validateValues.payload_kg.max),
    back_track_width_mm: Joi.number()
      .min(validateValues.back_track_width_mm.min)
      .max(validateValues.back_track_width_mm.max),
    front_track_width_mm: Joi.number()
      .min(validateValues.front_track_width_mm.min)
      .max(validateValues.front_track_width_mm.max),
    clearance_mm: Joi.number()
      .min(validateValues.clearance_mm.min)
      .max(validateValues.clearance_mm.max),
    full_weight_kg: Joi.number()
      .min(validateValues.full_weight_kg.min)
      .max(validateValues.full_weight_kg.max),
    front_rear_axle_load_kg: Joi.number()
      .min(validateValues.front_rear_axle_load_kg.min)
      .max(validateValues.front_rear_axle_load_kg.max),
    max_trunk_capacity_l: Joi.number()
      .min(validateValues.max_trunk_capacity_l.min)
      .max(validateValues.max_trunk_capacity_l.max),
    cargo_compartment_length_width_height_mm: Joi.number()
      .min(validateValues.cargo_compartment_length_width_height_mm.min)
      .max(validateValues.cargo_compartment_length_width_height_mm.max),
    cargo_volume_m3: Joi.number()
      .min(validateValues.cargo_volume_m3.min)
      .max(validateValues.cargo_volume_m3.max),
    minimum_trunk_capacity_l: Joi.number()
      .min(validateValues.minimum_trunk_capacity_l.min)
      .max(validateValues.minimum_trunk_capacity_l.max),
    maximum_torque_n_m: Joi.number()
      .min(validateValues.maximum_torque_n_m.min)
      .max(validateValues.maximum_torque_n_m.max),
    injection_type: Joi.string().valid(...validateValues.injection_type.values),
    overhead_camshaft: Joi.number()
      .min(validateValues.overhead_camshaft.min)
      .max(validateValues.overhead_camshaft.max),
    cylinder_layout: Joi.string().valid(
      ...validateValues.cylinder_layout.values,
    ),
    number_of_cylinders: Joi.number()
      .min(validateValues.number_of_cylinders.min)
      .max(validateValues.number_of_cylinders.max),
    compression_ratio: Joi.number()
      .min(validateValues.compression_ratio.min)
      .max(validateValues.compression_ratio.max),
    engine_type: Joi.string().valid(...validateValues.engine_type.values),
    valves_per_cylinder: Joi.number()
      .min(validateValues.valves_per_cylinder.min)
      .max(validateValues.valves_per_cylinder.max),
    boost_type: Joi.string().valid(...validateValues.boost_type.values),
    cylinder_bore_mm: Joi.number()
      .min(validateValues.cylinder_bore_mm.min)
      .max(validateValues.cylinder_bore_mm.max),
    stroke_cycle_mm: Joi.number()
      .min(validateValues.stroke_cycle_mm.min)
      .max(validateValues.stroke_cycle_mm.max),
    engine_placement: Joi.number()
      .min(validateValues.engine_placement.min)
      .max(validateValues.engine_placement.max),
    cylinder_bore_and_stroke_cycle_mm: Joi.number()
      .min(validateValues.cylinder_bore_and_stroke_cycle_mm.min)
      .max(validateValues.cylinder_bore_and_stroke_cycle_mm.max),
    turnover_of_maximum_torque_rpm: Joi.number()
      .min(validateValues.turnover_of_maximum_torque_rpm.min)
      .max(validateValues.turnover_of_maximum_torque_rpm.max),
    max_power_kw: Joi.number()
      .min(validateValues.max_power_kw.min)
      .max(validateValues.max_power_kw.max),
    presence_of_intercooler: Joi.number()
      .min(validateValues.presence_of_intercooler.min)
      .max(validateValues.presence_of_intercooler.max),
    capacity_cm3: Joi.number()
      .min(validateValues.capacity_cm3.min)
      .max(validateValues.capacity_cm3.max),
    engine_hp: Joi.number()
      .min(validateValues.engine_hp.min)
      .max(validateValues.engine_hp.max),
    engine_hp_rpm: Joi.number()
      .min(validateValues.engine_hp_rpm.min)
      .max(validateValues.engine_hp_rpm.max),
    drive_wheels: Joi.string().valid(...validateValues.drive_wheels.values),
    bore_stroke_ratio: Joi.number()
      .min(validateValues.bore_stroke_ratio.min)
      .max(validateValues.bore_stroke_ratio.max),
    number_of_gears: Joi.number()
      .min(validateValues.number_of_gears.min)
      .max(validateValues.number_of_gears.max),
    turning_circle_m: Joi.number()
      .min(validateValues.turning_circle_m.min)
      .max(validateValues.turning_circle_m.max),
    transmission: Joi.string().valid(...validateValues.transmission.values),
    mixed_fuel_consumption_per_100_km_l: Joi.number()
      .min(validateValues.mixed_fuel_consumption_per_100_km_l.min)
      .max(validateValues.mixed_fuel_consumption_per_100_km_l.max),
    range_km: Joi.string().valid(...validateValues.range_km.values),
    emission_standards: Joi.number()
      .min(validateValues.emission_standards.min)
      .max(validateValues.emission_standards.max),
    fuel_tank_capacity_l: Joi.number()
      .min(validateValues.fuel_tank_capacity_l.min)
      .max(validateValues.fuel_tank_capacity_l.max),
    acceleration_0_100_kmh_s: Joi.number()
      .min(validateValues.acceleration_0_100_kmh_s.min)
      .max(validateValues.acceleration_0_100_kmh_s.max),
    max_speed_km_per_h: Joi.number()
      .min(validateValues.max_speed_km_per_h.min)
      .max(validateValues.max_speed_km_per_h.max),
    city_fuel_per_100km_l: Joi.number()
      .min(validateValues.city_fuel_per_100km_l.min)
      .max(validateValues.city_fuel_per_100km_l.max),
    CO2_emissions_gkm: Joi.number()
      .min(validateValues.CO2_emissions_gkm.min)
      .max(validateValues.CO2_emissions_gkm.max),
    fuel_grade: Joi.number()
      .min(validateValues.fuel_grade.min)
      .max(validateValues.fuel_grade.max),
    highway_fuel_per_100km_l: Joi.number()
      .min(validateValues.highway_fuel_per_100km_l.min)
      .max(validateValues.highway_fuel_per_100km_l.max),
    back_suspension: Joi.string().valid(
      ...validateValues.back_suspension.values,
    ),
    rear_brakes: Joi.string().valid(...validateValues.rear_brakes.values),
    front_brakes: Joi.string().valid(...validateValues.front_brakes.values),
    front_suspension: Joi.string().valid(
      ...validateValues.front_suspension.values,
    ),
    steering_type: Joi.number()
      .min(validateValues.steering_type.min)
      .max(validateValues.steering_type.max),
    car_class: Joi.number()
      .min(validateValues.car_class.min)
      .max(validateValues.car_class.max),
    country_of_origin: Joi.number()
      .min(validateValues.country_of_origin.min)
      .max(validateValues.country_of_origin.max), // has to be changed to string
    number_of_doors: Joi.number()
      .min(validateValues.number_of_doors.min)
      .max(validateValues.number_of_doors.max),
    safety_assessment: Joi.number()
      .min(validateValues.safety_assessment.min)
      .max(validateValues.safety_assessment.max),
    rating_name: Joi.number()
      .min(validateValues.rating_name.min)
      .max(validateValues.rating_name.max),
    battery_capacity_KW_per_h: Joi.number()
      .min(validateValues.battery_capacity_KW_per_h.min)
      .max(validateValues.battery_capacity_KW_per_h.max),
    electric_range_km: Joi.number()
      .min(validateValues.electric_range_km.min)
      .max(validateValues.electric_range_km.max),
    charging_time_h: Joi.number()
      .min(validateValues.charging_time_h.min)
      .max(validateValues.charging_time_h.max),
  });
}

export async function getCarMakeSchema() {
  return Joi.string().valid(...validateValues.Make.values);
}

export async function getCarModelSchema() {
  return Joi.string().valid(...validateValues.Model.values);
}

export async function getCarYearSchema() {
  return Joi.number()
    .min(validateValues.Year_from.min)
    .max(validateValues.Year_to.max);
}
