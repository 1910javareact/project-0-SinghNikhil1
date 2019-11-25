export function authorization(roleIds: number[], userId?: boolean){
    return (req, res, next)=>{        
        let isAuth = false
        
        if(!req.session.user){
            res.status(400).send('Please log in')
            return
        }
        
       
    //To check if role is authorized
        if(roleIds.includes(req.session.user.role.roleId)){
            isAuth = true
        }

        //To check if the userId is same as what they are trying to access
        if(userId){
            let id = +req.params.id
            if(!isNaN(id)){
                if(req.session.user.userId === id){
                    isAuth = true
                }
            }
        }

        if(isAuth){
            next()
        }else{
            res.status(401).send("The incoming token has expired")
        }
    }
}