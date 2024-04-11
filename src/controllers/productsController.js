import { productServices } from "../services/productServices.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const options = {
          page: req.query.page || 1,
          limit: req.query.itemsPorPagina || 10, 
          sort: req.query.order ? { 'price': req.query.order } : {},
          lean: true,
        };
    
        const filter = req.query.filtro ? { category: req.query.filtro } : {}; 
    
        const paginado = await productServices.getAllProducts(filter, options);

        res.json(paginado);
      } catch (error) {
        next(error)
      }
}

export const getCategory = async (req, res, next) => {
    try{
     const categoryProducts = await productServices.getCategory();
 
     res.json(categoryProducts)
 
    }catch(err){
     next(err)
    }
}

export const getProductId = async (req, res, next) => {
    try{
     const product = await productServices.getProductId(req.params.pid);
 
     res.json(product)
 
    }catch(err){
     next(err)
    }
}

export const postProduct = async (req, res, next) => {
  try {
     const newData = req.body;

     const userPer = req.user

     const newProduct = await productServices.postProduct(userPer ,newData)

     res.json(newProduct)

  } catch (error) {
     next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try{
      const updProduct = await productServices.updateProduct(req.params.pid, req.body, req.user._id)
  
      res.json(updProduct)

  }catch(err){
      next(err)
  }
}

export const deleteProduct = async (req, res, next) => {
  try{
      const idProduct = await productServices.deleteProduct(req.params.pid, req.user._id)
      
      res.json(idProduct)

  }catch(err){
      next(err)
  }
}
