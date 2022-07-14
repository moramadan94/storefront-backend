import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const routes = Router();
// api/users
routes.route('/').get(controllers.getUsers).post(controllers.create);
routes.route('/:id').get(authenticationMiddleware, controllers.getUser);
routes.route('/:id').patch(authenticationMiddleware, controllers.updateUser);
routes.route('/:id').delete(authenticationMiddleware, controllers.deleteUser);
// authentication
routes.route('/authenticate').post(controllers.authenticate);

export default routes;
