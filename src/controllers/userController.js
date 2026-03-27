import UserModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//user login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Fields!",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist!",
      });
    }

    const isPasswordMatches = await bcrypt.compare(password, user.password);
    if (!isPasswordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully!",
      token,
    });
  } catch (error) {
    console.log("Error in userLogin!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

//user register
export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Fields!",
      });
    }

    //validating email format & password strength
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please Enter a Valid Email!",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please Enter a Strong Password(8+ Characters)!",
      });
    }

    const alreadyExists = await UserModel.findOne({ email });
    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "User Already Exists!",
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user &save
    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    //generate token for the user
    const token = createToken(user._id);
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully!",
      token,
    });
  } catch (error) {
    console.log("Error in userRegister!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
