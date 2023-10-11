import createCustomApiError from "../errors/customApiError.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import sendCookie from "../utils/sendCookie.js";

const register = async (req, res, next) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      createCustomApiError("provide all the values", StatusCodes.BAD_REQUEST)
    );
  }
  const user = await User.create(req.body);

  sendCookie(res, user);

  res.status(StatusCodes.CREATED).json({ msg: "user registered!" });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      createCustomApiError("provide all the values", StatusCodes.BAD_REQUEST)
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(
      createCustomApiError("Email not registered", StatusCodes.BAD_REQUEST)
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(
      createCustomApiError("Incorrect Password", StatusCodes.UNAUTHORIZED)
    );
  }

  sendCookie(res, user);
  res.status(StatusCodes.OK).json({ msg: "user logged in!" });
};

const logout = async (req, res, next) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "user logged out!" });
};

export { register, login, logout };
