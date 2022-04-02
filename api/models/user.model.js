const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },


    email: {
        type: String,
        required: true,
        max:255,
        min: 6,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {//Check email 
                throw new Error({error: 'Invalid Email address'})
            }
        }

    }, 

    password: {
        type: String, 
        required: true,
        min: 6,
        max: 1024,

    },
    address: {
        type: String,
    }, 
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

    },
    {
        timestamps: true,
    } 
);

//ma hoa password
UserSchema.pre("save",async function (next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    };
    next();
});

UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  };

  
UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

UserSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} );


    if (!user) {
        throw new Error({ error: 'Invalid login credentials' });//tra ve ket qua ko phai json
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
   
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
}
const User = mongoose.model('User', UserSchema);
module.exports = User
//module.exports = mongoose.model("User", UserSchema);
