import { Router } from 'express';
import userController from '../controllers/userController.js';
const userRoute = Router();

userRoute.post('/signup', userController.createUser, (req, res) => {
  return res.status(201).json(res.locals.userID);
});

userRoute.post(
  '/:username/:score/',
  userController.updateHighestScore,
  (req, res) => {
    return res.status(200).json('updated!');
  }
);

userRoute.get(
  '/score/:username',
  userController.getHighestScore,
  (req, res) => {
    return res.status(200).json(res.locals.highestScore);
  }
);

export default userRoute;
