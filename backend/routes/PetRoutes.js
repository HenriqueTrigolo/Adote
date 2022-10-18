const router = require('express').Router()

const PetController = require('../controllers/PetController')

//middleware
const verifytoken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.post('/create', verifytoken, imageUpload.array('images'), PetController.create)
router.get('/mypets', verifytoken, PetController.getAllUserPets)
router.get('/myadoptions', verifytoken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetById)
router.delete('/:id', verifytoken, PetController.deletePetById)
router.patch('/:id', verifytoken, imageUpload.array('images'), PetController.updatePet)
router.get('/', PetController.getAll)


module.exports = router