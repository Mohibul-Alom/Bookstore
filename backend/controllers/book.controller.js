const Book = require('../models/Book.model');

const bookGet = async(req,res,next) => {
    try {
        
        const books = await Book.find();

        // if(!books.length){
        //     const error = new Error("Coleccion de libros vacia");
        //     error.status = 404;
        //     throw error;
        // }

        res.status(200).json(books);

    } catch (error) {
        console.error(error);
        return next(error);
    }
};

const bookGetById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        res.status(200).json(book);

    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const bookPost = async(req,res,next) => {
    try {
        const {name, isbn} = req.body;

        const newBook = new Book({name, isbn});
        
        const createdBook = await newBook.save();
        return res.status(200).json(createdBook);

    } catch (error) {
        console.error(error);
        return next(error);
    }

};
const bookPut = async(req,res,next) => {
    try {
        
        const {id, name, isbn, author} = req.body;

        const update = {};

        if(name) update.name = name;
        if(isbn) update.isbn = isbn;
        if(author) update.author = author;

        const updateBook = await Book.findByIdAndUpdate(
            id,
            update,
            {new: true}
        );
        return res.status(200).json(updateBook);

    } catch (error) {
        console.error(error);
        return next(error);
    }

};
const bookDelete = async(req,res,next) => {
    try {

        const {id} = req.body;

        const bookDeleted = await Book.findByIdAndDelete(id);
        if(!bookDeleted){
            return res.status(404).json("Error al eliminar el libro");
        }
        return res.status(200).json("Elimiando correctamente");

    } catch (error) {
        console.error(error);
        return next(error);
    }

};

module.exports =  {
    bookGet,
    bookGetById,
    bookPost,
    bookPut,
    bookDelete,    
};