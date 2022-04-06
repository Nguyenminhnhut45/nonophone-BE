module.exports =(router)=>  {
    const categoryController = require('../controllers/category.controller');

    //Request tb_category
    //get danh muc san pham
    router.get ('/categorys/', categoryController.getCategory);
    //get danh muc theo id 
    router.get ('/categorys/:id', categoryController.getCategoryById);
    // them danh muc san pham
    router.post ('/categorys/', categoryController.postCategory);
    // sua danh muc san pham
    router.put ('/categorys/:id', categoryController.updateCategory);
    // xoa danh muc san pham
    router.delete ('/categorys/:id', categoryController.deleteCategory);



}