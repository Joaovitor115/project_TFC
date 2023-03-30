import bcrypt = require('bcryptjs');

export const verifyPassword = async (Password: string, hashedPassword:string) => {
  try {
    const match = await bcrypt.compare(Password, hashedPassword);
    return match;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const encryptPassword = async (Password: string) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    return null;
  }
};
