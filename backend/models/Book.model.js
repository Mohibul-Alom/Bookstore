const mongoose = require('mongoose');

const {Schema} = mongoose;

const bookSchema = new Schema (
    {
        name: {type: String, required: true},
        isbn: {type: String, required: true},
        author: {type:mongoose.Types.ObjectId,ref:'Author'},
    },
    {timestamps: true}
);

const Book = mongoose.model('Book',bookSchema);

module.exports = Book;