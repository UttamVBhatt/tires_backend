const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  });
};

exports.createSendToken = async (user, res, status) => {
  const token = createToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.is_logged_in = true;

  if (!user.role) {
    user.last_login = Date.now();
  }

  await user.save({ validateBeforeSave: false });

  res.status(status).json({
    status: "success",
    message: "Logged In Successfully",
    token,
    user,
  });
};

exports.logOut = async (res) => {
  const token = "Logged Out";
  const cookieOptions = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions).status(200).json({
    status: "success",
    message: "Logged Out Successfully",
    token,
  });
};
