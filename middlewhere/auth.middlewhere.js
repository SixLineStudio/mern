import config from "config"
import jwt from "jsonwebtoken"

const auth = (req, res, next)=>{
    if(req.method == 'OPTIONS') {
         return next()
    }

    try{

        const token = req.headers.authorization.split(' ')[1] // "Bearer [Token]->1"

        if(!token){
           return res.status(401).json({massage: "Нет авторизации"})
        }

        const decoded = jwt.verify(token, config.get('jvtSecret'))

        console.log(token)
        req.user = decoded

        next()
    }catch(e){ 
        res.status(401).json({massage: "Нет авторизации"})
    }
}
export default auth