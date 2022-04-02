module.exports = (router)=> {
    //Import controller 


    const productController = require('../controllers/product.controller');


    router.get('/product', productController.getAll);

    router.post('/product/insert', productController.createProduct);

    //srouter.get('/product/:id', productController.getByIdProduct);

    router.delete('/product/:id', productController.deleteProduct);
}