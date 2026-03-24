import FoodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
export const addFood = async (req, res) => {
  let image_fileName = `${req.file.filename}`; //uploaded filename

  const food = new FoodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_fileName,
  });
  try {
    await food.save();
    return res.status(200).json({
      success: true,
      message: "Food Added!",
    });
  } catch (error) {
    console.log("Error in addFood:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

//list of all food
export const listFood = async (req, res) => {
  try {
    const food = await FoodModel.find({});
    return res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    console.log("Error in listFood:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

//remove food item

export const removeFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.body.id); //get the food id for deleting image from folder
    fs.unlink(`src/uploads/${food.image}`, () => {}); //delete image from folder

    await FoodModel.findByIdAndDelete(req.body.id);

    res.status(200).json({
      success: true,
      message: "Food Successfully Removed",
    });
  } catch (error) {
    console.log("Error in removeFood:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
