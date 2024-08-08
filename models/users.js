import mongoose from "mongoose";

const MyUser = mongoose.Schema(
    {
        firstName:{type: String},
        secondName:{type: String},
        gender:{type: String},
        state:{type: String},
        email:{type: String},
        password:{type:String}
    },
    {
        Timestamp:true,
    }
);

const User = mongoose.model('User', MyUser);
export default User;
