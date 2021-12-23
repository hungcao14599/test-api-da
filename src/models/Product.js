const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        
        name: {
            type: String,
            
        },
        price: {
            type: String,
        },
        status: {
            type: Boolean,
        },        
    }

);

module.exports = mongoose.model('Products', ProductSchema);
