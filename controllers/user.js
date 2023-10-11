import createCustomApiError from "../errors/customApiError.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import sendCookie from "../utils/sendCookie.js";
import checkPermission from "../utils/checkParmission.js";

const getAllusers = async (req, res, next) => {
  const users = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    return next(
      createCustomApiError(
        `No user with id:${req.params.id}`,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const hasPermission = checkPermission(req.user, user._id);

  if (!hasPermission) {
    return next(
      createCustomApiError(`Not authorized to see`, StatusCodes.FORBIDDEN)
    );
  }

  sendCookie(res, user);
  res.status(200).json({ user });
};

const showMe = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return next(
      createCustomApiError(
        "provide all required values",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.email = email;

  await user.save();

  sendCookie(res, user);
  res.status(StatusCodes.OK).json({
    msg: "user updated successfully!",
    user: { name: user.name, email: user.email },
  });
};

const updateUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next(
      createCustomApiError(
        "provide all required values",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    return next(
      createCustomApiError(
        "Old Password is Incorrect",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "password changed successfully!" });
};

const deleteUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return next(
      createCustomApiError(
        `user: ${req.params.id} does not exist`,
        StatusCodes.BAD_REQUEST
      )
    );
  }

  await user.deleteOne();

  res.status(200).json({ msg: "user deleted!" });
};

export {
  getAllusers,
  getSingleUser,
  showMe,
  updateUser,
  updateUserPassword,
  deleteUser,
};
