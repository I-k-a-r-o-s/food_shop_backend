import FoodModel from "../models/foodModel.js";

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
    return res.json({
      success: true,
      message: "Food Added!",
    });
  } catch (error) {
    console.log("Error in addFood:", error);
    return res.json({
      success: false,
      message: "Food Not Added!",
    });
  }
};
