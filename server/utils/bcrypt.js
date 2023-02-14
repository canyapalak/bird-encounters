import bcrypt from "bcrypt";

const passwordEncryption = async (password) => {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const verifyPassword = async (userPassword, hashedPassword) => {
  const result = await bcrypt.compare(userPassword, hashedPassword);
  return result;
};

export { passwordEncryption, verifyPassword };
