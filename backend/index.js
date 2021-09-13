const express = require('express');
const db = require('./config/db.config');
db.connect();

const PORT = 5000;

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/",router);


router.get('/',(req,res,next) => {
    res.status(200).json("Express funcionando correctamente");
});

//pages not found
app.use('*',(req,res,next) => {
    const error = new Error('Página no encontrada');
    return res.status(404).json(error.message);
});

//error treatment
app.use((error, req, res) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

app.listen(PORT,() => {
    console.log(`Server ejecutando en http://localhost:${PORT}`);
})
