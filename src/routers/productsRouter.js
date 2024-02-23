import { Router } from 'express'
import { deleteProduct, getAllProducts, getCategory, getProductId, postProduct, updateProduct } from '../controllers/productsController.js';
import { generateUsersHandler } from '../controllers/mockingController.js'
import { passportAuth } from '../middlewares/passport.js';
import { adminsOnly } from '../middlewares/authorizationUserAdmin.js';

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
    adminsOnly,
    postProduct,
)

// PUT /products/:pid
productsRouter.put('/:pid', 
    passportAuth,
    adminsOnly,
    updateProduct
)

// DEL /products/:pid
productsRouter.delete('/:pid', 
    passportAuth,
    adminsOnly,
    deleteProduct
)

productsRouter.post('/mockingproducts', 
    generateUsersHandler
);
