import mongoose from "mongoose";

// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the User schema
const UserSchema = new Schema({
    Name: {
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
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                return this.password === this.confirmPassword;
            },
            message: 'Passwords do not match!',
        },
    },
}, { timestamps: true });



// Middleware to hash the password before saving the user
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        // Hash password 
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = undefined;  //  confirmPassword Don't store in the DB
    }
    next();
});

const User = mongoose.model('User', UserSchema);

export default User;