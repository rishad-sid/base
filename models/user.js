const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authentication = require("../config/config");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

// Generate a JSON Web Token (JWT) for the user
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, authentication.secretKey);
    this.tokens.push({ token, role: this.role });
    await this.save();
    return token;
};

// Remove sensitive information from the user object before sending it back
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.role;
    delete userObject.__v;
    return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
