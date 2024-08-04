const ContactForm=async(req,res)=>{
    try{
        const data= await UserModel({
            name:req.body.name,
        email:req.body.email,
    smessage:req.body.message       
 })
 if(data){
    await data.save()
    console.log("User saved successfully!")
 }
        res.render('index')
    } catch(error){
        console,log(error.message)
    }
}