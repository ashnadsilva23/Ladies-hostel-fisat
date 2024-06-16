const mongoose=require("mongoose")
const schema=mongoose.schema(
    {
        "sname":{type:String,required:true},
        "admnNo":{type:String,required:true},
        "address":{type:String,required:true},
        "mobile":{type:String,required:true},
        "age":{type:String,required:true},
        "email":{type:String,required:true},
        "parentName":{type:String,required:true},
        "pnumber":{type:String,required:true},
        "place":{type:String,required:true},
        "course":{type:String,required:true},
        "roomno":{type:String,required:true},
        "year":{type:String,required:true}        
    }
)

let studentmodel=mongoose.model("students",schema)
module.exports={studentmodel}