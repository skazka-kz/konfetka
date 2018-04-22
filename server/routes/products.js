const multer = require("multer");
const path = require("path");
const uniquid = require("uniqid");
const {
  add_a_product,
  get_all_products,
  delete_product,
  add_image_to_product,
  set_products_default_image,
  update_product,
  delete_product_image,
  add_category,
  delete_category,
  edit_category,
  get_all_categories,
  get_all_products_cache,
  get_popular_products
} = require("../controllers/product");
const clearProductCache = require("../middlewares/cleanProductCache");
const requireLogin = require("../middlewares/requireLogin");

const productImageStorage = multer.diskStorage({
  destination(req, file, cb) {
    if (process.env.NODE_ENV === "test") {
      cb(null, "./server/uploads/test");
    } else {
      cb(null, "./server/uploads");
    }
  },
  filename(req, file, cb) {
    // If no extension, get from mime
    let extension = path.extname(file.originalname);
    if (!extension) {
      switch (file.mimetype) {
        case "image/jpeg":
          extension = ".jpg";
          break;
        case "image/png":
          extension = ".png";
          break;
        case "image/gif":
          extension = ".gif";
          break;
        default:
          extension = ".jpg";
      }
    }
    cb(null, `product_image-${uniquid()}${extension}`);
  }
});
const upload = multer({
  storage: productImageStorage,
  limits: {
    fileSize: 2500000
  },
  fileFilter: (req, file, cb) => {
    // Check for extension and mime type
    const fileTypes = /jpeg|jpg|png|gif/;
    // Check the mime type
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType) {
      return cb(null, true);
    } else {
      return cb(`Error: incorrect file type. Only images can be uploaded`);
    }
  }
});

module.exports = app => {
  // Product CRUD
  app.get("/api/products", get_all_products);
  app.post(
    "/api/products",
    requireLogin,
    clearProductCache,
    upload.array("files", 10),
    add_a_product
  );
  app.put("/api/products/:id", requireLogin, clearProductCache, update_product);
  app.delete("/api/products/:id", requireLogin, clearProductCache, delete_product);

  // Front end specific routes that cache in redis
  app.get("/api/misc/popular_products", get_popular_products);
  app.get("/api/misc/all_products", get_all_products_cache);

  // Product Image CRUD
  app.post(
    "/api/products/image",
    requireLogin,
    clearProductCache,
    upload.single("file"),
    add_image_to_product
  );
  app.delete("/api/products/image/:id", requireLogin, clearProductCache, delete_product_image);
  app.get(
    "/api/misc/set_primary_product_image",
    requireLogin,
    clearProductCache,
    set_products_default_image
  );

  // Product categories CRUD
  app.get("/api/categories", get_all_categories);
  app.post("/api/categories", requireLogin, clearProductCache, add_category);
  app.put("/api/categories/:id", requireLogin, clearProductCache, edit_category);
  app.delete("/api/categories/:id", requireLogin, clearProductCache, delete_category);
};
