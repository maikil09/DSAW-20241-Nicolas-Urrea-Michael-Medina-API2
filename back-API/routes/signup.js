const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();
router.post("/",(req,res)=>{
    const{name, email, username, password} = req.body;

    if(!!name || !!!email || !!!username || !!!password ){
        return res.status(400).json(jsonResponse(400,{
            error: "Campos Requeridos",
        })
    );
    }

    //crear el usuario
    res.status(200).json(jsonResponse(200,{message: "Usuario creado Exitosamente"}));
    
    res.send("signout");
});
module.exports = router;