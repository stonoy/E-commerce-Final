import createCustomApiError from "../errors/customApiError.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
  const token = req.cookies.token;
  //   console.log(token);
  if (!token) {
    return next(
      createCustomApiError("pls provide a token", StatusCodes.BAD_REQUEST)
    );
  }

  try {
    const { userId, name, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId, name, role };
    next();
  } catch (error) {
    console.log(error);
    return next(
      createCustomApiError(
        "provide a valid token",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const authorization = (...rest) => {
  return (req, res, next) => {
    if (!rest.includes(req.user.role)) {
      return next(
        createCustomApiError(
          "Not authroized for the route!",
          StatusCodes.FORBIDDEN
        )
      );
    }

    next();
  };
};

export { authentication, authorization };
