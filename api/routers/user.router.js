module.exports = (router)=> {

    //Import controller 
    const userController = require('../controllers/user.controller');
    const auth = require('../middlewares/auth');
    //dky user
    router.post('/users/register', userController.singUp)
    //get all
    router.get ('/users/get-all', userController.getListUser);
    //login
    router.post('/users/login', userController.singIn);

    //load profile user
    router.get('/users/me', auth, userController.getProfile);
    // //user logout
    // router.post('/users/logout', userController.dshfdsf);

    // //user dang xuat khoi cac thiet bi
    // router.post('/users/logoutall', userController.jsdhfsjdf);

    //router.get('/user/delete/?user-id', userController.deleteUser);

};