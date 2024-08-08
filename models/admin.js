import mongoose from "mongoose";

const myAdmin = mongoose.Schema(
    {
        firstName:{type:String},
        Surname:{type:String},
        level:{type:String},
        gender:{type:String}
    },
    {
        Timestamp:true
    }
);

const Admin = mongoose.model('Admin', myAdmin )
export default Admin;