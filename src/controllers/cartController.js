import UserModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.status(200).json({
      success: true,
      message: "Added to Cart!",
    });
  } catch (error) {
    console.log("Error in addToCart!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.status(200).json({
      success: true,
      message: "Removed from Cart!",
    });
  } catch (error) {
    console.log("Error in removeFromCart!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getCartData = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    let cartData = userData.cartData;

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully!",
      cartData,
    });
  } catch (error) {
    console.log("Error in getCartData!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
