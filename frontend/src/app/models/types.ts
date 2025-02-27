export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  dailyNutrients: DailyNutrient[];
}

export interface UserDailyStats {
  goalCalories: number;
  goalProteins: number;
  goalCarbohydrates: number;
  goalFats: number;
  goalWater: number;
  goalSteps: number;
  dailyNutrients: DailyNutrient;
}

export interface UserAllData {
  goalCalories: number;
  goalProteins: number;
  goalCarbohydrates: number;
  goalFats: number;
  goalWater: number;
  goalSteps: number;
  dailyNutrients: DailyNutrient[];
}

export type DailyNutrient = {
  _id: string;
  addedDate: string;
  dailyCalories: number;
  dailyProteins: number;
  dailyCarbohydrates: number;
  dailyFats: number;
  dailyWater: number;
  dailySteps: number;
  mealsList: Meal[];
};

type Meal = {
  _id: string;
  caloriesCount: number;
  proteinsCount: number;
  carbohydratesCount: number;
  fatsCount: number;
  foodEaten: Food;
  gramsEaten: number;
};

type Food = {
  _id: string;
  name: string;
};
