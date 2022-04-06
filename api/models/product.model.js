const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  catogory: {
    id: String,
    name :String ,
  },
  image: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
}
);

//tim theo id

ProductSchema.methods.getByIdProduct = async (id) => {
  return Product.findOne(id);
};

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
