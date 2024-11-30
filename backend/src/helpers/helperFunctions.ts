import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Helper function for mapping objects from database with id
export const mapperHelperFunction = async (arr: [], model: any) => {
  const promiseArr = await Promise.all(
    arr.map(async (itemId: string) => {
      return await model.findById(itemId);
    })
  );
  return promiseArr;
};

export const jwtTokenVerifier = (token: string) => {
  const verifiedToken = jwt.verify(token, "jsontoken");

  return verifiedToken;
};

export const getWeeklyDataHelper = async (dateParse: string, userId: string, model: any, weekDateNum: number) => {
  const testDate = new Date(dateParse);
  testDate.setDate(testDate.getDate() - (weekDateNum - 1));
  const fetchedWeeklyData = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(testDate);
    currentDate.setDate(currentDate.getDate() + i);
    const currentDateStr = currentDate
      .toISOString()
      .substring(0, 10)
      .split("-")
      .reverse()
      .join(".");
    const foundDate = await model.find({
      user: userId,
      addedDate: currentDateStr,
    });
    if (foundDate.length === 0) {
      const emptyObj = {
        _id: new mongoose.Types.ObjectId(),
        user: new mongoose.Types.ObjectId(userId),
        dailyCalories: 0,
        dailyProteins: 0,
        dailyCarbohydrates: 0,
        dailyFats: 0,
        dailyWater: 0,
        dailySteps: 0,
        mealsList: [],
        addedDate: "01.01.1970"
      }
      fetchedWeeklyData.push(emptyObj)
    } else {
      fetchedWeeklyData.push(foundDate[0]);
    }
  }
  return fetchedWeeklyData
};
