export type CSVValues = {
  id_trim: {
    type: 'number';
    min: number;
    max: number;
  };
  Make: {
    type: 'string';
    values: string[];
  };
  Model: {
    type: 'string';
    values: string[];
  };
  Generation: {
    type: 'string';
    values: string[];
  };
  Year_from: {
    type: 'number';
    min: number;
    max: number;
  };
  Year_to: {
    type: 'number';
    min: number;
    max: number;
  };
  Series: {
    type: 'string';
    values: string[];
  };
  Trim: {
    type: 'string';
    values: string[];
  };
  Body_type: {
    type: 'string';
    values: string[];
  };
  load_height_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  number_of_seats: {
    type: 'number';
    min: number;
    max: number;
  };
  length_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  width_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  height_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  wheelbase_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  front_track_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  rear_track_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  curb_weight_kg: {
    type: 'number';
    min: number;
    max: number;
  };
  wheel_size_r14: {
    type: 'number';
    min: number;
    max: number;
  };
  ground_clearance_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  trailer_load_with_brakes_kg: {
    type: 'number';
    min: number;
    max: number;
  };
  payload_kg: {
    type: 'number';
    min: number;
    max: number;
  };
  back_track_width_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  front_track_width_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  clearance_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  full_weight_kg: {
    type: 'number';
    min: number;
    max: number;
  };
  front_rear_axle_load_kg: {
    type: 'number';
    min: number;
    max: number;
  };
  max_trunk_capacity_l: {
    type: 'number';
    min: number;
    max: number;
  };
  cargo_compartment_length_width_height_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  cargo_volume_m3: {
    type: 'number';
    min: number;
    max: number;
  };
  minimum_trunk_capacity_l: {
    type: 'number';
    min: number;
    max: number;
  };
  maximum_torque_n_m: {
    type: 'number';
    min: number;
    max: number;
  };
  injection_type: {
    type: 'string';
    values: string[];
  };
  overhead_camshaft: {
    type: 'number';
    min: number;
    max: number;
  };
  cylinder_layout: {
    type: 'string';
    values: string[];
  };
  number_of_cylinders: {
    type: 'number';
    min: number;
    max: number;
  };
  compression_ratio: {
    type: 'number';
    min: number;
    max: number;
  };
  engine_type: {
    type: 'string';
    values: string[];
  };
  valves_per_cylinder: {
    type: 'number';
    min: number;
    max: number;
  };
  boost_type: {
    type: 'string';
    values: string[];
  };
  cylinder_bore_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  stroke_cycle_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  engine_placement: {
    type: 'number';
    min: number;
    max: number;
  };
  cylinder_bore_and_stroke_cycle_mm: {
    type: 'number';
    min: number;
    max: number;
  };
  turnover_of_maximum_torque_rpm: {
    type: 'number';
    min: number;
    max: number;
  };
  max_power_kw: {
    type: 'number';
    min: number;
    max: number;
  };
  presence_of_intercooler: {
    type: 'number';
    min: number;
    max: number;
  };
  capacity_cm3: {
    type: 'number';
    min: number;
    max: number;
  };
  engine_hp: {
    type: 'number';
    min: number;
    max: number;
  };
  engine_hp_rpm: {
    type: 'number';
    min: number;
    max: number;
  };
  drive_wheels: {
    type: 'string';
    values: string[];
  };
  bore_stroke_ratio: {
    type: 'number';
    min: number;
    max: number;
  };
  number_of_gears: {
    type: 'number';
    min: number;
    max: number;
  };
  turning_circle_m: {
    type: 'number';
    min: number;
    max: number;
  };
  transmission: {
    type: 'string';
    values: string[];
  };
  mixed_fuel_consumption_per_100_km_l: {
    type: 'number';
    min: number;
    max: number;
  };
  range_km: {
    type: 'string';
    values: string[];
  };
  emission_standards: {
    type: 'number';
    min: number;
    max: number;
  };
  fuel_tank_capacity_l: {
    type: 'number';
    min: number;
    max: number;
  };
  acceleration_0_100_kmh_s: {
    type: 'number';
    min: number;
    max: number;
  };
  max_speed_km_per_h: {
    type: 'number';
    min: number;
    max: number;
  };
  city_fuel_per_100km_l: {
    type: 'number';
    min: number;
    max: number;
  };
  CO2_emissions_gkm: {
    type: 'number';
    min: number;
    max: number;
  };
  fuel_grade: {
    type: 'number';
    min: number;
    max: number;
  };
  highway_fuel_per_100km_l: {
    type: 'number';
    min: number;
    max: number;
  };
  back_suspension: {
    type: 'string';
    values: string[];
  };
  rear_brakes: {
    type: 'string';
    values: string[];
  };
  front_brakes: {
    type: 'string';
    values: string[];
  };
  front_suspension: {
    type: 'string';
    values: string[];
  };
  steering_type: {
    type: 'number';
    min: number;
    max: number;
  };
  car_class: {
    type: 'number';
    min: number;
    max: number;
  };
  country_of_origin: {
    type: 'number';
    min: number;
    max: number;
  };
  number_of_doors: {
    type: 'number';
    min: number;
    max: number;
  };
  safety_assessment: {
    type: 'number';
    min: number;
    max: number;
  };
  rating_name: {
    type: 'number';
    min: number;
    max: number;
  };
  battery_capacity_KW_per_h: {
    type: 'number';
    min: number;
    max: number;
  };
  electric_range_km: {
    type: 'number';
    min: number;
    max: number;
  };
  charging_time_h: {
    type: 'number';
    min: number;
    max: number;
  };
};
