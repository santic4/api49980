import { Carrito } from "../models/mongoose/cartModel.js"

class CartDao {
    async getAllCarts() {
        try {
          const allCarts = await Carrito
          .find({}, {'products._id': 0})
          .populate('carrito.productID')

          return allCarts
        } catch (error) {
          throw new Error(`Error al obtener los carritos: ${error.message}`);
        }
    };

    async getCartId(cid){
      try{
        const idCarritoSelec = await Carrito.findById(cid)
          .populate('carrito.productID');
        
        return idCarritoSelec
      }catch(error){
        throw new Error(`Error al obtener el carrito por ID: ${error.message}`);
      }
    }

    async postCart(cartData){
      try {
        const newCarrito = await Carrito.create({ user: cartData.user })

        return newCarrito
      } catch (error) {
        throw new Error(`Error al crear un nuevo carrito: ${error.message}`);
      }
    }
    
    async updateQuantityProductInCart(cid, pid, cantidadNumerica){
      try {
        const carrito = await Carrito.findById(cid);

        console.log(cantidadNumerica, 'cantidadNumerica')

        await carrito.upsertProd(pid, cantidadNumerica);
        
        return carrito
      } catch (err) {
        throw new Error(`Error al actualizar el carrito: ${err.message}`);
      }
    }

    async postProductIntoCart(cid, pid, productExist){
      console.log(cid, pid,'NEW DATA', productExist)
      if (productExist.length > 0) {
        
        const updProduct = await Carrito.findByIdAndUpdate(
          cid,
          { $inc: { "carrito.$[elem].cant": 1 }},
            { arrayFilters: [{ "elem.productID": pid }]},
            { new: true }
        )

        return updProduct

     } else {
        const addProduct = await Carrito.findByIdAndUpdate(
          cid,
            { $push: { carrito: { productID: pid, cant: 1 } } },
            { new: true }
        ).lean()
        
        return addProduct;
    }
    }

    async deleteCart(cartID){
        const deletedCart = await Carrito.findByIdAndDelete(cartID)
   
        return deletedCart
    }

    async deleteProdInCart(cid, pid){
        const deletedProd = await Carrito.findByIdAndUpdate(
          cid,
          { $pull: { carrito: { _id: pid } } },
          { new: true }
        );

        return deletedProd
    }

    async saveCart(cart) {
      try{
        await cart.save();
      } catch (error) {
        throw new Error('Error saving cart');
      }
    }
}

export const cartDao = new CartDao()