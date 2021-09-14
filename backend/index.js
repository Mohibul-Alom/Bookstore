const express = require('express');
const db = require('./config/db.config');
const cors = require('cors');

//import rutas
const bookRoutes = require('./routes/Book.routes');
const authorRoutes = require('./routes/Author.routes');


db.connect();

const PORT = 5000;

const app = express();
const router = express.Router();

//añadimo cors para aceptar las peticiones de front con la url http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/",router);
app.use("/book",bookRoutes);
app.use("/author",authorRoutes);

router.get('/',(req,res,next) => {
    res.status(200).json("Express funcionando correctamente");
});

//pages not found
app.use('*',(req,res,next) => {
    const error = new Error('Página no encontrada');
    return res.status(404).json(error.message);
});

//error treatment
app.use((error,req,res,next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.listen(PORT,() => {
    console.log(`Server ejecutando en http://localhost:${PORT}`);
})
