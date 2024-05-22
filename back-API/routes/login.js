const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();

router.post("/",(req,res)=>{
    const{username, password} = req.body;

    if(!!!username || !!!password ){
        return res.status(400).json(jsonResponse(400,{
            error: "Campos Requeridos",
        })
    );
    }

    //autenticacion de usuario
    const accessToken = "access:token";
    const refreshToken = "refresh_token";
    const user = {
        id:'1',
        name: 'Michael Medina',
        username: 'xxxxxxx'
    };
    res.status(200).json(jsonResponse(200,{user, accessToken, refreshToken}));
    
    res.send("signout");
});
module.exports = router;