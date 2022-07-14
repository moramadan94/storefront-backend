import express from 'express';
import usersRoutes from './api/users.routes';
import productsRoutes from './api/product.routes';
import orderRoutes from './api/order.routes';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', orderRoutes);

export default routes;
