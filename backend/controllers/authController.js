import User from "../models/userModel.js";
import ErrorHandler from "../utilities/ErrorHandler.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, profilePic } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      profilePic,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = await user.getJWTtoken();
    user = user.toObject()
    delete user.password;

    res.status(201).json({ token, user });
  } catch (error) {
    return next(new ErrorHandler(`Error: ${error.message}`, 500));
  }
};
