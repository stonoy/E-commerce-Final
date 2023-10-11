import { StatusCodes } from "http-status-codes";

const Error_handler = (err, req, res, next) => {
  let customErr = {
    msg: err.message || "Internal Server error",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  res.status(customErr.statusCode).json({ msg: customErr.msg });
};

export default Error_handler;
