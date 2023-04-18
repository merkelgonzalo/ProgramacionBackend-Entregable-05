import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';

const PORT = '8080';

const app = express();
const server = app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
});
const socketServer = new Server(server);

//app.use(express.json());
//app.use(express.urlencoded({extended: true}));
//app.use('/api/products', productRouter);
//app.use('/api/carts', cartRouter);

//NEW
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public')); //Important for use js y css files on templates
app.use('/', viewsRouter);

socketServer.on('connection', socket => {
    console.log("New connected client")
});