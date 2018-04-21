const del = require("del");
const fs = require("fs");
const util = require("util");
const readFilePromise = util.promisify(fs.readFile);
const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage");
const ProductCategory = require("../models/ProductCategory");

exports.add_a_product = async (req, res) => {
  /*  The multipart form should be structured like this:

          files:          an array of files as images of the product
          filesMeta:      an array of metadata corresponding to the files uploaded:
                              title, width, height, rest are taken from the file itself
          product:        a stringified JSON file:
                              title, description, weight, price, categoryId
      */
  try {
    const imagesMeta = JSON.parse(req.body.filesMetadata);
    const productData = JSON.parse(req.body.product);

    const category = await ProductCategory.findById(productData.category);
    if (!category)
      return res.status(400).send({ message: "No such product category" });
    const newProduct = new Product(productData);

    newProduct.images = req.files.map((file, index) => {
      const props = {
        title: imagesMeta[index].title,
        path: req.files[index].path,
        originalFileName: req.files[index].originalname,
        width: imagesMeta[index].width,
        height: imagesMeta[index].height,
        size: req.files[index].size,
        product: newProduct._id,
        preSaveId: imagesMeta[index].uniqueId
      };
      return new ProductImage(props);
    });

    newProduct.frontImage = newProduct.images.find(image => {
      return image.preSaveId === productData.frontImageId;
    });

    const allPromises = newProduct.images.map(image => image.save());
    allPromises.push(newProduct.save());
    await Promise.all(allPromises);

    res.send(newProduct);
  } catch (e) {
    res.status(500).send({ message: "Error processing your request" });
  }
};
exports.get_all_products = async (req, res) => {
  // If asks for cached - give cached
  if (req.query["accept_cached"]) {
    const file = await readFilePromise("./.cached.json", "utf8");
    return res.send(JSON.parse(file).products);
  }
  const allProducts = await Product.find({})
    .populate("images")
    .populate("frontImage");
  res.send(allProducts);
};
exports.delete_product = async (req, res) => {
  try {
    // Delete all images for that product, both from db and actual files
    const product = await Product.findById(req.params.id).populate("images");
    const fileNames = product.images.map(image => `./${image.path}`);
    await del(fileNames);
    product.images.forEach(async image => {
      await ProductImage.findByIdAndRemove(image);
    });
    await Product.findByIdAndRemove(req.params.id);
    res.send({ message: "Product removed successfully" });
  } catch (e) {
    res.status(500).send({ message: "Error trying to delete product" });
  }
};
exports.add_image_to_product = async (req, res) => {
  // fields: file, fileMeta, productId
  try {
    const imageMeta = JSON.parse(req.body.fileMeta);
    const productId = req.body.productId;

    const product = await Product.findById(productId).populate("images");
    if (!product) {
      res.status(404).send({ message: "No product with such ID" });
    }
    const imageProps = {
      title: imageMeta.title,
      path: req.file.path,
      originalFileName: req.file.originalname,
      width: imageMeta.width,
      height: imageMeta.height,
      size: req.file.size,
      product: product._id,
      preSaveId: imageMeta.uniqueId
    };
    const newImage = ProductImage(imageProps);
    product.images.push(newImage);
    const promises = [newImage.save(), product.save()];

    await Promise.all(promises);

    res.send(newImage);
  } catch (e) {
    console.log("Error adding image", e);
    res.status(500).send({ message: "Error trying to add product image" });
  }
};
exports.set_products_default_image = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId)
      .populate("images")
      .populate("frontImage");
    if (!product) return res.status(400).send({ message: "No such product" });
    const image = await ProductImage.findById(req.query.imageId);
    if (!image) return res.status(400).send({ message: "No such image" });
    // Confirm the image in fact belongs to the product

    const belongs = image.product.toString() === product._id.toString();
    if (belongs) {
      product.frontImage = image;
      await product.save();
      return res.send(product);
    } else {
      return res.status(400).send({
        message: "The image specified does not belong to the product specified"
      });
    }
  } catch (e) {
    console.log(e, "Error during image assignment");
  }
};
exports.update_product = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send({ message: "No such product" });
    // Check if the category selected exists
    const category = await ProductCategory.findById(req.body.categoryId);
    if (!category)
      return res.status(400).send({ message: "No such product category" });

    const propsToUpdate = {
      title: req.body.title,
      description: req.body.description,
      weight: req.body.weight,
      price: req.body.price,
      category: category._id
    };
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      propsToUpdate,
      { new: true }
    )
      .populate("images")
      .populate("frontImage");

    res.send(updated);
  } catch (e) {
    if (e.name === "CastError") {
      return res.status(400).send({ message: "No such product category" });
    }
    console.log(e);
    res.status(500).send({
      message: "Error occurred while updating the product. Try again"
    });
  }
};
exports.delete_product_image = async (req, res) => {
  try {
    const image = await ProductImage.findById(req.params.id);
    if (!image) return res.status(400).send({ message: "No such image" });
    // Remove the physical image (as physical as bytes on a disk are)
    await del("./" + image.path);
    // Return the product the image belonged to as response, so make a note of the id of the product
    const productId = image.product;
    await ProductImage.findByIdAndRemove(req.params.id);

    return res.send(
      await Product.findById(productId)
        .populate("images")
        .populate("frontImage")
    );
  } catch (e) {
    console.error(e);
  }
};
exports.get_all_categories = async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.send(categories);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error trying to delete product" });
  }
};
exports.add_category = async (req, res) => {
  try {
    const newTitle = req.body.title;
    const newCat = new ProductCategory({ title: newTitle });
    await newCat.save();

    res.send(newCat);
  } catch (e) {
    res.status(500).send({ message: "Error trying to add a product category" });
  }
};
exports.edit_category = async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id);
    if (!category) return res.status(400).send({ message: "No such category" });
    category.title = req.body.title;
    await category.save();
    res.send(category);
  } catch (e) {
    res
      .status(500)
      .send({ message: "Error trying to edit a product category" });
  }
};
exports.delete_category = async (req, res) => {
  try {
    const cat = await ProductCategory.findById(req.params.id);
    if (!cat) return res.status(400).send({ message: "No such category" });
    await ProductCategory.findByIdAndRemove(req.params.id);
    res.send({ message: "Category removed successfully" });
  } catch (e) {
    res
      .status(500)
      .send({ message: "Error trying to remove a product category" });
  }
};
