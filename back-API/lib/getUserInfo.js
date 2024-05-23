function getUserInfo(user){
    return{
        name: user.name,
        username: user.username,
        email : user.email,
        id: user.id,
        
    }
}

module.exports = getUserInfo;