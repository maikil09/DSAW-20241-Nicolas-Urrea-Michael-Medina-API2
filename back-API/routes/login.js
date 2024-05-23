const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();
const User = require("../schema/user");
const getUserInfo = require("../lib/getUserInfo");

router.post("/",async (req,res)=>{
    const{username, password} = req.body;

    if(!!!username || !!!password ){
        return res.status(400).json(jsonResponse(400,{
            error: "Campos Requeridos",
        })
    );
    }

    const user = await User.findOne({username});
    if(user){
        const correctPasword = await user.comparePassword(password, user.password);

        if(correctPasword){
            //autenticacion de usuario
            const accessToken = user.createAccessToken();
            const refreshToken = await user.createRefreshToken();
           
            res.status(200).json(jsonResponse(200,{user: getUserInfo(user), accessToken, refreshToken}));
        }else{
            res.status(400).json(
                jsonResponse(400,{
                    error: "Usuario o contraseña incorrecto",
                })
            );
        }
    }else{
        res.status(400).json(
            jsonResponse(400,{
                error: "Usuario No Encontrado",
            })
        );
    }

    
 
});
module.exports = router;