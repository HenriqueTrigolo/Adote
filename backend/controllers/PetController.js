const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController{

    //create a pet
    static async create(req, res){
        const {name, age, weight, color} = req.body

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

        try {
            const newPet = await pet.save()
            res.status(200).json({message: 'Pet cadastrado com sucesso!', newPet})


        } catch (error) {
            res.status(500).json({message: error})
        }
    }

}