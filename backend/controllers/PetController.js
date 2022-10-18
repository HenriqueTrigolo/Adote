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
    
    static async deletePetById(req, res){
        const id = req.params.id
        
        if(!ObjectId.isValid(id)){
            res.status(422).json({message:'ID inválido!'})
            return
        }
        
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message:'Pet não encontrado'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message:'Ocorreu um erro, tente novamente mais tarde!'})
            return
        }

        await Pet.findByIdAndDelete(id)

        res.status(200).json({message: 'Pet Removido com sucesso!'})
    }

    static async updatePet(req, res){
        const id = req.params.id

        const {name, age, weight, color, available} = req.body

        const images = req.files

        const updateData = {}

        //check if pet exist
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message:'Pet não encontrado'})
            return
        }

        //check if lodded user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message:'Ocorreu um erro, tente novamente mais tarde!'})
            return
        }

        //validations
        if(!name){
            return res.status(422).json({message:'O nome é obrigatório!'})
        }else{
            updateData.name = name
        }
        if(!age){
            return res.status(422).json({message:'A idade é obrigatória!'})
        }else{
            updateData.age = age
        }
        if(!weight){
            return res.status(422).json({message:'O peso é obrigatório!'})
        }else{
            updateData.weight = weight
        }
        if(!color){
            return res.status(422).json({message:'A cor é obrigatória!'})
        }else{
            updateData.color = color
        }
        if(images.length === 0){
            return res.status(422).json({message:'A imagem é obrigatória!'})
        }else{
            updateData.images = []
            images.map((image) => {
                updateData.images.push(image.filename)
            })
        }

        await Pet.findByIdAndUpdate(id, updateData)

        res.status(200).json({message: "Pet atualizado com sucesso!"})
    }

    static async scheduleAdoption(req, res){
        const id = req.params.id

        //check if pet exist
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message:'Pet não encontrado'})
            return
        }

        //check if lodded user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id)){
            res.status(422).json({message:'Não é possível agendar visitas para seu próprio Pet.'})
            return
        }

        //check if user has already scheduled a visit 
        if(pet.adopter){
            if(pet.adopter._id.equals(user._id)){
                res.status(422).json({message:'Voce já agendou uma visita para este Pet.'})
            }else{
                res.status(422).json({message:'Este Pet já está em fase de adoção.'})
            }
            
            return
        }

        //add user to pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({message:`Visita agendada com sucesso! Entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`})
    }

    static async concludeAdoption(req, res){
        const id = req.params.id

        //check if pet exist
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message:'Pet não encontrado'})
            return
        }

        //check if lodded user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message:'Ocorreu um erro, tente novamente mais tarde!'})
            return
        }

        pet.available = false

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({message:'Parabéns, o ciclo de adoção foi finalizado'})
    }

}