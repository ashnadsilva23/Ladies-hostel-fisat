const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "name":{type:String,required:true},
        "empid":{type:String,required:true},
        "email":{type:String,required:true},
        "idProof":{type:String,required:true},
        "mobile":{type:String,required:true},
        "hostelName":{type:String,required:true},
        "password":{type:String,required:true}
    }
)

let wardenmodel=mongoose.model("warderns",schema)
module.exports={wardenmodel}