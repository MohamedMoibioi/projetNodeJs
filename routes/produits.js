const express = require('express')
const router = express.Router()

const Produit = require('../models/produit')

router.get('/', async(req,res) => {
    try{
           const produits = await Produit.find()
           res.json(produits)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const produit = await Produit.findById(req.params.id)
           res.json(produit)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req,res) => {
    const produit = new Produit({
        name: req.body.name,
        //image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        userId: req.body.userId,
        createdAt: req.body.createdAt
    })

    try{
        const a1 =  await produit.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const produit = await Produit.findById(req.params.id) 
        produit.name = req.body.name,
       //produit.image = req.body.image
        produit.description = req.body.description
        produit.price= req.body.price
        produit.stock= req.body.stock
        produit.userId= req.body.userId
        produit.createdAt= req.body.createdAt
        const a1 = await produit.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

//delete
router.delete('/:id',async(req,res)=> {
    try{
        const produit = await Produit.findById(req.params.id) 
        const a1 = await produit.remove()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})


module.exports = router
