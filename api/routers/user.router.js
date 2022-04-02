
module.exports = (router)=> {

    //Import controller 

    const userController = require('../controllers/user.controller');

    //dky user
    router.post ('/users', userController.singUp);

    //login
    router.post('/users/login', userController.singIn);

    //load profile user
    // router.get('/users/me', userController.djsfhsdjf);

    // //user logout
    // router.post('/users/logout', userController.dshfdsf);

    // //user dang xuat khoi cac thiet bi
    // router.post('/users/logoutall', userController.jsdhfsjdf);

    router.get('/user/delete', userController.deleteUser);

};