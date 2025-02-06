import mongoose from "mongoose";

const RegistrationSchema =  new mongoose.Schema({
    email:{type:String, require:true},
    password:{type:String, require:true}
})

const adminRegistration = mongoose.models["admin"] || mongoose.model("admin",RegistrationSchema);

export default adminRegistration