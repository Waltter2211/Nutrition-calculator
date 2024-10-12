import jwt from "jsonwebtoken";

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
