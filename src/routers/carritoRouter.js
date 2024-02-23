import { Router} from 'express'
import { deleteCart, deleteProdInCart, getAllCarts, getCartId, postCart, postProductIntoCart, purchaseCart, updateQuantityProductInCart } from '../controllers/cartController.js'
import { sessionAuth } from '../middlewares/passport.js'

export const carritoRouter = Router()

// GET /carrito/allCarts
carritoRouter.get('/allCarts',
    sessionAuth,
    getAllCarts
);

// GET /carrito/:pid/
carritoRouter.get('/:cid',
    getCartId
);

// POST /carrito/
carritoRouter.post('/',
    postCart
);

// PUT /carrito/:cid/product/:pid
carritoRouter.put('/:cid/product/:pid',
    updateQuantityProductInCart
);

// PUT /carrito/:cid/add/:pid
carritoRouter.put('/:cid/add/:pid', 
    postProductIntoCart
)

// DELETE /carrito/:cid 
carritoRouter.delete('/:cid', 
    deleteCart
)

// DELETE /carrito/:cid/product/:pid
carritoRouter.delete('/:cid/product/:pid', 
    deleteProdInCart
);

// BUY
carritoRouter.post('/:cid/purchase', 
    purchaseCart
);