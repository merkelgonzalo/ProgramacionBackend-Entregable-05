import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import ProductManager from './ProductManager.js';

const PORT = '8080';

const app = express();
const server = app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
});
const io = new Server(server);
const productManager = new ProductManager("/src/products.json");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

//NEW
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public')); //Important for use js y css files on templates
app.use('/', viewsRouter);

io.on('connection', socket =>{
    console.log("New connected client")

    socket.on('newProduct', async (product) => {
        await productManager.addProduct(product);
  
        io.emit('updateProducts', await productManager.getProducts());
    });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProductById(id);
  
        io.emit('updateProducts', await productManager.getProducts());
      });

});