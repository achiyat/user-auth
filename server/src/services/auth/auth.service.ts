// server/src/services/auth/auth.service.ts
import User, { IUser } from "../../models/User";
import jwt from "jsonwebtoken";

class AuthService {
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");
    const user = new User({ username, email, password });
    await user.save();
    return user;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}

export default new AuthService();
