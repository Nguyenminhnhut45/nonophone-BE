const { User } = require('../models');

const getUserByEmail = async (email) => {
    return User.findOne({ email });
};


module.exports = {
    getUserByEmail,
    
}