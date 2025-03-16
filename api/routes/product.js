const router = require("express").Router();
const { verifyToken, verifyAdminAccess } = require('../middlewares/verifyAuth');
const Product = require("../models/Product.model");

// Get all products - any user
router.get("/", async (req, res) => {
  const query = req.query;
  
  try {
    let products;
    if (query.new) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (query.category) {
      products = await Product.find({
        categories: { $in: [query.category] },
      });
    } else {
      products = await Product.find();
    }

    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json(productResponse.unexpectedError);
  }
});

// Add a new product - admin only
router.post("/", verifyAdminAccess, async (req, res) => {
  const { name, price, categories, description, stock } = req.body;

  // Check if essential data is present
  if (!name || !price || !categories || !stock) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields (name, price, categories, or stock)"
    });
  }

  try {
    await Product.create(req.body);
    return res.json(productResponse.productAdded);
  } catch (err) {
    console.log(err);
    return res.status(500).json(productResponse.unexpectedError);
  }
});

// Update a product - admin only
router.put("/:id", verifyAdminAccess, async (req, res) => {
  const { name, price, categories, description, stock } = req.body;

  // Check if any essential data is present if they are provided
  if ((name && !name.trim()) || (price && isNaN(price)) || (stock && isNaN(stock))) {
    return res.status(400).json({
      status: "error",
      message: "Invalid data for name, price, or stock"
    });
  }

  try {
    await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(productResponse.productUpdated);
  } catch (err) {
    console.error(err);
    return res.status(500).json(productResponse.unexpectedError);
  }
});

// Delete a product - admin only
router.delete("/:id", verifyAdminAccess, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json(productResponse.productDeleted);
  } catch (err) {
    console.log(err);
    return res.status(500).json(productResponse.unexpectedError);
  }
});

// Get any product - any user
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found"
      });
    }
    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json(productResponse.unexpectedError);
  }
});

const productResponse = {
  productAdded: {
    status: "ok",
    message: "Product has been added",
  },
  productUpdated: {
    status: "ok",
    message: "Product has been updated",
  },
  productDeleted: {
    status: "ok",
    message: "Product has been deleted",
  },
  unexpectedError: {
    status: "error",
    message: "An unexpected error occurred",
  },
};

module.exports = router;
