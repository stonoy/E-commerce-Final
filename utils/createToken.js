import jwt from "jsonwebtoken";

const createToken = ({ _id, name, role }) => {
  const token = jwt.sign({ userId: _id, name: name, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

export default createToken;
