const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
        },
        url: {
            type: String,
        },
        status: {
            type: String,
            enum: ['TO LEARN', 'LEARNING', 'LEARNED'], // option
        },
        user: {
            type: Schema.Types.ObjectId, // lien ket voi bang users
            ref: 'users',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Posts', PostSchema);
