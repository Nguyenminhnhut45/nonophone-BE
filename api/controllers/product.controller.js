///const {Product} = require('../models/product.model');
const Product = require('../models/product.model');
const ProductController = {
    getAll: async (req, res)=> {
        console.log('Resquire Product all ')
        const product = await Product.find();
        if (!product){
            return res.status(404).json({message: "Not fond"});
        }
        res.status(200).json({product});


    },
    createProduct: async (req, res)=> {
        const products = new Product(req.body);
        await products.save();
        res.status(201).send({ products });
    },
    // getByIdProduct: async (req, res)=> {
    //     const productId = req.params.id;
    //     const product = await Product.getById(productId);
    //     if(!product){
    //         res.status(404).json({message: "Not found product"});
    //     }else 
    //     {
    //         res.status(200).json ({product});
    //     }
    // },
    deleteProduct: async (req, res) => {

    }

}

module.exports = ProductController;