const Author = require('../models/Author.model');

const authorGet = async (req, res, next) => {
    try {
        const authors = await Author.find();

        if(!authors.length){
            const error = new Error("Coleccion de autores vacia");
            error.status = 404;
            throw error;
        }
        res.status(200).json(authors);

    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const authorPost = async (req, res, next) => {
    try {
        const {firstName,lastName} = req.body;

        const newAuthor = new Author({firstName, lastName});
        
        const createdAuthor = await newAuthor.save();
        return res.status(200).json(createdAuthor);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const authorPut = async (req, res, next) => {
    try {
        
        const {id,firstName,lastName} = req.body;

        const update = {};

        if(firstName) update.firstName = firstName;
        if(lastName) update.lastName = lastName;

        const updateAuthor = await Author.findByIdAndUpdate(
            id,
            update,
            {new: true}
        );

        return res.status(200).json(updateAuthor);

    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const authorDelete = async (req, res, next) => {
    try {
        const {id} = req.body;

        const authorDelete = await Author.findByIdAndDelete(id);

        if(!authorDelete){
            return res.status(404).json("Error al eliminar autor");
        }
        return res.status(200).json("Elimiando correctamente");
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

module.exports = {
    authorGet,
    authorPost,
    authorPut,
    authorDelete
}