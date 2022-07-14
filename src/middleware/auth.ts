import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHead: string | undefined = req.headers.authorization;
    const token: string = authHead ? authHead.split(' ')[1] : '';

    const decoded: string | object = jsonwebtoken.verify(token, process.env.JWT_SECRET as string);
    res.locals.userData = decoded;
    next();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    err.code = 401;
    next(err);
  }
};
