import { Router } from 'express';
import * as controllers from '../../controllers/order.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const orderRoutes = Router();

orderRoutes.route('/').get(controllers.getOrders);
orderRoutes.route('/').post(controllers.create);
orderRoutes.route('/:id').get(controllers.read);
orderRoutes.route('/:id').patch(authenticationMiddleware, controllers.update);
orderRoutes.route('/:id').delete(authenticationMiddleware, controllers.deleteOrder);

export default orderRoutes;
