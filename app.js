const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcryptjs")
const {wardenmodel}=require("./models/register")
const jwt =require("jsonwebtoken")
const { studentmodel } = require("./models/addstudent")


const app=express()
app.use(cors())
app.use(express.json())


mongoose.connect("mongodb+srv://ashna:ashna@cluster0.n9qo4.mongodb.net/hostelDB?retryWrites=true&w=majority&appName=Cluster0")




const generateHashedpassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

app.post("/reg",async(req,res)=>{
    let input=req.body
    let hashedPassword=await generateHashedpassword(input.password)
    console.log(hashedPassword)
    input.password=hashedPassword
    let register=new wardenmodel(input)
    register.save()
    res.json({"status":"success"})
})


app.post("/login",(req,res)=>{
    let input =req.body
    wardenmodel.find({"email":req.body.email}).then(
        (response)=>{
            if(response.length>0)
                {
                    let dbpass =response[0].password
                    console.log(dbpass)
                    bcrypt.compare(input.password,dbpass,(error,isMatch)=>{
                        if (isMatch) {
                            jwt.sign({email:input.email},"hostel-app",{expiresIn:"1d"},
                                (error,token)=>{
                                if (error) {
                                    res.json({"status":"unable to create token"})
                                } else {
                                    res.json({"status":"success","userid":response[0]._id,"token":token})
                                }
                            })
                        } else {
                            res.json({"status":"incorrect password"})
                        }
                    })
                }
            else{
                res.json({"status":"user not found"})
            }
        }
    )
    })

    app.post("/add",(req,res)=>{
        let input=req.body
        let student=new studentmodel(input)
        student.save()
        res.json({"status":"success"})
    })

    app.post("/search",(req,res)=>{
        let input=req.body
        studentmodel.find(input).then(
            (data)=>{
                res.json(data)
            }
        ).catch(
            (error)=>{
                res.json(error)
            }
        )
    })
   
app.listen(8080,()=>{
    console.log("server started")
})