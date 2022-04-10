module.exports = (router)=> {
    //Import controller 
    const auth = require('../middlewares/auth');
    const productController = require('../controllers/product.controller');
    //get tat ca san pham
    router.get ('/', productController.getAll);
    //get san pham theo id
    router.get ('/products/:id', productController.getByIdProduct);
    //them san pham
    router.post ('/',auth.verifyTokenAdmin, productController.postProduct);
    //sua san pham
    router.put ('/products/:id',auth.verifyTokenAdmin, productController.updateProduct);
    //xoa san pham
    router.delete ('/products/:id',auth.verifyTokenAdmin, productController.deleteProduct);
    //filter product 
    router.get('/products/:filter', productController.getFilterProduct)
}