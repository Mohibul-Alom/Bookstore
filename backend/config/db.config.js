const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/Bookstore";

const connect = async () => {

    try {
        
        const db = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const { name, host } = db.connection;
        console.log(`Conectado con éxito a ${name} en ${host}`);

    } catch (error) {
        console.error(error);
    }

}

module.exports = {connect};