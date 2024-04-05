import { Router} from 'express'
import { deleteCart, deleteProdInCart, getAllCarts, getCartId, postCart, postProductIntoCart, purchaseCart, updateQuantityProductInCart } from '../controllers/cartController.js'
import { sessionAuth } from '../middlewares/passport.js'

export const carritoRouter = Router()

// GET /carts/allCarts
carritoRouter.get('/allCarts',
    sessionAuth,
    getAllCarts
);

// GET /carts/:cid/
carritoRouter.get('/:cid',
    getCartId
);

// POST /carts/
carritoRouter.post('/',
    postCart
);

// PUT /carts/:cid/product/:pid
carritoRouter.put('/:cid/product/:pid',
    updateQuantityProductInCart
);

// PUT /carts/:cid/add/:pid
carritoRouter.put('/:cid/add/:pid', 
    postProductIntoCart
)

// DELETE /carts/:cid 
carritoRouter.delete('/:cid', 
    deleteCart
)

// DELETE /carts/:cid/product/:pid
carritoRouter.delete('/:cid/product/:pid', 
    deleteProdInCart
);

// BUY
carritoRouter.post('/:cid/purchase', 
    purchaseCart
);