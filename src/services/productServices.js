import { productRepository } from "../repository/productRepository.js";

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

    async postProduct(newData){

        if (newData.price < 0) {
            throw new Error('El precio del producto no puede ser negativo.');
        }

        const newProduct = await productRepository.postProduct(newData)

        return newProduct
    }

    async updateProduct(pid, newData){
        const updProduct = await productRepository.updateProduct(pid, newData)

        if (!updProduct) {
            throw new Error(`El producto con id ${pid} no se encontró`);
        }

        return updProduct
    }

    async deleteProduct(pid) {
        const delProducto = await productRepository.deleteProduct(pid);

        return delProducto;
    }; 
}

export const productServices = new ProductServices()