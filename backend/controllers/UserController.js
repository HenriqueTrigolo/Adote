const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

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

        // criptografando senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create user
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash
        })

        try {
            
            const newUser = await user.save()
            
            await createUserToken(newUser, req, res)

        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async login(req, res){
        const {email, password} = req.body

        if(!email){
            res.status(422).json('O e-mail é obrigatório')
            return
        }
        if(!password){
            res.status(422).json('A senha é obrigatória')
            return
        }

        //check if user exist
        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({message: 'Não existe usuário cadastrado com este e-mail'})
            return
        }

        //check if password is equal db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({message: 'Senha inválida'})
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){

            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined 

        }else{
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res){
        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.status(200).json({user})
    }

    static async editUser(req, res){
        res.status(200).json({message: 'Deu certo o edit'})
        return
    }
}