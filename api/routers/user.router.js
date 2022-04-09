

module.exports = (router)=> {

    //Import controller 
    const userController = require('../controllers/user.controller');
    const auth = require('../middlewares/auth');
    //dky user
    router.post('/users/register', userController.singUp)
    //get all
    router.get ('/users/get-all-user',auth.verifyTokenAdmin, userController.getAllUser);
    //login
    router.post('/users/login', userController.singIn);

    //load profile user
    router.get('/users/me', userController.getProfile);
    // //user logout
    // router.post('/users/logout', userController.dshfdsf);

    // //user dang xuat khoi cac thiet bi
    // router.post('/users/logoutall', userController.jsdhfsjdf);

    router.delete('/users/:id', auth.verifyTokenAdmin, userController.deleteUser);

};