export interface UserDataType {
    _id: string
    username: string
    email: string
    password: string
    dailyNutrients: DailyNutrient[]
}

type DailyNutrient = {
    _id: string
    dailyCalories: number
    dailyProteins: number
    dailyCarbohydrates: number
    dailyFats: number
    mealsList: any
}