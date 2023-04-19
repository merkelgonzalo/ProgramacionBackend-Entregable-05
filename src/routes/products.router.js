import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();
const productManager = new ProductManager("/src/products.json");

router.get('/', async (req,res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if(!limit){
        res.send(products);
    }else{
        const productsLimit = products.filter(product => product.id <= limit);
        res.send(productsLimit);
    }
});

router.get('/:pid', async (req,res)=>{
    const idProduct = req.params.pid;
    const product = await productManager.getProductById(idProduct);
    
    if(product != -1){
        res.send({
            status: 'Success',
            product
        });
    }else{
        res.send({
            status: 'Error: ID not found'
        });
    }
});

router.post('/', async (req,res) => {
    const product = req.body;
    await productManager.addProduct(product);

    res.send({
        status: 'Success'
    })
});

router.put('/:pid', async (req,res) => {
    const product = req.body;
    const idProduct = req.params.pid;
    const productUpdated = await productManager.updateProduct(idProduct, product);

    if(productUpdated != -1){
        res.send({
            status: 'Success'
        });
    }else{
        res.send({
            status: 'Error: ID not found'
        });
    }
});

router.delete('/:pid', async (req,res) => {
    const idProduct = req.params.pid;
    const productDeleted = await productManager.deleteProductById(idProduct);

    if(productDeleted != -1){
        res.send({
            status: 'Success'
        });
    }else{
        res.send({
            status: 'Error: ID not found'
        });
    }
});

export default router;