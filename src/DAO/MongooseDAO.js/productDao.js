import { Product } from '../../models/mongoose/productModel.js'

class ProductDao{
    async getAllProducts(filter, options){
        
        const paginado= await Product.paginate(filter, options);

        return paginado
    }

    async getCategory(){
        const categoriasProductos = await Product.aggregate([
            { $group: { _id: "$category" } }
        ]);

        return categoriasProductos;
    }

    async getProductId(pid){

        const productoPorId = await Product.findById(pid);

        return productoPorId;
    
    }

    async postProduct(userId, newData){

        newData.owner = userId;

        const newProduct = await Product.create(newData);

        return newProduct
    }

    async updateProduct(pid, newData){
        const updProduct = await Product.findByIdAndUpdate(
            pid,
            { $set: newData },
            { new: true }
        );

        return updProduct
    }

    async deleteProduct(pid){
        console.log(pid,'pid en el dao de productos')
        const delProduct = await Product.findByIdAndDelete(pid);

        return delProduct
    }
}

export const productDao = new ProductDao()