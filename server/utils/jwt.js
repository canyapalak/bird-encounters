import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const payload = { sub: userId };

  const options = {
    expiresIn: "2d",
    issuer: "Code Academy Berlin",
  };

  const secretOrPrivateKey = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secretOrPrivateKey, options);
  return token;
};

export default generateToken;
