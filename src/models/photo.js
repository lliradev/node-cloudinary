const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema({
    title: String,
    description: String,
    imageURL: { type: String },
    filename: { type: String },
    originalname: { type: String },
    //created_at: { type: Date, default: Date.now() }
    //imageURL: String,
    //public_id: String
});

module.exports = model('Photo', PhotoSchema);