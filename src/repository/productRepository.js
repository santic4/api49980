import { productDao } from "../DAO/productDao.js"

class ProductRepository{
    async getAllProducts(filter, options){
        try {
            const paginado = await productDao.getAllProducts(filter, options)

            return paginado

        } catch (error) {
            throw new Error('Error en filtros')
        }
    }

    async getCategory(){
        const categoryProducts = await productDao.getCategory();

        return categoryProducts
    }

    async getProductId(pid){
        try {
            const product = await productDao.getProductId(pid)

            return product  
        } catch (error) {
            throw new Error('Producto no encontrado')
        }
    };

    async postProduct(newData){
        try {
            const newProduct = await productDao.postProduct(newData)

            return newProduct
        } catch (error) {
            throw new Error('Data invalid.', error.message)
        }
    }

    async updateProduct(pid, newData){
        try {
            const updProduct = await productDao.updateProduct(pid, newData)

            return updProduct
        } catch (error) {
            throw new Error(`Error al actualizar el producto por ID: ${error.message}`);
        }
    }

    async deleteProduct(pid) {
        try {
            const updProduct = await productDao.deleteProduct(pid)

            return updProduct
        } catch (error) {
            throw new Error('Producto no encontrado')
        }
    }
}

export const productRepository = new ProductRepository()