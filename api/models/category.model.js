const mongoose = require("mongoose");

const CategoryChema = new  mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
},
{
    timestamps: true,
});
const Categories = mongoose.model("Category", CategoryChema);
module.exports = Categories;