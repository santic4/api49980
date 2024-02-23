import { cartDao } from '../DAO/cartDao.js'

class CartRepository {
    async getAllCarts() {
        const user = await cartDao.getAllCarts()

        return user
    }

    async getCartId(cid){
        const cartID = await cartDao.getCartId(cid)

        return cartID
    }

    async postCart(cartData){
        const newCart = await cartDao.postCart(cartData)

        return newCart
    }

    async updateQuantityProductInCart(cid, pid, cantidadNumerica){
        const cartUpd = await cartDao.updateQuantityProductInCart(cid, pid, cantidadNumerica);

        return cartUpd
    }

    async postProductIntoCart(newData){
        const cartUpd = await cartDao.postProductIntoCart(newData)

        return cartUpd
    }

    async deleteCart(idCart){
        const cartDeleted = await cartDao.deleteCart(idCart)

        return cartDeleted
    }

    async deleteProdInCart(cid, pid){
        const deleteProd = await cartDao.deleteProdInCart(cid, pid);

        return deleteProd
    }

}

export const cartRepository = new CartRepository()
