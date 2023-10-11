import createToken from "./createToken.js";

const sendCookie = async (res, user) => {
  const token = createToken(user);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
};

export default sendCookie;
