export interface OpenFoodFactsResponse {
  code: string;
  status: number; // 1 if found, 0 if not
  status_verbose: string;
  product?: Product; // Optional: undefined if status === 0
}

export interface Product {
  id?: string;
  product_name?: string;
  product_name_en?: string;
  brands?: string;
  brands_tags?: string[];
  quantity?: string;
  categories?: string;
  categories_tags?: string[];
  labels?: string;
  packaging?: string;
  image_url?: string;
  image_small_url?: string;
  ingredients_text?: string;
  ingredients?: Ingredient[];
  nutriments?: Nutriments;
  nutriscore_grade?: string;
  nova_group?: number;
  ecoscore_grade?: string;
  allergens?: string;
  traces?: string;
  countries_tags?: string[];
  lang?: string;
  url?: string;
  code?: string; // same as barcode
}

export interface Ingredient {
  id?: string;
  text: string;
  rank?: number;
  percent_estimate?: number;
  vegan?: string; // "yes" | "no" | "maybe"
  vegetarian?: string;
  from_palm_oil?: string;
}

export interface Nutriments {
  "energy-kcal"?: number;
  "energy-kcal_100g"?: number;
  fat?: number;
  "fat_100g"?: number;
  saturated_fat?: number;
  "saturated-fat_100g"?: number;
  carbohydrates?: number;
  "carbohydrates_100g"?: number;
  sugars?: number;
  "sugars_100g"?: number;
  fiber?: number;
  "fiber_100g"?: number;
  proteins?: number;
  "proteins_100g"?: number;
  salt?: number;
  "salt_100g"?: number;
  sodium?: number;
  "sodium_100g"?: number;
  [key: string]: number | string | undefined;
}
