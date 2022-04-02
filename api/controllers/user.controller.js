
const User = require ('../models/user.model');



const userControler = {

    //create  User
    singUp : async (req, res)=> {
        console.log('resgister')
        try {

            //check email ton tai chua???
            if(await User.isEmailTaken(req.body.email)){
                res.status(400).json({
                    message : {msgBody: "Email da ton tai", msgError: false}
                })
            }
            else {
                const user = new User(req.body);
                await user.save();
                // await user.save((err)=>{
                //     if(err)
                //     res.status(500).json({
                //         message : {msgBody: "Error", msgError: true}
                //     })
                // })       
                const token = await user.generateAuthToken();
                res.status(201).send({ user, token });
            }
           
        } catch (error) {
            res.status(400).send(error);
        }  
    },

    //Login
    singIn : async (req, res)=> {
        console.log('Login');
        try {
            const { email, password } = req.body;
            const user = await User.findByCredentials(email, password);
          
            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'});
            }
            const token = await user.generateAuthToken();
            res.send({ user, token });
        } catch (error) {
            res.status(400).send(error);
        }
    }, 


    //delete
    deleteUser: async (req, res)=> {
        
    }
}
module.exports = userControler;