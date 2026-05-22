import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { pool } from "../../db/index.js";

const loginUserIntoDb = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  // check user exists
  const userData = await pool.query(
    `
      SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = userData.rows[0];

  // compare password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }

  // jwt payload
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  // generate token
  const token = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });

  // return assignment required response
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};

export const authService = {
  loginUserIntoDb,
};
