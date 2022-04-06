const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const userService = require("../services/user.service");

const userControler = {
  //create  User
  singUp: async (req, res) => {
    console.log("resgister");
    try {
      //check email ton ???
      if (await User.isEmailTaken(req.body.email)) {
        res.status(400).json({
          message: { msgBody: "Email da ton tai", msgError: false },
        });
      } else {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  //Login
  singIn: async (req, res) => {
    console.log("Login");
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).send({ error: "Login failed! Check email" });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).send({ error: "Login failed! Check password" });
      }
      if (!user && !isPasswordMatch) {
        return res
          .status(401)
          .send({ error: "Login failed! Check authentication credentials" });
      }
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  },


  //find user

  getListUser: async(req, res)=> {
     User.find((err, listUser)=>{
      if(err) console.log(err);
      res.status(200).json(listUser);
    }); 
  },

  //delete
  deleteUser: async (req, res) => {
    const user = req.body;
  },


  getProfile: async(req, res)=> {
      res.send (req.user);
  },

  
};
module.exports = userControler;
