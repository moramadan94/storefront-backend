import { Router } from 'express';
import * as controllers from '../../controllers/product.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const productRoutes = Router();

productRoutes.route('/').get(controllers.products);
productRoutes.route('/').post(authenticationMiddleware, controllers.create);
productRoutes.route('/:id').get(controllers.read);
productRoutes.route('/:id').patch(authenticationMiddleware, controllers.update);
productRoutes.route('/:id').delete(authenticationMiddleware, controllers.deleteProduct);

export default productRoutes;
