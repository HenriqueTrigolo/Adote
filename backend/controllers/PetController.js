const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController{

    //create a pet
    static async create(req, res){
        const {name, age, weight, color} = req.body
        const images = req.files

        const available = true

        //images upload

        //validation
        if(!name){
            return res.status(422).json({message:'O nome é obrigatório!'})
        }
        if(!age){
            return res.status(422).json({message:'A idade é obrigatória!'})
        }
        if(!weight){
            return res.status(422).json({message:'O peso é obrigatório!'})
        }
        if(!color){
            return res.status(422).json({message:'A cor é obrigatória!'})
        }
        if(images.length === 0){
            return res.status(422).json({message:'A imagem é obrigatória!'})
        }

        // get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)
        // create a pet
        const pet = new Pet({
            name: name,
            age: age,
            weight: weight,
            color: color,
            available: available,
            images:[],
            user:{
                _id: user._id,
                name: user.name,
                phone: user.phone,
                image: user.image,
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(200).json({message: 'Pet cadastrado com sucesso!', newPet})


        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async getAll(req, res){
        
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({pets:pets})
    }

    static async getAllUserPets(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({pets:pets})
    }

    static async getAllUserAdoptions(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

        res.status(200).json({pets:pets})
    }

    static async getPetById(req, res){
        const id = req.params.id
        console.log('entrei')
        if(!ObjectId.isValid(id)){
            
            res.status(422).json({message:'ID inválido!'})
            return
        }

        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message:'Pet não encontrado'})
            return
        }

        res.status(200).json({pet})
    }

}