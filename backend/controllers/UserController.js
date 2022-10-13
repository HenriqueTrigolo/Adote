const User = require('../models/User')

module.exports = class UserController{
    static async register(req, res){
        const {name, email, phone, password, confirmpassword} = req.body

        // validation
        if(!name){
            res.status(422).json('O nome é obrigatório')
            return
        }
        if(!email){
            res.status(422).json('O e-mail é obrigatório')
            return
        }
        if(!phone){
            res.status(422).json('O telefone é obrigatório')
            return
        }
        if(!password){
            res.status(422).json('A senha é obrigatório')
            return
        }
        if(!confirmpassword){
            res.status(422).json('A confirmação da senha é obrigatório')
            return
        }

        if(password !== confirmpassword){
            res.status(422).json('A senha e a confirmação da senha não são iguais')
            return
        }

        // verificando email ja cadastrado
        const userExist = await User.findOne({email: email})

        if(userExist){
            res.status(422).json({message: 'E-mail já cadastrado'})
            return
        }
    }
}