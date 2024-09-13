import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { token } from "morgan";

// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the User schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    country: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    // confirmPassword: {
    //     type: String,
    //     required: true,
        
    //     validate: {
            
    //         validator: function () {
    //             return this.password === this.confirmPassword;
    //         },
    //         message: 'Passwords do not match!',
    //     },
    // },
    twoFactorToken: String,
    twoFactorTokenExpire: Date
}, { timestamps: true });



// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with stored hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate 2FA Token
UserSchema.methods.getTwoFactorToken = function() {
    const token = crypto.randomBytes(20).toString('hex');

    // Save token and expiry time (10 minutes)
    this.twoFactorToken = crypto.createHash('sha256').update(token).digest('hex');
    this.twoFactorTokenExpire = Date.now() + 10 * 60 * 1000;

    return token;
};

const User = mongoose.model('User', UserSchema);

export default User;