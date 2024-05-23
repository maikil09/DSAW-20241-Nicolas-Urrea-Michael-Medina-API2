const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();
const User = require("../schema/user");

router.post("/",async (req,res)=>{
    const{name, email, username, password} = req.body;

    if(!!!name || !!!email || !!!username || !!!password ){
        return res.status(400).json(jsonResponse(400,{
            error: "Campos Requeridos",
        })
    );
    }

    try{
        const user = new User();
    const exist = await user.usernameExist(username);

    if(exist){
        return res.status(400).json(
            jsonResponse(400,{
                error: "El usuario ingresado ya existe",
            })
        );
    }
    const newUser = new User({name, email,username,password});
    await newUser.save();
    res.status(200).json(jsonResponse(200,{message: "Usuario creado Exitosamente"}));
    
    res.send("signout");

    }catch(error){
        res.status(500).json(
            jsonResponse(500,{
            error: "Error creado por el usuario",
        })
    );
    } 
});
module.exports = router;