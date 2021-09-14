const Author = require('../models/Author.model');

const authorGet = async (req, res, next) => {
    try {
        res.send("ruta /author funcionando")
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const authorPost = async (req, res, next) => {
    try {
        res.send("ruta /author/create funcionando")
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const authorPut = async (req, res, next) => {
    try {
        res.send("ruta /author/edit funcionando")
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const authorDelete = async (req, res, next) => {
    try {
        res.send("ruta /author/delete funcionando")
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