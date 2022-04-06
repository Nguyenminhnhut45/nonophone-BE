///const {Product} = require('../models/product.model');
const Product = require("../models/product.model");
const ProductController = {
	getAll: async (req, res) => {
		console.log("request Product all ");
		const product = await Product.find();
		if (!product) {
			return res.status(404).json({ message: "Not fond" });
		}
		res.status(200).json({ product });
	},
	postProduct: async (req, res) => {
		const products = new Product(req.body);
		await products.save();
		res.status(201).send({ products });
	},
	getByIdProduct: async (req, res) => {
		const productId = req.params.id;
		const product = await Product.getByIdProduct(productId);
		if (!product) {
			res.status(404).json({ message: "Not found product" });
		} else {
			res.status(200).json({ product });
		}
	},
	deleteProduct: async (req, res) => {
		Product.findByIdAndRemove(req.params.id)
			.then((data) => {
				if (!data) {
					return res.status(404).send({
						status: false,
						message: "Khong tim thay san pham ",
					});
				}
				res.send({
					status: true,
					message: "Delete product thanh cong!",
				});
			})
			.catch((err) => {
				if (err.kind === "ObjectId" || err.name === "NotFound") {
					return res.status(404).send({
						status: false,
						message: "San pham khong ton tai ",
					});
				}
				return res.status(500).send({
					success: false,
					message: "Khong the xoa san pham ",
				});
			});
	},
	updateProduct: async (req, res) => {
		if (!req.body) {
			return res.status(400).send({
				success: false,
				message: "Please enter product name and price",
			});
		}
		// find product and update
		Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		)
			.then((data) => {
				if (!data) {
					return res.status(404).send({
						success: false,
						message: "Khong tim thay danh muc ",
					});
				}
				res.send({
					success: true,
					dataupdate: Product.findById(req.params.id),
				});
			})
			.catch((err) => {
				if (err.kind === "ObjectId") {
					return res.status(404).send({
						success: false,
						message: "Khong tim thay danh muc " + req.params.id,
					});
				}
				return res.status(500).send({
					success: false,
					message: "Loi update danh muc " + req.params.id,
				});
			});
	},
};

module.exports = ProductController;
