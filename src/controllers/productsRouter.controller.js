import { ProductService } from '../service/products.service.js'
import { responseFailed } from '../middlewares/responseFailed.js';
import { responseSuccessfull } from '../middlewares/responseSuccessfull.js';

const productService = new ProductService();

export async function getProductById(request, response) {
    const id = parseInt(request.params.pid);    
    try {
        const prdId = await productService.getProductById(id);
        responseSuccessfull.successfullGet(prdId);
    } catch (error) {
        console.log(error);
        responseFailed.serverError(`Error al recibir el producto con Id ${id}`);
    }
}

export async function addProduct(request, response) {
    const { category, object, title, description, code, stock, status, price } = request.body;
    try {
        const newProduct = await productService.addProduct({
            category,
            object,
            title,
            description,
            code,
            stock,
            status,
            price,
        });
        responseSuccessfull.successfullPost(newProduct);
    } catch (error) {
        console.log(error);
        responseFailed.serverError('Error al agregar el producto');
    }
}

export async function updateProduct(request, response) {
    const id = parseInt(request.params.pid);    
    try {
        const { category, object, title, description, code, stock, status, price } = request.body;
        const prodUpDate = await productService.updateProduct(id, {category, object, title, description, code, stock, status, price});
        responseSuccessfull.updated(prodUpDate);
    } catch (error) {
        console.log(error);
        responseFailed.serverError(`Error al editar el producto con Id ${id}`);
    }
}

export async function deleteProduct(request, response) {
    const id = parseInt(request.params.pid);    
    try {
        await productService.deleteProduct(id);
        responseSuccessfull.deleted();
    } catch (error) {
        console.log(error);
        responseFailed.serverError(`Error al eliminar el producto con Id ${id}`);
    }
}