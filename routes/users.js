const express = require('express')
const user = require('../models/user')
const router = express.Router()
const User = require('../models/user')
const bcrypt=require('bcrypt')
const { json } = require('express')
const jsonwebtoken = require('jsonwebtoken')
const jwt =require('jsonwebtoken' )
const { hash } = require('bcrypt')

router.get('/', async(req,res) => {
    try{
           const users = await User.find()   
           res.json(users)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const user = await User.findById(req.params.id)
           res.json(user)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const user = new User({
                username:req.body.username,
                //image: req.body.image;
                firstname: req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password: req.body.password,
                createdAt: req.body.createdAt
            })

            try{
                const a1 =  await user.save() 
                res.json(a1)
            }catch(err){
                res.send('Error')
            }
        })

        //modification
    router.patch('/:id',async(req,res)=> {
        try{
            const user = await User.findById(req.params.id) 
            user.username = req.body.username,
            //user.image = req.body.image
            user.firstname = req.body.firstname
            user.lastname= req.body.lastname
            user.email= req.body.email
            user.password= req.body.password
            user.createdAt= req.body.createdAt
            const a1 = await user.save()
            res.json(a1)   
        }catch(err){
            res.send('Error')
        }

    })

delete
router.delete('/:id',async(req,res)=> {
    try{
        const user = await User.findById(req.params.id) 
        const a1 = await user.remove()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})


//login
router.post('/login',(req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).jsons({
                msg:'usilisateur n existe pas'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(result)=>{
          if(!result){
              return res.status(401).json({
                  msg:'mot de passe incorte'
            }) 
          }  
          if(result)
          {
            const token =jwt.sign({
                username:user[0].username,
                firstname:user[0].firstname,
                lastname:user[0].lastname,
                email:user[0].email,
                password:user[0].password
            },
               ' cool',
               {
                  expiresIn:"24h" 
               }
            );
            res.status(200).json({
                username:user[0].username,
                firstname:user[0].firstname,
                lastname:user[0].lastname,
                email:user[0].email, 
                token:token
            })
          }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})

  
  
  

module.exports = router
