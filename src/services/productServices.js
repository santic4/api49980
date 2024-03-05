import { productRepository } from "../repository/productRepository.js";
import { usersRepository } from "../repository/usersRepository.js";

class ProductServices{
    async getAllProducts(filter, options){
        
        const paginado = await productRepository.getAllProducts(filter, options)

        const results = {
            status: 'success',
            payload: paginado.docs,
            totalPages: paginado.totalPages,
            prevPage: paginado.prevPage,
            nextPage: paginado.nextPage,
            page: paginado.page,
            hasPrevPage: paginado.hasPrevPage,
            hasNextPage: paginado.hasNextPage,
        };

        return results
    }

    async getCategory(){
        const categoryProducts = await productRepository.getCategory();

        return categoryProducts
    }

    async getProductId(pid){
        const product = await productRepository.getProductId(pid)

        return product
    }

    async postProduct(user ,newData){

        if (newData.price < 0) {
            throw new Error('El precio del producto no puede ser negativo.');
        }

        if (user.rol !== 'premium' && user.rol !== 'admin') {
            return res.status(403).json({ message: 'No tienes permisos para crear productos.' });
        }

        const userId = user._id

        const newProduct = await productRepository.postProduct(userId, newData)

        return newProduct
    }

    async updateProduct(pid, newData, user){

        const Usuario = await usersRepository.findById(user)

        if (!Usuario) {
            throw new Error('User not found.');
        }

        if (!(Usuario.rol === 'admin' || Usuario.rol === 'premium')) {
            throw new Error('No tienes permisos para modificar productos');
        }

        // Verificar si el producto existe
        const product = await productRepository.getProductId(pid);

        if (!product) {
            throw new Error(`El producto con ID ${pid} no se encontró`);
        }
  
        // Verificar si se intenta modificar el código del producto
        if (newData.code) {
            throw new Error('No se puede modificar el código del producto');
        }

        const updProduct = await productRepository.updateProduct(pid, newData, Usuario)

        if (!updProduct) {
            throw new Error(`El producto con id ${pid} no se encontró`);
        }

        return updProduct
    }

    async deleteProduct(pid, userId) {

        const Usuario = await usersRepository.findById(userId)
    
        if (!Usuario) {
            throw new Error('Usuario no encontrado');
        }

        if (!(Usuario.rol === 'admin' || Usuario.rol === 'premium')) {
            throw new Error('No tienes permisos para modificar productos');
        }
 
        const product = await productRepository.getProductId(pid);

        if (product.owner.toString() !== userId) {
             throw new Error('No tienes permisos para modificar este producto');
        }

        const delProducto = await productRepository.deleteProduct(pid, userId);

        return delProducto;
    }; 
}

export const productServices = new ProductServices()