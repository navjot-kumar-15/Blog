import User from "../../modal/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Genrate Token
const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // return res.send({ file: req.file });

    if (!username || !email || !password) {
      return res.send({
        success: 0,
        message: "Please enter all the required fields",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      image: req.file && `/user/avatar/${req.file.filename}`,
      password: hashPass,
    });

    return res.send({
      success: 1,
      message: "User Register successfully...",
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        success: 0,
        message: "Please Enter all required fields",
      });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.send({
        success: 0,
        message: "Invalid credentials...",
      });
    }

    await findUser.updateOne({ token: genrateToken(findUser._id) });
    const { token } = findUser;
    return res.send({
      success: 1,
      message: "User Logged in Successfully",
      details: { token },
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};
