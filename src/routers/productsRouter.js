import { Router } from 'express'
import { deleteProduct, getAllProducts, getCategory, getProductId, postProduct, updateProduct } from '../controllers/productsController.js';
import { generateUsersHandler } from '../controllers/mockingController.js'
import { passportAuth } from '../middlewares/passport.js';
import { premiumOnly } from '../middlewares/authorizationUserAdmin.js';

export const productsRouter = Router()

productsRouter.get('/', 
    getAllProducts
);

// GET /products/category/
productsRouter.get('/category', 
    getCategory
)

// GET /products/pid
productsRouter.get('/:pid', 
    getProductId
)

// POST /products/
productsRouter.post('/',
    passportAuth,
    premiumOnly,
    postProduct,
)

// PUT /products/:pid
productsRouter.put('/:pid', 
    passportAuth,
    premiumOnly,
    updateProduct
)

// DEL /products/:pid
productsRouter.delete('/:pid', 
    passportAuth,
    premiumOnly,
    deleteProduct
)

productsRouter.post('/mockingproducts', 
    generateUsersHandler
);
