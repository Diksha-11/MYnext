const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },
    //isAdmin: { type: String, require, default: false },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true,
})


//hashing of passwords

userSchema.pre('save', async function (next) {
    console.log("Running Hash");
    if (this.isModified('password')) {
        this.password = bcrypt.hash(this.password, 12);
        this.cpassword = bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//generating token 
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens  = this.tokens.concat({token:token});
        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model("users", userSchema);
module.exports = User;