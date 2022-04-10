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
					message: { msgBody: "Email da duoc dang ky tai khoan", msgError: false },
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
			const { email, passwords } = req.body;
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(401).send({ error: "Login failed! Check email" });
			}

			const isPasswordMatch = await bcrypt.compare(passwords, user.password);
			if (!isPasswordMatch) {
				return res.status(401).send({ error: "Login failed! Check password" });
			}
			if (!user && !isPasswordMatch) {
				return res
					.status(401)
					.send({ error: "Login failed! Check authentication credentials" });
			}
      
			const token = await user.generateAuthToken();
			//const refsheshToken = await user.generateRefreshToken();
			res.cookie("token", token,{
				httpOnly: true, 
				//secure: false,
				path: "/",
				samSite: "strict",
			})

     		const { password, ...other} = user._doc;
			//console.log(refsheshToken);
			res.status(200).json({ ...other, token });
		} catch (error) {
			res.status(400).send(error);
		}
	},

	//find user
	getAllUser: async (req, res) => {
		try {
			User.find((err, listUser) => {
				if (err) console.log(err);
				res.status(200).json(listUser);
			});
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//delete
	deleteUser: async (req, res) => {
		try {
			User.findByIdAndRemove(req.params.id)
				.then((data) => {
					res.status(200).json("Xoa user thanh cong");
				})
				.catch((err) => {
					return res.status(500).json(err);
				});
		} catch (error) {
			res.status(500).json(error);
		}
	},

	getProfile: async (req, res) => {
		res.send(req.user);
	},
};
module.exports = userControler;
