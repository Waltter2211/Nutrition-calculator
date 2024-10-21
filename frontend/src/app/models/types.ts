export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  dailyNutrients: DailyNutrient[];
}

export type DailyNutrient = {
  _id: string;
  addedDate: string;
  dailyCalories: number;
  dailyProteins: number;
  dailyCarbohydrates: number;
  dailyFats: number;
  mealsList: Meal[];
};

type Meal = {
  _id: string;
  caloriesCount: number;
  proteinsCount: number;
  carbohydratesCount: number;
  fatsCount: number;
  foodEaten: Food;
};

type Food = {
  _id: string;
  name: string;
};
