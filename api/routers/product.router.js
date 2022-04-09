module.exports = (router)=> {
    //Import controller 

    const productController = require('../controllers/product.controller');
    //get tat ca san pham
    router.get ('/', productController.getAll);
    //get san pham theo id
    router.get ('/products/:id', productController.getByIdProduct);
    //them san pham
    router.post ('/', productController.postProduct);
    //sua san pham
    router.put ('/products/:id', productController.updateProduct);
    //xoa san pham
    router.delete ('/products/:id', productController.deleteProduct);
    //filter product 
    router.get('/products/:filter', productController.getFilterProduct)
}