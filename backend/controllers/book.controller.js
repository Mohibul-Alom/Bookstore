const Book = require('../models/Book.model');

const bookGet = async(req,res,next) => {
    res.send("ruta /book/ funcionando");
};

const bookPost = async(req,res,next) => {
    res.send("ruta /book/create funcionando");

};
const bookPut = async(req,res,next) => {
    res.send("ruta /book/edit funcionando");

};
const bookDelete = async(req,res,next) => {
    res.send("ruta /book/delete funcionando");

};

module.exports =  {
    bookGet,
    bookPost,
    bookPut,
    bookDelete,    
};