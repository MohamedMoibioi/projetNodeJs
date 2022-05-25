const mongoose = require('mongoose')


const produitSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    // image: {
    //      type: String,
    //      required: true
    //  },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('Produit',produitSchema)